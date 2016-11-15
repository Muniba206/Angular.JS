(function() {
  'use strict';

  angular.module('public')
  .controller('SignupController', ['$scope', 'MenuService', 'LocalStorage', function($scope, MenuService, LocalStorage) {
    var supCtrl = this;
    supCtrl.cantGetItem = false;
    supCtrl.formDone = false;

    supCtrl.submitSignup = function() {
      if (supCtrl.signup.favoritedish) {
        supCtrl.signup.favoritedish = supCtrl.signup.favoritedish.toUpperCase();

        var item = MenuService.getMenuItemByShortName(supCtrl.signup.favoritedish)
        .then(
              function(response) {
                supCtrl.signup.favoritedish = response.data;
                allDone();
              },
              function(failure) {
                supCtrl.cantGetItem = true;
                supCtrl.httpError = failure.data.error;
              }
        );

      } else {
        allDone();
      }

    };

    function allDone() {
      supCtrl.cantGetItem = false;
      supCtrl.formDone = true;
      // console.log(response.data);
      
      LocalStorage.storeObject('ANGULAR-M5-ASSIGNMENT', supCtrl.signup);
      supCtrl.signup = {
        firstname: '',
        lastname: '',
        email: '',
        tel: '',
        favoritedish: ''
      };
      $scope.signupForm.$setUntouched();
      $scope.signupForm.$setPristine();      
    }

  }]);

})();