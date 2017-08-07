(function () {
    'use strict';

    angular
        .module('psCharts')
        .directive('psLineChart', psLineChart);

    psLineChart.$inject = ['psWebMetricsService'];

    function psLineChart(psWebMetricsService) {
        var directive = {
            link: link,
            template: ''
        };
        return directive;

        function link(scope, el, attrs) {
            scope.initialized = false;

            scope.title = psWebMetricsService.getTitleForMetric(scope.metric);
            scope.setTitle = function (title) {
                scope.title = title;
            };

            scope.options = {
                title: scope.title,
                width: scope.width || 200,
                height: scope.height || 200,
                legend: {
                    position: 'none'
                },
                vAxis: {
                    maxValue: 100,
                    minValue: 100,
                    title: 'Values'
                },
                hAxis: {
                    slantedText: false,
                    format: 'h:mm:ss',
                    maxTextLines: 1,
                    gridlines: {
                        count: 20
                    },
                    title: 'Time'
                }
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
                    scope.data = new google.visualization.DataTable();

                    scope.data.addColumn('timeofday', 'Time of Day');
                    scope.data.addColumn('number', 'Value');

                    scope.chart = new google.visualization.LineChart(el[0]);
                    scope.initialized = true;
                }

                var d = new Date(data.time);
                scope.data.addRow([
                    [
                        d.getHours(),
                        d.getMinutes(),
                        d.getSeconds()
                    ],
                    Math.round(data[scope.metric])
                ]);

                var rowCount = scope.data.getNumberOfRows();

                if (rowCount < 20) {
                    scope.options.hAxis.baseline = [
                        d.getHours(),
                        d.getMinutes(),
                        d.getSeconds() + 20 - rowCount
                    ];
                } else {
                    scope.options.hAxis.baseline = [
                        d.getHours(),
                        d.getMinutes(),
                        d.getSeconds()
                    ];
                }

                if (rowCount > 20) {
                    scope.data.removeRow(0);
                }

                scope.chart.draw(scope.data, scope.options)
            });
        }
    }
})();
