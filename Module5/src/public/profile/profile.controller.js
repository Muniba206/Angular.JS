(function() {
  'use strict';

  angular.module('public')
  .controller('ProfileController', ['LocalStorage', 'ApiPath', function(LocalStorage, ApiPath) {
    var profileCtrl = this;

    profileCtrl.userInfo = LocalStorage.getObject('ANGULAR-M5-ASSIGNMENT', false);

    if (profileCtrl.userInfo) {
      if (profileCtrl.userInfo.favoritedish) {
        profileCtrl.imageUrl = ApiPath + '/images/' + profileCtrl.userInfo.favoritedish.short_name + '.jpg'
      }
    }


    profileCtrl.deleteProfile = function() {
      LocalStorage.removeRecord('ANGULAR-M5-ASSIGNMENT');
      profileCtrl.message = 'Not Signed Up Yet. Sign up Now!';
      profileCtrl.userInfo = '';
    };

  }]);

})();