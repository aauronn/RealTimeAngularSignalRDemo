(function () {
    'use strict';

    angular
        .module('app')
        .directive('rtaGaugeWidget', rtaGaugeWidget);

    rtaGaugeWidget.$inject = [];

    function rtaGaugeWidget() {
        var directive = {
            link: link,
            templateUrl: '/app/widgets/rtaGaugeWidget.view.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.metric = scope.item.widgetSettings.metric;

            scope.error = false;

            scope.$on('psWebMetricsService-disconnected-event', function () {
                scope.$apply(function () {
                    scope.error = true;
                });
            });
        }
    }

})();