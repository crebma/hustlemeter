require 'sinatra'
require 'json'
require './models'

get '/' do
  erb :main
end

get '/meter' do
  JSON.generate Meter.first(:order => [ :created.desc ]).to_hash
end

put '/meter' do
  request.body.rewind
  payload = JSON.parse request.body.read

  meter = Meter.create(:created => DateTime.now,
                        :earned_revenue => payload['earned'],
                        :booked => payload['booked'],
                        :recurring => payload['recurring'],
                        :new_business => payload['new'],
                        :goal => payload['goal'])
  JSON.generate meter.to_hash
end
