'use strict';

angular.module('fontRunApp')
	.service('RandomContentSrv', function() {
		var words = [
			'Phenomenon',
			'Galaxy',
			'Technique',
			'History',
			'Nomenclature',
			'Spectrographic',
			'Western',
			'Dark',
			'Matter',
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

		var titles = [
			'First Flight',
			'Eas na Glutachan',
			'Delaware Boundary Markers',
			'Heron Pond Swan Lake Trail',
			'Partille IF',
			'South Carolina Highway 127',
			'Capo Caccia Lighthouse',
			'Nassim Dehouche',
			'Island Lake (Nevada)',
			'Acer dettermani',
			'Ramendra Narayan Kalita',
			'Ælfwine of Winchester',
			'Calathus carvalhoi'
		];

		var descriptions = [
			'The Medal of Honor was first awarded in the American Civil War. President Abraham Lincoln signed a bill containing a provision for the medal for the Navy on December 21, 1861. It was "to be bestowed upon such petty officers, seamen, landsmen, and Marines as shall most distinguish themselves by their gallantry and other seamanlike qualities during the present war." Legislation to include the Army was signed into law on July 12, 1862.',
			'Potrero del Llano was originally built by Palmers Shipbuilding and Iron Company, Hebburn-on-Tyne as the F.A. Tamplin, for service with T.W. Tamplin & Co., of London. She was sold in 1921 to the Belgian company SA d\'Armement, d\'Industrie & de Commerce, of Antwerp, and was renamed Arminco, and was sold again in 1930 to the Italian company Società Italiana Transporti Petroliferi (SITP).',
			'Virgil David Cantini (1919–2009) was an enamelist, sculptor and educator. He was well known for innovation with enamel and steel and received both local and national recognition for his work, including honorary awards, competitive prizes and commissions, along with a Guggenheim Fellowship in 1957. Cantini long served as a faculty member at the University of Pittsburgh.',
			'A Rochette bridge is a type of dental prosthesis popular in the 1970s, and described by Alain Rochette in 1973 as a form of resin retained bridge that relied on countersunk holes perforating the metal abutment wing. These would be filled with composite cement on seating the restoration, providing macromechanical retention for the prosthesis.',
			'Mieliwo [mjɛˈlivɔ] is a village in the administrative district of Gmina Zbiczno, within Brodnica County, Kuyavian-Pomeranian Voivodeship, in north-central Poland. It lies 6 kilometres (4 mi) north-west of Zbiczno, 15 km (9 mi) north-west of Brodnica, and 60 km (37 mi) north-east of Toruń.',
			'This is a list of notable cheese dishes in which cheese is used as a primary ingredient or as a significant component of a dish or a food. Cheese is a food derived from milk that is produced in a wide range of flavors, textures, and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.',
			'Killjoys is a Canadian space adventure drama series that airs on Space channel in Canada. The show was officially ordered to series on October 7, 2013, with a 10-episode pick-up. In April 2014, it was announced that Syfy would co-produce the series, and the first season premiered June 19, 2015. The series was renewed for a second season in September 2015, which premiered on July 1, 2016. Killjoys was renewed for a third season in September 2016, which is set to premiere in 2017.'
		];

		this.getRandomWords = function( amount ) {
			return _.sample( words, amount );
		};

		this.getRandomTitle = function() {
			return _.sample( titles, 1 )[0];
		};

		this.getRandomDescription = function() {
			return _.sample( descriptions, 1 )[0];
		};
	});
