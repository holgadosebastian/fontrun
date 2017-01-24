'use strict';

angular.module('fontRunApp')
  .filter('fontName', function() {
		return function ( _input ) {
      return _input.replace(new RegExp('[+]', 'g'), ' ');
    };
	});
