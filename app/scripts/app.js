'use strict';

angular
  .module('fontRunApp', [
    'ngRoute',
    'angular-clipboard'
  ])
  .constant( 'premadeThemes', [
    { name: 'agnostic' },
    { name: 'retro' },
    { name: 'blizzard' },
    { name: 'future' }
    // { name: 'cupcake' },
    // { name: 'cupcake-flat' },
    // { name: 'googly' },
    // { name: 'hip' },
    // { name: 'lean' },
  ])
  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home-view.html',
          controller: 'MainCtrl',
          controllerAs: 'main',
          resolve: {
            view: function() {
              return 'theme';
            }
          }
        })
        .when('/test', {
          templateUrl: 'views/test-view.html',
          controller: 'MainCtrl',
          controllerAs: 'main',
          resolve: {
            view: function() {
              return 'card';
            }
          }
        })
        .otherwise( {
          redirectTo: '/'
        });
      }
  ])
  .run([
    '$rootScope',
    '$location',
    'premadeThemes',
    function( $rootScope, $location, premadeThemes ) {
      var body = document.body;
      var queryParams = $location.search();

      $rootScope.view = {};

      $rootScope.controls = {};
      $rootScope.controls.showSideMenu = true;

      $rootScope.fonts = {};
      $rootScope.fonts.primary = queryParams.primaryfont || 'Abril+Fatface';
      $rootScope.fonts.secondary =  queryParams.secondaryfont || 'Raleway';
      $rootScope.fonts.getGoogleFonts = function () {
        var fonts = $rootScope.fonts.primary;

        if ( $rootScope.fonts.secondary ) {
          fonts += '|' + $rootScope.fonts.secondary;
        }

        return fonts;
      };

      $rootScope.colors = {};
      $rootScope.colors.primary = queryParams.primarycolor || 'F53357';
      $rootScope.colors.secondary = queryParams.secondarycolor || '47384D';
      $rootScope.colors.tertiary = queryParams.tertiarycolor || '3F585F';

      $rootScope.themes = {};
      $rootScope.themes.current = premadeThemes[0].name;

      $rootScope.$watch('colors.primary', function(newColor, oldColor) {
        if (newColor !== oldColor ) {
          body.style.setProperty('--primary-color', '#' + newColor);
        }
      });

      $rootScope.$watch('colors.secondary', function(newColor, oldColor) {
        if (newColor !== oldColor ) {
          body.style.setProperty('--secondary-color', '#' + newColor);
        }
      });

      $rootScope.$watch('colors.tertiary', function(newColor, oldColor) {
        if (newColor !== oldColor ) {
          body.style.setProperty('--tertiary-color', '#' + newColor);
        }
      });

    }
  ]);
