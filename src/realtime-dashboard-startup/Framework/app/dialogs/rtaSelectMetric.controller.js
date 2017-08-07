(function () {
    'use strict';

    angular
        .module('app')
        .controller('rtaSelectMetricController', rtaSelectMetricController);

    rtaSelectMetricController.$inject = ['$scope', 'psWebMetricsService'];

    function rtaSelectMetricController($scope, psWebMetricsService) {
        /* jshint validthis:true */
        $scope.metrics = psWebMetricsService.getMetricsArray();
        $scope.metric = $scope.metrics[0];

        Activate();

        $scope.saveSettings = saveSettings;

        // Functions

        function Activate() {
            for (var i = 0; i < $scope.metrics.length; i++) {
                if ($scope.metrics[i] === $scope.item.widgetSettings.metric) {
                    $scope.metric = $scope.metrics[i];
                }
            }
        }

        function saveSettings() {
            $scope.item.widgetSettings.metric = $scope.metric;
            $scope.$parent.metric = $scope.metric;
            $scope.$$prevSibling.setTitle(psWebMetricsService.getTitleForMetric($scope.metric));
            $scope.$close(psWebMetricsService.getTitleForMetric($scope.metric));
        }

    }
})();
