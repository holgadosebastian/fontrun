'use strict';

angular.module('fontRunApp')
	.service('SchemeSrv', [
		'$rootScope',
		function( $rootScope ) {
			if ( localStorage.getItem('schemes') === null ) {
				localStorage.setItem('schemes', JSON.stringify([]));
			}

			this.getSavedSchemes = function() {
				return JSON.parse(localStorage.getItem('schemes'));
			};

			this.saveCurrentScheme = function() {
				var currentScheme = {},
					schemes = this.getSavedSchemes();

				currentScheme.primaryFont = $rootScope.fonts.primary;
				currentScheme.secondaryFont = $rootScope.fonts.secondary || null;
				currentScheme.primaryColor = $rootScope.colors.primary || null;
				currentScheme.secondaryColor = $rootScope.colors.secondary || null;
				currentScheme.tertiaryColor = $rootScope.colors.tertiary || null;

				schemes.push(currentScheme);

				localStorage.setItem('schemes', JSON.stringify(schemes));
			};

			this.setScheme = function( scheme ) {
				$rootScope.fonts.primary = scheme.primaryFont;
				$rootScope.fonts.secondary = scheme.secondaryFont;
				$rootScope.colors.primary = scheme.primaryColor;
				$rootScope.colors.secondary = scheme.secondaryColor;
				$rootScope.colors.tertiary = scheme.tertiaryColor;
			};

			this.deleteScheme = function ( index ) {
				var schemes = this.getSavedSchemes();

				schemes.splice(index, 1);
				localStorage.setItem('schemes', JSON.stringify(schemes));
			};
		}
	]);
