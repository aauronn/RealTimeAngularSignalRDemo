(function () {
    "use strict";

    angular
        .module('psFramework')
        .directive('psUserProfileSmall', psUserProfileSmall);

    psUserProfileSmall.$inject = [];

    function psUserProfileSmall() {
        return {
            templateUrl: 'ext-modules/psFramework/psUserProfile/psUserProfileSmallTemplate.html'
        };
    }
})();