'use strict';

angular
  .module('fontRunApp', [
    'ngRoute'
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
          templateUrl: 'views/home-view.html'
        })
        .when('/test', {
          templateUrl: 'views/test-view.html'
        })
        .otherwise( {
          redirectTo: '/'
        });
      }
  ])
  .run([
    '$rootScope',
    'premadeThemes',
    function( $rootScope, premadeThemes ) {
      var body = document.body;

      $rootScope.fonts = {};
      $rootScope.fonts.primary = 'Abril+Fatface';
      $rootScope.fonts.secondary = 'Raleway';
      $rootScope.fonts.getGoogleFonts = function () {
        var fonts = $rootScope.fonts.primary;

        if ( $rootScope.fonts.secondary ) {
          fonts += '|' + $rootScope.fonts.secondary;
        }

        return fonts;
      };

      $rootScope.colors = {};
      $rootScope.colors.primary = 'F53357';
      $rootScope.colors.secondary = '47384D';
      $rootScope.colors.tertiary = '3F585F';

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
