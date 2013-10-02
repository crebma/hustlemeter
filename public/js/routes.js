app.config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'hustle.html',
        controller: 'HustleController',
        resolve: {
            meter: function(HustleService) {
                return HustleService.getMeter();
            }
        }
    });

    $routeProvider.otherwise({ redirectTo: '/' });

});
