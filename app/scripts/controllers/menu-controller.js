'use strict';

angular.module('fontRunApp')
  .controller('MenuCtrl', [
    '$rootScope',
		'premadeThemes',
  	function ( $rootScope, premadeThemes ) {
			this.premadeThemes = premadeThemes;

      this.switchFonts = function () {
        var mainFont = angular.copy( $rootScope.fonts.primary );

        $rootScope.fonts.primary = $rootScope.fonts.secondary;
        $rootScope.fonts.secondary = mainFont;
      };
  	}
  ]);
