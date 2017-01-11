'use strict';

angular
  .module('fontRunApp', [])
  .run( function( $rootScope ) {
    $rootScope.fonts = {};
    $rootScope.fonts.fontPrimary = 'Arial';
    $rootScope.fonts.secondary = 'Arial';

    $rootScope.colors = {};
    $rootScope.colors.primary = 'FF0000';
    $rootScope.colors.secondary = '00FF00';
    $rootScope.colors.tertiary = '0000FF';
  });
