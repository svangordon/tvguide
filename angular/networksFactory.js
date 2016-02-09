angular.module('app')
	.factory('networksFactory', [function(){

		function Network (name, language, country, guideUrl, streamUrl, logo, color) {
			this.name = name;
			this.language = language;
			this.country = country;
			this.guideUrl = guideUrl; // The link where you can find the TV guide for that site
			this.streamUrl = streamUrl; // The link to watch that site
			this.logo = logo; // path for the site's logo
			this.color = color;
			this.desc = ""
		}

		var bbc1 = new Network("BBC 1", "English", 'UK' , 'http://www.bbc.co.uk/bbcone', 'http://www.bbc.co.uk/iplayer/live/bbcone', 'http://static.bbci.co.uk/tviplayer/1.92.0/img/logos/svg/bbcone.svg', '#ea2923');
		var channel4 = new Network('Channel 4', 'English', 'UK', '#', 'http://www.channel4.com/now/c4', 'http://static.bbci.co.uk/tviplayer/1.92.0/img/logos/svg/channel4.svg', '#243e59' )
		var rte = new Network('RTE 1', 'English', 'Ireland', '#', '#', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/RT%C3%89_logo.svg/229px-RT%C3%89_logo.svg.png', '#16a085')
		var france2 = new Network('France2', 'French', 'France', '#', 'http://www.france2.fr/direct', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/France_2_logo.svg/100px-France_2_logo.svg.png', '#e74c3c')

		return {
			networks : [bbc1, channel4, rte, france2]
		}

	}])



