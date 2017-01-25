'use strict';

angular
  .module('fontRunApp', [
    'ngRoute'
  ])
  .constant( 'premadeThemes', [
    { name: 'agnostic' },
    { name: 'blizzard' },
    { name: 'cupcake' },
    { name: 'cupcake-flat' },
    { name: 'future' },
    { name: 'googly' },
    { name: 'hip' },
    { name: 'lean' },
    { name: 'retro' }
  ])
  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'views/home.html'
        })
        .otherwise( {
          redirectTo: '/home'
        });
      }
  ])
  .run([
    '$rootScope',
    'premadeThemes',
    function( $rootScope, premadeThemes ) {
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
    }
  ]);
