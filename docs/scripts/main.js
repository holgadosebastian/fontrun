"use strict";angular.module("fontRunApp",["ngRoute","angular-clipboard"]).constant("premadeThemes",[{name:"agnostic"},{name:"retro"},{name:"blizzard"},{name:"future"}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home-view.html",controller:"MainCtrl",controllerAs:"main",resolve:{view:function(){return"theme"}}}).when("/test",{templateUrl:"views/test-view.html",controller:"MainCtrl",controllerAs:"main",resolve:{view:function(){return"card"}}}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","premadeThemes",function(a,b,c){var d=document.body,e=b.search();a.view={},a.controls={},a.controls.showSideMenu=!0,a.fonts={},a.fonts.primary=e.primaryfont||"Abril+Fatface",a.fonts.secondary=e.secondaryfont||"Raleway",a.fonts.getGoogleFonts=function(){var b=a.fonts.primary;return a.fonts.secondary&&(b+="|"+a.fonts.secondary),b},a.colors={},a.colors.primary=e.primarycolor||"F53357",a.colors.secondary=e.secondarycolor||"47384D",a.colors.tertiary=e.tertiarycolor||"3F585F",a.themes={},a.themes.current=c[0].name,a.$watch("colors.primary",function(a,b){a!==b&&d.style.setProperty("--primary-color","#"+a)}),a.$watch("colors.secondary",function(a,b){a!==b&&d.style.setProperty("--secondary-color","#"+a)}),a.$watch("colors.tertiary",function(a,b){a!==b&&d.style.setProperty("--tertiary-color","#"+a)})}]),angular.module("fontRunApp").controller("MainCtrl",["$rootScope","RandomContentSrv","view",function(a,b,c){a.view.current=c;var d=this;d.setSkills=function(){for(var a=[],c=0;3>c;c++)a.push({title:b.getRandomTitle(),description:b.getRandomDescription().substring(0,130)+"."});d.skills=a},d.setRandomWords=function(){d.randomWords=b.getRandomWords(30)},d.setBlogPosts=function(){for(var a=[],c=0;3>c;c++)a.push({title:b.getRandomTitle(),subtitle:b.getRandomTitle(),description:b.getRandomDescription()});d.blogPosts=a},d.setSkills(),d.setRandomWords(),d.setBlogPosts()}]),angular.module("fontRunApp").controller("MenuCtrl",["$rootScope","$scope","$timeout","$location","premadeThemes","SchemeSrv","clipboard",function(a,b,c,d,e,f,g){var h=this;h.premadeThemes=e,h.switchFonts=function(){var b=angular.copy(a.fonts.primary);a.fonts.primary=a.fonts.secondary,a.fonts.secondary=b},h.schemes=f.getSavedSchemes(),h.saveCurrentScheme=function(){f.saveCurrentScheme(),h.schemes=f.getSavedSchemes()},h.setScheme=function(a){f.setScheme(a)},h.deleteScheme=function(a){f.deleteScheme(a),h.schemes=f.getSavedSchemes()},h.getShareableUrl=function(){d.search({primarycolor:a.colors.primary,secondarycolor:a.colors.secondary,tertiarycolor:a.colors.tertiary,primaryfont:a.fonts.primary,secondaryfont:a.fonts.secondary}),c(function(){g.copyText(location.href)},1)},h.getShareableSchemes=function(){g.copyText(localStorage.schemes)},h.addSchemes=function(){h.schemes=f.addSchemes(h.schemesString)},$(document).keypress(function(b){c(function(){switch(b.keyCode){case 113:a.controls.showSideMenu=!a.controls.showSideMenu;break;case 102:h.switchFonts();break;case 116:var c=_.indexOf(_.pluck(e,"name"),a.themes.current);e&&c<e.length-1?a.themes.current=e[c+1].name:a.themes.current=e[0].name;break;case 118:var g=a.view.current;"theme"===g?(a.view.current="card",d.url("/test")):(a.view.current="theme",d.url("/"));break;case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:var i=b.keyCode-49,j=f.getSavedSchemes();j&&j.length>i&&h.setScheme(f.getSavedSchemes()[i]);break;default:console.log("This event does not exist: "+b.keyCode)}},1)})}]),angular.module("fontRunApp").service("SchemeSrv",["$rootScope",function(a){null===localStorage.getItem("schemes")&&localStorage.setItem("schemes",JSON.stringify([])),this.getSavedSchemes=function(){return JSON.parse(localStorage.getItem("schemes"))},this.saveCurrentScheme=function(){var b={},c=this.getSavedSchemes();b.primaryFont=a.fonts.primary,b.secondaryFont=a.fonts.secondary||null,b.primaryColor=a.colors.primary||null,b.secondaryColor=a.colors.secondary||null,b.tertiaryColor=a.colors.tertiary||null,c.push(b),localStorage.setItem("schemes",JSON.stringify(c))},this.setScheme=function(b){a.fonts.primary=b.primaryFont,a.fonts.secondary=b.secondaryFont,a.colors.primary=b.primaryColor,a.colors.secondary=b.secondaryColor,a.colors.tertiary=b.tertiaryColor},this.deleteScheme=function(a){var b=this.getSavedSchemes();b.splice(a,1),localStorage.setItem("schemes",JSON.stringify(b))},this.addSchemes=function(a){var b={},c=[];try{c=JSON.parse(a)}catch(d){console.log(d),b.error="The format was incorrect"}if(c.length>0){var e=this.getSavedSchemes();localStorage.setItem("schemes",JSON.stringify(e.concat(c))),b.schemes=this.getSavedSchemes()}return b}}]),angular.module("fontRunApp").service("RandomContentSrv",function(){var a=["Phenomenon","Galaxy","Technique","History","Nomenclature","Spectrographic","Western","Dark","Matter","Evolution","Speakers","Classical","Thermonuclear","Random","Astronomy","Conglomerate","Purpose","Breakthroughs","Fundamental","Tenuous","Immortal","International","Intersects","Objects","Surrounded","Further","Variations","Dramatically","Mathematical","Communities","Exhortations"],b=["First Flight","Eas na Glutachan","Delaware Boundary Markers","Heron Pond Swan Lake Trail","Partille IF","South Carolina Highway 127","Capo Caccia Lighthouse","Nassim Dehouche","Island Lake (Nevada)","Acer dettermani","Ramendra Narayan Kalita","Ælfwine of Winchester","Calathus carvalhoi"],c=['The Medal of Honor was first awarded in the American Civil War. President Abraham Lincoln signed a bill containing a provision for the medal for the Navy on December 21, 1861. It was "to be bestowed upon such petty officers, seamen, landsmen, and Marines as shall most distinguish themselves by their gallantry and other seamanlike qualities during the present war." Legislation to include the Army was signed into law on July 12, 1862.',"Potrero del Llano was originally built by Palmers Shipbuilding and Iron Company, Hebburn-on-Tyne as the F.A. Tamplin, for service with T.W. Tamplin & Co., of London. She was sold in 1921 to the Belgian company SA d'Armement, d'Industrie & de Commerce, of Antwerp, and was renamed Arminco, and was sold again in 1930 to the Italian company Società Italiana Transporti Petroliferi (SITP).","Virgil David Cantini (1919–2009) was an enamelist, sculptor and educator. He was well known for innovation with enamel and steel and received both local and national recognition for his work, including honorary awards, competitive prizes and commissions, along with a Guggenheim Fellowship in 1957. Cantini long served as a faculty member at the University of Pittsburgh.","A Rochette bridge is a type of dental prosthesis popular in the 1970s, and described by Alain Rochette in 1973 as a form of resin retained bridge that relied on countersunk holes perforating the metal abutment wing. These would be filled with composite cement on seating the restoration, providing macromechanical retention for the prosthesis.","Mieliwo [mjɛˈlivɔ] is a village in the administrative district of Gmina Zbiczno, within Brodnica County, Kuyavian-Pomeranian Voivodeship, in north-central Poland. It lies 6 kilometres (4 mi) north-west of Zbiczno, 15 km (9 mi) north-west of Brodnica, and 60 km (37 mi) north-east of Toruń.","This is a list of notable cheese dishes in which cheese is used as a primary ingredient or as a significant component of a dish or a food. Cheese is a food derived from milk that is produced in a wide range of flavors, textures, and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.","Killjoys is a Canadian space adventure drama series that airs on Space channel in Canada. The show was officially ordered to series on October 7, 2013, with a 10-episode pick-up. In April 2014, it was announced that Syfy would co-produce the series, and the first season premiered June 19, 2015. The series was renewed for a second season in September 2015, which premiered on July 1, 2016. Killjoys was renewed for a third season in September 2016, which is set to premiere in 2017."];this.getRandomWords=function(b){return _.sample(a,b)},this.getRandomTitle=function(){return _.sample(b,1)[0]},this.getRandomDescription=function(){return _.sample(c,1)[0]}}),angular.module("fontRunApp").filter("fontName",function(){return function(a){return a.replace(new RegExp("[+]","g")," ")}});
