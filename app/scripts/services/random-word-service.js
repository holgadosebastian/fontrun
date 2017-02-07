'use strict';

angular.module('fontRunApp')
	.service('RandomWordSrv', function() {
		var randomWords = [
			'Phenomenon',
			'Galaxy',
			'Technique',
			'History',
			'Nomenclature',
			'Spectrographic',
			'Western',
			'Dark',
			'matter',
			'Evolution',
			'Speakers',
			'Classical',
			'Thermonuclear',
			'Random',
			'Astronomy',
			'Conglomerate',
			'Purpose',
			'Breakthroughs',
			'Fundamental',
			'Tenuous',
			'Immortal',
			'International',
			'Intersects',
			'Objects',
			'Surrounded',
			'Further',
			'Variations',
			'Dramatically',
			'Mathematical',
			'Communities',
			'Exhortations'
		];

		this.getRandomWords = function( amount ) {
			return _.sample( randomWords, amount);
		};
	});
