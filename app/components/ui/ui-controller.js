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
      var vm = this;
			vm.premadeThemes = premadeThemes;

      // Colours

      vm.switchFonts = function () {
        var mainFont = angular.copy( $rootScope.fonts.primary );

        $rootScope.fonts.primary = $rootScope.fonts.secondary;
        $rootScope.fonts.secondary = mainFont;
      };

      // Schemes

      vm.schemes = SchemeSrv.getSavedSchemes();

      vm.saveCurrentScheme = function() {
        SchemeSrv.saveCurrentScheme();
        vm.schemes = SchemeSrv.getSavedSchemes();
      };

      vm.setScheme = function( scheme ) {
        SchemeSrv.setScheme( scheme );
      };

      vm.deleteScheme = function( index ) {
        SchemeSrv.deleteScheme( index );
        vm.schemes = SchemeSrv.getSavedSchemes();
      };

      vm.getShareableUrl = function() {
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

      vm.getShareableSchemes = function() {
        clipboard.copyText( localStorage.schemes );
      };

      vm.addSchemes = function() {
        vm.schemes = SchemeSrv.addSchemes( vm.schemesString );
      };

      // Keyboard Events
      $(document).keypress( function(e) {
        if ( e.target.tagName === 'INPUT') { return; }

        $timeout( function() { // TODO: Remove timeout once I find a better way to update scope
          switch ( e.keyCode ) {
            case 113:
                vm.hideUi = false;
                $rootScope.controls.showSideMenu = !$rootScope.controls.showSideMenu;
              break;
            case 102:
              vm.switchFonts();
              break;
            case 104:
                vm.hideUi = !vm.hideUi;
                $rootScope.controls.showSideMenu = false;
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
                vm.setScheme( SchemeSrv.getSavedSchemes()[schemeIndex] );
              }
              break;
            default:
              console.log('This event does not exist: ' + e.keyCode);
          }
        }, 1);
      });
  	}
  ]);
