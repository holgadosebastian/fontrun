'use strict';

angular
  .module('fontRunApp', [])
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
  .run( function( $rootScope, premadeThemes ) {
    $rootScope.fonts = {};
    $rootScope.fonts.fontPrimary = 'Arial';
    $rootScope.fonts.secondary = 'Arial';

    $rootScope.colors = {};
    $rootScope.colors.primary = 'FF0000';
    $rootScope.colors.secondary = '00FF00';
    $rootScope.colors.tertiary = '0000FF';

    $rootScope.themes = {};
    $rootScope.themes.current = premadeThemes[0].name;
  });
