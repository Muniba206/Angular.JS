(function () {
'use strict'

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories list
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items list
  .state('items', {
    url: '/items/{catId}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsListController as itemsList',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
      function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.catId);
      }]
    }
  });

}
	
})();