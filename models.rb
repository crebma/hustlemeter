require 'data_mapper'

DataMapper.setup(:default, ENV['HEROKU_POSTGRESQL_ONYX_URL'] || 'postgres://postgres:password@localhost:5432/hustlemeter')

class Meter
  include DataMapper::Resource

  property :id, Serial
  property :created, DateTime
  property :earned_revenue, Integer
  property :booked, Integer
  property :recurring, Integer
  property :new_business, Integer
  property :goal, Integer

  def to_hash
    go_get = self.goal - self.earned_revenue - self.booked - self.recurring
    hustle = go_get - self.new_business
    {
        :hustle => hustle,
        :new => self.new_business,
        :recurring => self.recurring,
        :booked => self.booked,
        :earned => self.earned_revenue,
        :goal => self.goal
    }
  end

end

DataMapper.finalize.auto_upgrade!
