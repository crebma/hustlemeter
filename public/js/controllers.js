app.controller('HustleController', function($scope, meter, HustleService) {
    $scope.meter = meter;
    $scope.newMeter = angular.copy(meter);

    var seriesFromMeter = function(meter) {
        return [
            {name: 'Hustle', data: [meter['hustle']]},
            {name: 'New Business, Weighted', data: [meter['new']]},
            {name: 'Recurring Revenue Forecast', data: [meter['recurring']]},
            {name: 'Booked Fixed, Backlog', data: [meter['booked']]},
            {name: 'Earned Revenue', data: [meter['earned']]}
        ];
    }

    $scope.addMeter = function() {
        HustleService.addMeter($scope.newMeter).then(function(meter) {
            $scope.meter = meter;
            $scope.newMeter = angular.copy(meter);
            $scope.chart.series = seriesFromMeter(meter);
        });
    };

    $scope.chart = {
        options: {
            chart: {
                type: 'column'
            },
            xAxis: {
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '$$'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    },
                    format: '${total:,.0f}'
                }
            },
            legend: {
                align: 'left',
                verticalAlign: 'top',
                y: 20,
                floating: false,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false,
                layout: 'vertical'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    },
                    pointWidth: 150
                },
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '${point.y:,.0f}'
                    },
                    tooltip: {
                        headerFormat: '{series.name}<br/>',
                        pointFormat: '${point.y:,.0f}'
                    }
                }
            }
        },
        series: seriesFromMeter(meter),
        title: {
            text: 'Hustle Meter'
        },
        loading: false
    }
});
