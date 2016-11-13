(function () {
'use strict'

angular.module('MenuData')
.component('categoriesList', {
  templateUrl: 'src/templates/categorieslist.template.html',
  bindings: {
    categories: '<'
  }
});
	
})();