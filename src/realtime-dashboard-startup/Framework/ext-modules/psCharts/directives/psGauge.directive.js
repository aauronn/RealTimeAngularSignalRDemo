(function () {
    'use strict'

    angular
        .module('psCharts')
        .directive('psGauge', psWebMetricsService);

    psWebMetricsService.$inject = ['psWebMetricsService']

    function psWebMetricsService(psWebMetricsService) {
        return {
            //
            //  scope is inherited from the widget using this directive
            //
            templateUrl: 'ext-modules/psCharts/directives/psGauge.view.html',
            link: function (scope, el, attrs) {

                scope.options = {
                    width: scope.width || 200, height: scope.height || 200,
                    redFrom: 90, redTo: 100,
                    yellowFrom: 75, yellowTo: 90,
                    minorTicks: 5
                };
                scope.title = psWebMetricsService.getTitleForMetric(scope.metric);
                scope.initialized = false;

                scope.setTitle = function (title) {
                    scope.title = title;
                };

                // locate the widget showing this gauge
                var widget = el.closest('.gridster-item');
                scope.options.width = widget.width();
                scope.options.height = widget.height();

                // monitor the widget's size
                widget.resize(function () {
                    scope.options.width = widget.width();
                    scope.options.height = widget.height();
                });

                // Catching Broadcast
                scope.$on('psWebMetricsService-received-data-event', function (evt, data) {
                    
                    if (!scope.initialized) {
                        scope.data = google.visualization.arrayToDataTable([
                            ['Label', 'Value'],
                            [scope.title, 0]
                        ]);
                        scope.chart = new google.visualization.Gauge(el[0]);
                        scope.initialized = true;
                    }

                    scope.data.setValue(0, 0, scope.title);
                    scope.data.setValue(0, 1, Math.round(data[scope.metric]));
                    //scope.data.setValue(0, 1, Math.round(0));
                    scope.chart.draw(scope.data, scope.options);

                });
            }
        };
    }
})();
