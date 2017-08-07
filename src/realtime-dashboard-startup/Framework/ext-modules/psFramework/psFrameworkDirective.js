(function () {
    "use strict";

    angular
        .module("psFramework")
        .directive("psFramework", psFramework);

    psFramework.$inject = [];

    function psFramework() {
        return {
            transclude: true,
            scope: {
                title: '@',
                subtitle: '@',
                iconFile: '@'
            },
            controller: "psFrameworkController",
            templateUrl: "ext-modules/psFramework/psFrameworkTemplate.html"

        };
    }
})();