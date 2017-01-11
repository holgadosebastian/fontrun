'use strict';

angular.module('fontRunApp')
  .controller('MainCtrl', [
  	'$scope',
  	function ($scope) {
	  	$scope.test = {};

	    $scope.test.stuff = [
	      'HTML5 Boilerplate',
	      'AngularJS',
	      'Karma'
	    ];
  	}
  ]);
