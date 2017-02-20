'use strict';

angular.module('fontRunApp')
  .controller('MenuCtrl', [
    '$rootScope',
    '$scope',
    '$timeout',
		'premadeThemes',
		'SchemeSrv',
  	function ( $rootScope, $scope, $timeout, premadeThemes, SchemeSrv ) {
      var self = this;
			self.premadeThemes = premadeThemes;
      self.showSideMenu = true;

      // Colours

      self.switchFonts = function () {
        var mainFont = angular.copy( $rootScope.fonts.primary );

        $rootScope.fonts.primary = $rootScope.fonts.secondary;
        $rootScope.fonts.secondary = mainFont;
      };

      // Schemes

      self.schemes = SchemeSrv.getSavedSchemes();

      self.saveCurrentScheme = function() {
        SchemeSrv.saveCurrentScheme();
        self.schemes = SchemeSrv.getSavedSchemes();
      };

      self.setScheme = function( scheme ) {
        SchemeSrv.setScheme( scheme );
      };

      self.deleteScheme = function( index ) {
        SchemeSrv.deleteScheme( index );
        self.schemes = SchemeSrv.getSavedSchemes();
      };

      // Keyboard Events
      $(document).keypress( function(e) {
        $timeout( function() { // TODO: Remove timeout once I find a better way to update scope
          switch ( e.keyCode ) {
            case 113:
                self.showSideMenu = !self.showSideMenu;
              break;
            case 102:
              self.switchFonts();
              break;
            case 116:
              var currentThemeIndex = _.indexOf(_.pluck(premadeThemes, 'name'), $rootScope.themes.current);
              if ( premadeThemes && currentThemeIndex < premadeThemes.length - 1 ) {
                $rootScope.themes.current = premadeThemes[currentThemeIndex + 1].name;
              } else {
                $rootScope.themes.current = premadeThemes[0].name;
              }
              break;
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              var schemeIndex = e.keyCode - 49;
              var savedSchemes = SchemeSrv.getSavedSchemes();

              if ( savedSchemes && savedSchemes.length > schemeIndex ) {
                self.setScheme( SchemeSrv.getSavedSchemes()[schemeIndex] );
              }
              break;
            default:
              console.log('This event does not exist: ' + e.keyCode);
          }
        }, 1);
      });
  	}
  ]);
