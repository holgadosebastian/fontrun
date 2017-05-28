(function() {
  'use strict';

  angular
    .module('fontRunApp')
    .component('ui', {
      templateUrl: 'components/ui/ui.html',
      controller: [
      	'$rootScope',
        '$scope',
      	'$timeout',
      	'$location',
      	'premadeThemes',
      	'SchemeSrv',
      	'clipboard',
        UiController
      ]
    });

    function UiController( $rootScope, $scope, $timeout, $location, premadeThemes, SchemeSrv, clipboard ) {
      var vm = this;

      vm.premadeThemes = premadeThemes;
      vm.primaryFont = angular.copy($rootScope.fonts.primary);
      vm.secondaryFont = angular.copy($rootScope.fonts.secondary);
      vm.updateFont = updateFont;
      vm.switchFonts = switchFonts;
      vm.schemes = SchemeSrv.getSavedSchemes();
      vm.saveCurrentScheme = saveCurrentScheme;
      vm.setScheme = setScheme;
      vm.deleteScheme = deleteScheme;
      vm.getShareableUrl = getShareableUrl;
      vm.getShareableSchemes = getShareableSchemes;
      vm.addSchemes = addSchemes;

      // Keyboard Events
      $(document).keyup( function(e) {
        if ( e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ) { return; }

        $timeout( function() { // TODO: Remove timeout once I find a better way to update scope
          switch ( e.keyCode ) {
            case 81:
                vm.hideUi = false;
                $rootScope.controls.showSideMenu = !$rootScope.controls.showSideMenu;
              break;
            case 70:
              vm.switchFonts();
              break;
            case 72:
                vm.hideUi = !vm.hideUi;
                $rootScope.controls.showSideMenu = false;
              break;
            case 84:
              var currentThemeIndex = _.indexOf(_.pluck(premadeThemes, 'name'), $rootScope.themes.current);
              if ( premadeThemes && currentThemeIndex < premadeThemes.length - 1 ) {
                $rootScope.themes.current = premadeThemes[currentThemeIndex + 1].name;
              } else {
                $rootScope.themes.current = premadeThemes[0].name;
              }
              break;
            case 86:
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
            case 27:
              $scope.$emit('modal.close');
              break;
            default:
              console.log('This event does not exist: ' + e.keyCode);
          }
        }, 1);
      });

      // Private functions
      function updateFont( name, id, event ) {
        if ( event && event.keyCode !== 13) return;
        $rootScope.fonts[id] = name;
        if ( event ) {
          event.target.blur();
        }
      }

      function switchFonts() {
        var mainFont = angular.copy( $rootScope.fonts.primary );

        vm.primaryFont = $rootScope.fonts.primary = $rootScope.fonts.secondary;
        vm.secondaryFont = $rootScope.fonts.secondary = mainFont;
      }

      function saveCurrentScheme() {
        SchemeSrv.saveCurrentScheme();
        vm.schemes = SchemeSrv.getSavedSchemes();
      }

      function setScheme( scheme ) {
        SchemeSrv.setScheme( scheme );
      }

      function deleteScheme( index ) {
        SchemeSrv.deleteScheme( index );
        vm.schemes = SchemeSrv.getSavedSchemes();
      }

      function getShareableUrl() {
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

        $scope.$broadcast('popup.show.schemeShareCurrent');
      }

      function getShareableSchemes() {
        clipboard.copyText( localStorage.schemes );

        $scope.$broadcast('popup.show.schemeShareAll');
      }

      function addSchemes( replace ) {
        var response = SchemeSrv.addSchemes( vm.schemesString, replace );

        if ( !response.error ) {
          vm.schemes = response.schemes;
          $scope.$broadcast('popup.show.schemeAddedSuccess');
          $scope.$emit('modal.close');
          vm.addSchemesError = false;
        } else {
          vm.addSchemesError = true;
        }

        vm.schemesString = undefined;
      }
    }

})();
