'use strict';

angular.module('fontRunApp')
  .controller('MenuCtrl', [
  	'$scope',
		'premadeThemes',
  	function ($scope, premadeThemes) {
			$scope.premadeThemes = premadeThemes;
			
  	}
  ]);
