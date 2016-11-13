(function () {
'use strict'

angular.module('MenuData')
.component('itemsList', {
  templateUrl: 'src/templates/itemslist.template.html',
  bindings: {
    items: '<'
  }
});
	
})();