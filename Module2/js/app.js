(function() {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyShoppingController', ToBuyShoppingController)
      .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
      this.items = ShoppingListCheckOffService.getToBuyList();
      this.isEmpty = ShoppingListCheckOffService.isToBuyListEmpty;
      this.checkOut = ShoppingListCheckOffService.checkOut;
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
      this.items = ShoppingListCheckOffService.getAlreadyBoughtList();
      this.isEmpty = ShoppingListCheckOffService.isAlreadyBoughtListEmpty;
    }

    function ShoppingListCheckOffService() {
      var service = this;
      service.toBuyList = [
          { name: "Apple Juice", quantity: "2 bottles" },
          { name: " Cheese", quantity: "2 packets" },
          { name: "Jam", quantity: "2 bottles" },
          { name: "Eggs", quantity: "3 dozen" },
          { name: "Fresh Strawberries", quantity: "2  Kg" },
          { name: "Canned Salmon", quantity: "2 Tins"},
          { name: "Cheddar Cheese", quantity: "500 g" },
          { name: "Basil", quantity: "300 g" },
          { name: "Chickpeas", quantity: "2 cans" },
          { name: "Beans", quantity: "3 cans" }
      ];
      service.alreadyBoughtList = [];

      service.checkOut = function (itemIndex) {
        var boughtItem = service.toBuyList.splice(itemIndex, 1)[0];
        service.alreadyBoughtList.push(boughtItem);
      };

      service.getToBuyList = function () {
        return service.toBuyList;
      };

      service.getAlreadyBoughtList = function () {
        return service.alreadyBoughtList;
      };

      service.isToBuyListEmpty = function () {
        return service.toBuyList.length == 0;
      };

      service.isAlreadyBoughtListEmpty = function () {
        return service.alreadyBoughtList.length == 0;
      };
    }
})();
