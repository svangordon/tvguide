angular.module('app')
	.factory('networksFactory', ['emissionsFactory',function(emissionsFactory){

		function Network (name, language, country, guideUrl, streamUrl, logo, color, emissions) {
			this.name = name;
			this.language = language;
			this.country = country;
			this.guideUrl = guideUrl; // The link where you can find the TV guide for that site
			this.streamUrl = streamUrl; // The link to watch that site
			this.logo = logo; // path for the site's logo
			this.color = color;
			this.desc = "";
			this.emissions = emissions;
			this.hover = false
			this.active = true
		}

		var bbc1 = new Network(
			"BBC 1",
			"English",
			'UK' , 
			'http://www.bbc.co.uk/bbcone', 
			'http://www.bbc.co.uk/iplayer/live/bbcone', 
			'http://static.bbci.co.uk/tviplayer/1.92.0/img/logos/svg/bbcone.svg', 
			'#ea2923', 
			emissionsFactory.emissionsByNetwork.bbcOne);
		var bbc2 = new Network(
			"BBC 2",
			"English",
			'UK',
			'#',
			"#",
			"http://vignette2.wikia.nocookie.net/logopedia/images/e/e5/BBC_Two.svg/revision/latest/scale-to-width-down/200?cb=20091103150656",
			"#2d6b83",
			emissionsFactory.emissionsByNetwork.bbcTwo )
		var channel4 = new Network(
			'Channel 4',
			'English',
			'UK',
			'#',
			'http://www.channel4.com/now/c4',
			'http://static.bbci.co.uk/tviplayer/1.92.0/img/logos/svg/channel4.svg',
			'#243e59',
			emissionsFactory.emissionsByNetwork.channelFour )
		var five = new Network('Five', 'English', 'UK', '#', '#', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Channel_5_logo_2011.svg/150px-Channel_5_logo_2011.svg.png', '#e74c3c', emissionsFactory.emissionsByNetwork.five)


		return {
			networks : [bbc1, bbc2, channel4, five],
			activeNetworks : [bbc1, bbc2, channel4, five]
		}

	}])



