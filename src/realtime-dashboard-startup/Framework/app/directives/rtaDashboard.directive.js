(function () {
    'use strict';

    angular
        .module('app')
        .directive('rtaDashboard', rtaDashboard);

    rtaDashboard.$inject = ['$localStorage'];

    function rtaDashboard($localStorage) {
        // Usage:
        //     <rta-dashboard></rta-dashboard>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {

            },
            template: '<ps-dashboard></ps-dashboard>'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.gridsterOpts = {
                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: true
            };

            scope.widgetDefinitions = [
                {
                    title: 'Gauge',
                    settings: {
                        sizeX: 3,
                        sizeY: 3,
                        minSizeX: 1,
                        minSizeY: 1,
                        template: '<rta-gauge-widget></rta-gauge-widget>',
                        widgetSettings: {
                            metric: 'cpuPct',
                            templateUrl: 'app/dialogs/rtaSelectMetric.view.html',
                            controller: 'rtaSelectMetricController'
                        }
                    }
                },
                {
                    title: 'Line Chart',
                    settings: {
                        sizeX: 8,
                        sizeY: 3,
                        minSizeX: 1,
                        minSizeY: 1,
                        template: '<rta-line-chart-widget></rta-line-chart-widget>',
                        widgetSettings: {
                            metric: 'cpuPct',
                            templateUrl: 'app/dialogs/rtaSelectMetric.view.html',
                            controller: 'rtaSelectMetricController'
                        }
                    }
                }
            ];

            scope.widgets = $localStorage.widgets ||
                [

                ];

            scope.$watch('widgets', function () {
                $localStorage.widgets = scope.widgets;
            }, true);
        }
    }

})();