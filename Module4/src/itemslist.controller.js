(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);

ItemsListController.$inject = ['items'];
function ItemsListController(items) {
  this.items = items.data.menu_items;
}

})();