(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('RESTEndPoint', 'https://davids-restaurant.herokuapp.com/menu_items.json');


// The DDO for the found items component
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };
  return ddo;
};

// The link to allow the nothing found error to be activated in the DOM
// when either no items are found, or the user deletes them all. This
// is achieved by setting a watcher on the nothingFound function on the
// controller.
function FoundItemsDirectiveLink(scope, element, attrs, controller) {
  scope.$watch('narrow.nothingFound()', function (newValue, oldValue) {
    if (newValue === true) {
      displayNothingFoundError();
    } else {
      removeNothingFoundError();
    };
  });

  // The error hide and display functions. Note we're including JQuery,
  // so we can search the subtree on the element by element type and class.
  function displayNothingFoundError() {
    var errorElement = element.find("div.error");
    errorElement.show();
  };

  function removeNothingFoundError() {
    var errorElement = element.find("div.error");
    errorElement.hide();
  };
};


// The main controller. This makes use of the MenuSearchService to retrieve
// the data from the server and using a promise, updates the items matching.
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.searchTerm = "";
  narrow.found = null;

  // The Narrow It Down For Me! button invokes this handler, which
  // makes a deferred call to the service, the then handler will
  // update the reference to the found items.
  narrow.narrowItDown = function () {
    narrow.found = null;
    MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
    .then(function(foundItems) {
      narrow.found = foundItems;
    })
    .catch(function(error) {
      narrow.found = [];
    });
  };

  // The remove item button invokes this handler with the appropriate item
  // index from the found list.
  narrow.removeItem = function (index) {
    MenuSearchService.removeItem(index);
  };

  // The link function makes use of this function to determine whether we
  // have no items as we've deleted them all, or the retrieve and filter
  // has failed, or we've just not hit the button yet. We need to determine
  // which case we're in, as no list items before we've hit the button is
  // very much not an error. We've set the found list to null to begin with
  // to identify these two cases.
  narrow.nothingFound = function () {
    if (narrow.found !== null) {
      return (narrow.found.length === 0);
    };
    return false;
  };

};


// The retrieve and search service. We inject the URL for the REST end-point
// as well as the $q service to return a promise.
MenuSearchService.$inject = ['RESTEndPoint', '$http', '$q']
function MenuSearchService(RESTEndPoint, $http, $q) {
  var service = this;
  var items = [];

  service.getMatchedMenuItems = function (searchTerm) {
    var deferred = $q.defer();
    var foundItems = []
    // We will generate a rejection error if the search box is empty...
    if (searchTerm === "") {
      items = []
      deferred.reject(foundItems);
    };
    // Get the lowercase once, not every time through the loop, so we
    // can match without worrying anout case.
    var searchTermLC = searchTerm.toLowerCase();
    // Make the HTTP call asynchronously, make use of the then attribute
    // of the promise to go through the list checking for matches when it
    // returns...
    var promise = $http({
      method: "GET",
      url: RESTEndPoint
    })
    promise.then(function (response) {
      var menu_items = response.data.menu_items
      for (var i = 0; i < menu_items.length; i++) {
        if (menu_items[i].description.toLowerCase().indexOf(searchTermLC) !== -1){
          foundItems.push(menu_items[i]);
        };
      };
      // Update the items we've got stored, and return a reference to the
      // caller as a resolution of the promise.
      items = foundItems;
      deferred.resolve(foundItems);
    })
    .catch(function (error) {
      items = []
      deferred.reject(foundItems);
    })
    // return the promise object to the caller to evaluate on completion.
    return deferred.promise;
  };

  // Remove an item from the list...
  service.removeItem = function (index) {
    items.splice(index, 1);
  };
  
};

})();
