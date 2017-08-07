(function () {
    "use strict";

    angular
        .module('psFramework')
        .directive('psUserProfile', psUserProfile);

    psUserProfile.$inject = [];

    function psUserProfile() {
        return {
            templateUrl: 'ext-modules/psFramework/psUserProfile/psUserProfileTemplate.html'
        };
    }
})();