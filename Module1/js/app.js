
(function(){

	'use strict';

	angular.module('LunchChecker', [])

	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {

		$scope.foodInput = '';
		$scope.numberOfItems = 0;
		$scope.msg = '';

		$scope.displayNum = function() {
			var total = foodCount($scope.foodInput);
			$scope.numberOfItems = total;
		};

		$scope.displayMsg = function() {


			if ($scope.foodInput == '') {
				$scope.msg = 'Please enter your lunch items above';
				$scope.fontColor = 'blue-color';
				$scope.borderColor = 'blue-border';
			}	else if ($scope.numberOfItems <= 3) {
				$scope.msg = 'You had ' + $scope.numberOfItems + ' dishes today. Enjoy!';
				$scope.fontColor = 'green-color';
				$scope.borderColor = 'green-border';
			} else {
				$scope.msg = 'You had ' + $scope.numberOfItems + ' dishes today. That is too much!';
				$scope.fontColor = 'red-color';
				$scope.borderColor = 'red-border';
			}
		};

	}

	var arrString = [];
	
	function foodCount(string) {
		var separatedFoodString = string.split(',');
		arrString = [];

		for (var i = 0; i<separatedFoodString.length; i++) {
			if (separatedFoodString[i] != '') {
				arrString.push(separatedFoodString[i]);
			}
		}

		return arrString.length;
	}

})();