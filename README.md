audio-player
============

HTML5 audio player with various settings to customize

Examples of setups available :

http://dcarock.com/music/player1.html
http://dcarock.com/music/player2.html
http://dcarock.com/music/player3.html



You can also import the #player div in your html page. Make shure to add the main.css and the player.js





Available options : ( on the html page before including player.js )


var data = {

			// basic settings
			
			'autoplay': true,                 if the track should play when the page is loaded
			'fileNameIsTrackName': true,      if the file name of the track is also the title to be displayed
			'coverIsAlsoBackground': false,   if the cover image is also the background image for that track
			'switchBackground': true,         set to false if you only want one background
			'showAnimatedDiscOnPlay': true,   displayes a rotating disc wen a track is playing
			'animation': true,                display an cool animation, not compatible IE and firefox volume will be useless ( to fix )
			'allowDownload': false,           replaces the previous button with a download link
			'randomByDefault': false,         if your playlist should be played randomly on page load
			'phoneBreakpoint': 480,           what width do you want your menu / playlist to adjust to small devices

			// formats
			'fileType': 'mp3',                the filetype of you tracks ( mp3 / ogg / wav )

			// Paths
			'pathToMusic': 'tracks/',         path to your audio files
			'pathToCovers': 'img/covers/',    path to your covers images
			'pathToBg': 'img/bg/',            path to your background images       


			// Playlist styles
			'fontSizeDesktop': 16,            in pixels, for all icons in the menu
			'fontSizePhone': 12,              
			'fontColor': 'white',             can be hex or rgba values, for the playlist track names
			'iconsColor': 'white',            for the menu
			'iconsColorSecondMenu': 'white',  for the second menu   
			'iconSize': 'small',              tiny, small, regular (30px) or large

			'menuStyle': 1,                   1 or 2, different progress bar styles 
			'menuPadding': 1,                 from 1 to 4, 1: small, 2:medium, 3:big, 4:bigger


			// Styles
			'backgroundOpacity': 1,           from 0 to 1
			'backgroundBlur': '0',            Must be in px ( 5px for example ), not IE compatible, Firefox set to 5px blur

			'textBackground': false,          if the track title should have a background
			'textBackgroundPadding': '.4em',  its size, can be in px, em ...
			'textBackgroundColor': 'rgba(0,0,0,.1)',

			'playlistBackground': false,      true will display a background behind the playlist
			'playlistBackgroundColor': 'rgba(255,255,255,.25)',

			// Color
			'rgbaColors': true,               for the next settings, set to true or false for hex values

			'menuOpacity': 0.25,              opacity of the primary menu
			'menuColor': '0,0,0',             it color, here in rgba ( the alpha channel is it's opacity value on top )       

			'secondMenuOpacity': 0.25,
			'secondMenuColor': '0,0,0',

			'progressBackColor': '255,255,255',
			'progressBackOpacity': '0.05',
			'progressFillColor': '255,255,255',
			'progressFillOpacity': '0.75',

			'volumeSliderColor': 'rgba(255,255,255,.25)',    // rgba
			'volumeSliderOpacity': '0.75',                   // rgba

			// About page
			'aboutPageBackgroundColor': 'rgba(0,0,0,.95)',   
			'aboutPageTextColor': 'white',

			// About page
			'sharePageBackgroundColor': 'rgba(255,255,255,.95)',
			'sharePageCloseColor': '#131313'
		},

		                                    // Exact ( case sensitive ) filename of audio files
		tracks = [
			
			'Triptamine',
			'Shifts',
			'Drowning in Time',
			'Glitch',
			'Oxidation',
			'Harmony',
			'8\'s & 0\'s',
			'Golden God'

		],

		                                   // in order with tracks[], names to be displayed for each track
		trackNames = [

			'Triptamine - Chris Arock - 2014',
			'Shifts - IGNition',
			'Drowning in Time - projection',
			'Glitch - work in progress',
			'Oxidation',
			'Harmony',
			'8\'s & 0\'s',
			'Golden God'

		],

		                                 // covers for each track, in order with tracks[], case sensitive
		covers = [

			'1.jpg',
			'2.jpg',
			'3.jpg',
			'4.jpg',
			'5.jpg',
			'6.jpg',
			'7.jpg',
			'8.jpg'
			
		],

		bg = [

			'1.jpg',
			'2.jpg',
			'3.jpg',
			'4.jpg',
			'5.jpg',
			'6.jpg',
			'7.jpg',
			'8.jpg'

		];

