'use strict';

angular.module('fontRunApp')
  .controller('MenuCtrl', [
    '$rootScope',
    '$scope',
    '$timeout',
    '$location',
		'premadeThemes',
		'SchemeSrv',
    'clipboard',
  	function ( $rootScope, $scope, $timeout, $location, premadeThemes, SchemeSrv, clipboard ) {
      var self = this;
			self.premadeThemes = premadeThemes;

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

      self.getShareableUrl = function() {
        $location.search(
          {
            'primarycolor': $rootScope.colors.primary,
            'secondarycolor': $rootScope.colors.secondary,
            'tertiarycolor': $rootScope.colors.tertiary,
            'primaryfont': $rootScope.fonts.primary,
            'secondaryfont': $rootScope.fonts.secondary
          }
        );

        $timeout( function() {
          clipboard.copyText( location.href );
        }, 1);
      };

      self.getShareableSchemes = function() {
        clipboard.copyText( localStorage.schemes );
      };

      self.addSchemes = function() {
        self.schemes = SchemeSrv.addSchemes( self.schemesString );
      };

      // Keyboard Events
      $(document).keypress( function(e) {
        $timeout( function() { // TODO: Remove timeout once I find a better way to update scope
          switch ( e.keyCode ) {
            case 113:
                $rootScope.controls.showSideMenu = !$rootScope.controls.showSideMenu;
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
            case 118:
              var currentView = $rootScope.view.current;
              if ( currentView === 'theme' ) {
                $rootScope.view.current = 'card';
                $location.url('/test');
              } else {
                $rootScope.view.current = 'theme';
                $location.url('/');
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
