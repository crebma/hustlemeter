app.factory('HustleService', function($http, $location, $q) {
    var error = function () {
        $location.path('/error');
        $location.replace();
    };

    return {
        getMeter: function(){
            var deferred = $q.defer();

            $http.get('/meter').success(function(meter) {
                deferred.resolve(meter);
            });

            return deferred.promise;
        },
        addMeter: function(newMeter){
            var deferred = $q.defer();

            $http.put('/meter', newMeter).success(function(meter) {
                deferred.resolve(meter);
            });

            return deferred.promise;
        }
    };
});
