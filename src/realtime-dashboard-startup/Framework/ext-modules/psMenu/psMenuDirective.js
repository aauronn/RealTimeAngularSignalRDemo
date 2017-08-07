(function () {
    "use strict";

    angular
        .module('psMenu')
        .directive('psMenu', psMenu);

    psMenu.$inject = ['$timeout'];

    function psMenu($timeout) {
        return {
            scope: {

            },
            transclude: true,
            templateUrl: 'ext-modules/psMenu/psMenuTemplate.html',
            controller: 'psMenuController',
            link: function (scope, el, attr) {
                var item = el.find('.ps-selectable-item:first');
                $timeout(function () {
                    item.trigger('click');
                });
            }
        };
    }
})();