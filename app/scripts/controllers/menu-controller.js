'use strict';

angular.module('fontRunApp')
  .controller('MenuCtrl', [
    '$rootScope',
		'premadeThemes',
		'SchemeSrv',
  	function ( $rootScope, premadeThemes, SchemeSrv ) {
			this.premadeThemes = premadeThemes;

      // Colours

      this.switchFonts = function () {
        var mainFont = angular.copy( $rootScope.fonts.primary );

        $rootScope.fonts.primary = $rootScope.fonts.secondary;
        $rootScope.fonts.secondary = mainFont;
      };

      // Schemes

      this.schemes = SchemeSrv.getSavedSchemes();

      this.saveCurrentScheme = function() {
        SchemeSrv.saveCurrentScheme();
        this.schemes = SchemeSrv.getSavedSchemes();
      };

      this.setScheme = function( scheme ) {
        SchemeSrv.setScheme( scheme );
      };

      this.deleteScheme = function( index ) {
        SchemeSrv.deleteScheme( index );
        this.schemes = SchemeSrv.getSavedSchemes();
      };
  	}
  ]);
