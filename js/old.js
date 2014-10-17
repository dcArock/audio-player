$(document).ready(function () {

	'use strict';

//	var data = {
//
//			// basic settings
//			'autoplay': false,
//			'fileNameIsTrackName': true,
//			'coverIsAlsoBackground': true,
//			// if backgrounds
//			'switchBackground': true,
//			'showAnimatedDiscOnPlay': false,
//			// if animation
//			'animation': false, // if true, then overide backgrounds, not compatible IE
//			'allowDownload': false,
//			'randomByDefault': false,
//			'phoneBreakpoint': 480,
//
//			// formats
//			'fileType': 'mp3',
//
//			// Paths
//			'pathToMusic': 'tracks/',
//			'pathToCovers': 'img/covers/',
//			'pathToBg': 'img/bg/',
//
//
//			// Playlist styles
//			'fontSizeDesktop': 16,
//			'fontSizePhone': 12,
//			'fontColor': 'white', // hex color or full rgba
//			'iconsColor': 'white',
//			'iconsColorSecondMenu': 'white',
//			'iconSize': 'small', // tiny, small, regular (30px) or large
//
//			'menuStyle': 1, // 1 or 2 
//			'menuPadding': 1, // from 1 to 4, 1: small, 2:medium, 3:big, 4:bigger
//
//
//			// Styles
//			'backgroundOpacity': 1,
//			'backgroundBlur': '5px', // Must be in px, not IE compatible, Firefox limited to 5px blur
//
//			'textBackground': false,
//			'textBackgroundPadding': '.4em',
//			'textBackgroundColor': 'rgba(0,0,0,.1)',
//
//			'playlistBackground': true,
//			'playlistBackgroundColor': 'rgba(0,0,0,.75)',
//
//			// Color / opacity of menu
//			'rgbaColors': true,
//
//			'menuOpacity': 0.25,
//			'menuColor': '0,0,0',
//
//			'secondMenuOpacity': 0.75,
//			'secondMenuColor': '0,0,0',
//
//			'progressBackColor': '255,255,255',
//			'progressBackOpacity': '0.25',
//			'progressFillColor': '255,255,255',
//			'progressFillOpacity': '0.75',
//
//			'volumeSliderColor': 'rgba(255,255,255,.25)', // rgba
//			'volumeSliderOpacity': '0.75', // rgba
//
//			// About page
//			'aboutPageBackgroundColor': 'rgba(0,0,0,.95)',
//			'aboutPageTextColor': 'white',
//
//			// About page
//			'sharePageBackgroundColor': 'rgba(255,255,255,.95)',
//			'sharePageTextColor': 'black',
//			'sharePageIconColor': 'black'
//		},
//
//		// Exact ( case sensitive ) filename of audio files
//		tracks = [
//
//			'shamanique',
//			'Basket Case',
//			'Alic - Proper Language',
//			'Glitch - IGNition',
//			'God is an Astronaut - Calistoga'
//
//		],
//
//		// in order with tracks[], names to be displayed for each track
//		trackNames = [
//
//			'shamanique',
//			'Alic - Proper Language',
//			'Basket Case'
//
//		],
//
//		// covers for each track, in order with tracks[]
//		covers = [
//
//			'1.jpg',
//			'1.jpg',
//			'5.jpg',
//			'4.jpg',
//			'3.jpg'
//		],
//
//		bg = [
//
//			'1.jpg',
//			'5.jpg',
//			'3.jpg',
//			'4.jpg',
//			'2.jpg'
//
//		];

	var media,
		i,
		j,
		ua,
		msie,
		nt,
		curmins,
		cursecs,
		durmins,
		dursecs,
		isPlaying,
		isRandom,
		trackSelected,
		playlistHtml,
		helpIsOpen,
		tmpSeek,
		seekValue,
		backgroundHolder,
		menuPadding,
		first = true,
		isMuted = false,
		tmpDownload,
		tmpRandomRoll,
		menuIsOpen = false,
		firstBg = true,
		classIcon,
		seekslider,
		volumeslider,
		seeking = false,
		seekto;



	// INITIAL SETUP

//	$(data.loadTo).load('player.html');
	
	// Hide playlist and second menu
	$('#menu-2').animate({
		width: 'toggle'
	}, 0);
	$('#playlist').animate({
		height: 'toggle'
	}, 0);


	// Hide Help Page
	helpIsOpen = false;

	// create audio element
	media = new Audio();
	media.preload = "auto";
	media.controls = false;


	// if IE, always hide ANIMATION plugin
	function msieversion() {

		ua = window.navigator.userAgent;
		msie = ua.indexOf("MSIE ");

		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
			return true;

		} else {
			return false;
		}


	}

	if (msieversion()) {

		data.animation = false;

	}


	// DOM
	// HANDLING
	// PART


	// Create HTML Playlist
	for (j = 0; j < tracks.length; j++) {

		playlistHtml = '';
		playlistHtml += '<div class=\"spacer-30\"></div><div class=\"track centered track-' + j + '\" track=\"' + j + '"><div class=\"row\"><div class=\"col-33\"><div class=\"track-img\"><img src=\"' + data.pathToCovers + covers[j] + '\" alt=\"' + tracks[j] + '\"></div></div><div class=\"col-66\"><div class=\"track-text\"><p>';

		if (data.fileNameIsTrackName) {

			playlistHtml += tracks[j];

		} else {

			playlistHtml += trackNames[j];

		}

		playlistHtml += '</p></div></div></div></div>';

		// Append the new HTML blocks
		$('#playlist-holder').append(playlistHtml);

	}

	function updateBackground() {

		if (!firstBg) {

			if (data.coverIsAlsoBackground && covers.length < tracks.length) {
				return;
			}

			if (!data.coverIsAlsoBackground && bg.length < tracks.length) {
				return;
			}

		}

		var tmp;

		backgroundHolder = $('#background');

		// if background changes
		if (data.switchBackground) {

			// update from covers
			if (data.coverIsAlsoBackground) {

				tmp = 'url(\"' + data.pathToCovers + covers[trackSelected] + '\")';

			} else {

				// update from bg
				tmp = 'url(\"' + data.pathToBg + bg[trackSelected] + '\")';

			}

		} else {

			// if no bg switch, keep first from covers
			if (data.coverIsAlsoBackground) {

				tmp = 'url(\"' + data.pathToCovers + covers[0] + '\")';

			} else {

				// or from backgrounds
				tmp = 'url(\"' + data.pathToBg + bg[0] + '\")';

			}

		}

		backgroundHolder.css({
			'background': tmp,
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'background-attachment': 'fixed',
			'background-size': 'cover',
			'opacity': data.backgroundOpacity
		});

		if (data.backgroundBlur.replace('px', '') > 1) {

			backgroundHolder.css({
				'-webkit-filter': ('blur(' + data.backgroundBlur + ')'),
				'-moz-filter': ('blur(' + data.backgroundBlur + ')'),
				'-o-filter': ('blur(' + data.backgroundBlur + ')'),
				'-ms-filter': ('blur(' + data.backgroundBlur + ')'),
				'filter': 'url(#blur)'
			}).addClass('blur');

		}

		firstBg = false;

	}

	if ($(window).width() <= data.phoneBreakpoint) {

		$('.track-text p').css({
			'font-size': data.fontSizePhone,
			'color': data.fontColor
		})

	} else {

		$('.track-text p').css({
			'font-size': data.fontSizeDesktop,
			'color': data.fontColor
		})

	}


	if (data.textBackground) {

		$('.track-text').addClass('with-background')
		$('p').css({
			'background': data.textBackgroundColor,
			'padding': data.textBackgroundPadding
		})

	}

	// Custom Menu style 

	if (data.rgbaColors) {

		$('#menu').css({

			'background': ('rgba(' + data.menuColor + ',' + data.menuOpacity + ')')

		});

		$('#menu-2').css({

			'background': ('rgba(' + data.secondMenuColor + ',' + data.secondMenuOpacity + ')')

		})

	} else {

		$('#menu').css({

			'background': data.menuColor,
			'opacity': data.menuOpacity

		});

		$('#menu-2').css({

			'background': data.secondMenuColor,
			'opacity': data.secondMenuOpacity

		});

	}



	if (data.menuPadding === 1) {

		$('#menu, #menu-2, #playlist, #about').addClass('padding-2');

	}

	if (data.menuPadding === 3) {

		$('#menu, #menu-2, #playlist, #about').addClass('padding-3');

	}

	if (data.menuPadding === 4) {

		$('#menu, #menu-2, #playlist, #about').addClass('padding-4');

	}

	if (data.playlistBackground) {

		$('#playlist').css({
			'background': data.playlistBackgroundColor
		})

	}



	// Progress bar style
	if (data.rgbaColors) {

		$('.progress-bar').css({

			'background': ('rgba(' + data.progressBackColor + ', ' + data.progressBackOpacity + ')')

		});

		$('.progress').css({

			'background': 'rgba(' + data.progressFillColor + ', ' + data.progressFillOpacity + ')'

		})

	} else {

		$('.progress-bar').css({

			'background': data.progressBackColor,
			'opacity': data.progressBackOpacity

		});

		$('.progress').css({

			'background': data.progressFillColor,
			'opacity': data.progressFillOpacity

		});

	}


	// set volume slider opacity
	$('#volumeslider').css({
		'opacity': data.volumeSliderOpacity,
		'background': data.volumeSliderColor
	})



	// remove doanload icon and replace with previous
	if (!data.allowDownload) {

		$('.icon-previous').removeClass('hidden');

		$('#download-anchor').remove();

	}


	if (data.menuStyle === 2) {

		$('.progress-bar, .progression-container, #seekslider').addClass('style-2');

	}

	if (!data.showAnimatedDiscOnPlay) {

		$('.animation-svg').remove();

	} else {

		$('.animation-svg img').fadeOut()

	}

	$('span, .track-clock').css({
		'color': data.iconsColor
	});
	$('svg path').css({
		'fill': data.iconsColor
	});
	$('#menu-2 span, #menu-2 div').css({
		'color': data.iconsColorSecondMenu
	});






	// INITIAL DATA SETUP
	
	// Actual Track
	trackSelected = 0;
	
	if (window.location.hash) {
	
		trackSelected = window.location.hash.replace('#','');
		
		data.autoplay = true;
		
		update();
		
	}

	// If autoplay set to false
	if (data.autoplay) {

		isPlaying = true;

		// INI playlist active covers img
		updatePlaylistActive();

	} else {
		isPlaying = false;
	}

	if (data.randomByDefault) {

		isRandom = true;

	} else {
		isRandom = false;
	}



	// Switch to pause for autoplay on load
	updatePlayPauseButton();

	// Initialize first background
	if (!data.animation) {
		updateBackground();
	}

	// Set Download anchor
	updateDownloadHref();

	// update random button icon
	if (data.randomByDefault) {
		isRandom = true
	}
	updateRandomButton();

	animateDisc();





	//
	// Click handlers
	//





	// Menu icon toggle open / close #menu-2 and #playlist
	$('#menu-button').on('click', function () {

		$('#menu-2').animate({
			width: 'toggle'
		}, 250, function () {
			$('#playlist').animate({
				height: 'toggle'
			}, 250, function () {
				// Check for playing songs when open
				updatePlaylistActive();

				// Playlist click to select track
				$('.track').on('click', function () {

					playlistClick($(this));

				});

			});
		});

		// make contract under playlist appear

		menuIsOpen = !menuIsOpen;

		fadeAnimatedDiscOnMenuOpen();

	});






	// Play button
	$('#play-button').on('click', function () {

		if (isPlaying) {

			// Make track play
			media.pause();

			// Adjust var
			isPlaying = false;

			if (data.showAnimatedDiscOnPlay) {

				$('.animation-svg').removeClass('playing');

			}

		} else if (!isPlaying && isRandom && first) {

			trackSelected = roll();

			isPlaying = true;

			first = false;

			media.play();


		} else {

			media.play();

			isPlaying = true;


		}

		if (!data.animation) {
			
			updateBackground();
		}

		updatePlayPauseButton();

		animateDisc();

		updatePlaylistActive();
		
		updateHash();

	});







	// Next button
	$('#next-button').on('click', function () {

		next();

		update();

	});

	function next() {
		
		isPlaying = false;
		
		updatePlaylistActive();

		animateDisc();

		// Pause actual playing track
		media.pause();

		if (isRandom) {

			randomSelectiveLoop();

		} else {

			// If track isn't last, next
			if ((trackSelected + 1) < tracks.length) {

				trackSelected += 1;

			} else {

				// Else return to start
				trackSelected = 0;

			}

		}

		setActiveAudio();

		// Play the new track
		media.play();

		if (!isPlaying) {

			isPlaying = true;

		}


	}


	// Previous button
	$('#download-button').on('click', function () {

		if (!data.allowDownload) {
			
			isPlaying = false;
		
			updatePlaylistActive();

			animateDisc();

			// Pause actual playing track
			media.pause();

			// 
			if (trackSelected === 0) {

				trackSelected = tracks.length - 1;

			} else {

				// 
				trackSelected -= 1;

			}

			setActiveAudio();

			// Play the new track
			media.play();

			if (!isPlaying) {

				isPlaying = true;

			}

			update();

		}

	});



	// Random button
	$('#random-button').on('click', function () {

		if (isRandom) {

			isRandom = false;

		} else {

			isRandom = true;

		}

		updateRandomButton();

	})



	$('#volume-button').on('click', function () {

		// if muted
		if (isMuted) {

			media.muted = false;

			isMuted = false;

		} else {

			media.muted = true;

			isMuted = true;

		}

		updateMuteButton();

	});


	$('#share').fadeOut(0);

	$('.icon-heart').on('click', function () {

		
		// Load share page
		$('.share-container').load('share.html', function() {
			
			$('#share, #share path').css({
		'background': data.sharePageBackgroundColor,
		'color': data.sharePageTextColor,
		'fill': data.sharePageIconColor
	});

			$('.close').on('mouseenter', function () {

				$('#share').fadeOut(500);

			})

		});
		
		$('#share').fadeIn(500);
		
	});


	// Load share page
	$('.about-container').load('about.html', function () {

		$('#about').animate({
			height: 'toggle'
		});

		$('.about-close').on('mouseenter', function () {

			$('#about').animate({
				height: 'toggle'
			});

		})

	});

	$('.icon-help').on('click', function () {

		$('#about').animate({
			height: 'toggle'
		});

	});

	$('#about').css({
		'background': data.aboutPageBackgroundColor,
		'color': data.aboutPageTextColor
	});
	




	//
	// ICONS HANDLER
	//


	// Play / Pause
	function updatePlayPauseButton() {

		if (isPlaying) {

			// Change the icon
			$('#play-button').html('&#xe609');

		} else {

			$('#play-button').html('&#xe60a');

		}

	}


	// Play / Pause
	function updateMuteButton() {

		if (isMuted) {

			// Change the icon
			$('#volume-button').html('&#xe610');



		} else {

			$('#volume-button').html('&#xe60f');

		}

	}


	function updateRandomButton() {

		if (isRandom) {

			$('#random-button').html('&#xe60d');

		} else {

			$('#random-button').html('&#xe605');

		}

	}



	// wait until DOM is modified then add class
	//	classIcon = ('icon centered ') + data.iconSize;

	// give icons their sizes
	$('svg, span').addClass(data.iconSize);







	//
	// Various functions
	//




	// Update function
	function update() {

		updatePlayPauseButton();

		updatePlaylistActive();

		if (!data.animation) {
			updateBackground();
		}

		animateDisc();

		updateDownloadHref();

//		scrollToActiveIcon();
		
		updateHash();

	}



	// Changes which icon has the ACTIVE STATE
	function updatePlaylistActive() {

		var tmp = '.track-' + trackSelected;

		$('.track-img').removeClass('track-active');

		if (isPlaying) {

			$(tmp).find('.track-img').addClass('track-active');

		}

	}


	// update href for download link or replace with previous button
	function updateDownloadHref() {

		if (data.allowDownload) {

			tmpDownload = '';
//			tmpDownload = window.location;

			tmpDownload += data.pathToMusic + tracks[trackSelected] + '.' + data.fileType;

			$('#download-anchor').attr('href', tmpDownload).attr('download', tracks[trackSelected]);

		}

	}



	// Make playlist change when track is clicked
	function playlistClick(xx) {
		
		
		if (isPlaying && (trackSelected === (Number(xx.attr('track'))))) {
		
			media.pause();
			
			isPlaying = false;
			
			updatePlayPauseButton();
			
			updatePlaylistActive();

			animateDisc();
			
			
			
		} else {
			
			isPlaying = false;
		
			updatePlaylistActive();

			animateDisc();

			trackSelected = Number(xx.attr('track'));

			setActiveAudio();

			// Play the new track
			media.play();

			isPlaying = true;

			update();
			
		}
		

	}

	$('.cube').addClass('loading');




	function setActiveAudio() {

		$('.cube').addClass('loading');

		media.src = data.pathToMusic + tracks[trackSelected] + '.' + data.fileType;

	};

	function updateSeekInputVal() {

		$('input#seekslider').val(0);

		next();

		update();

	}

	function canPlay() {

		$('.cube').removeClass('loading');

	}

	setActiveAudio();

	// next track of track end
	media.addEventListener("ended", updateSeekInputVal, false);

	media.addEventListener("canplay", canPlay, false);




	function roll() {

		var tmpRoll = Math.floor(Math.random() * tracks.length);

		return tmpRoll;

	};

	// lopp handling when is Random but not continous
	function randomSelectiveLoop() {

		// roll new track
		tmpRandomRoll = roll();

		// if roll is active track, re-roll
		if (tmpRandomRoll === trackSelected) {

			randomSelectiveLoop();

		} else {

			// select new track
			trackSelected = tmpRandomRoll;

		}

	}

	// scroll to new active track
	function scrollToActiveIcon() {

		if (isPlaying) {

			$('#playlist').scrollTop(
				
				$('.track-active').offset().top + ($('#menu').innerHeight() + $('#menu-2').innerHeight())
				
			)

		}

	}


	function animateDisc() {

		if (!isPlaying) {

			if (data.showAnimatedDiscOnPlay) {


				$('.animation-svg').fadeOut(0, function () {
					$('.animation-svg').removeClass('playing');
				})

			}

		} else {

			if (data.showAnimatedDiscOnPlay) {

				$('.animation-svg').fadeIn(500).addClass('playing');

			}

		}

	}

	function fadeAnimatedDiscOnMenuOpen() {

		if (data.showAnimatedDiscOnPlay) {

			if (menuIsOpen) {

				$('.animation-svg').animate({
					opacity: 0.2
				}, 1000)

			} else {

				$('.animation-svg').animate({
					opacity: 1
				}, 1000)

			}

		}

	}
	
	
	function updateHash() {
	
		window.location.hash = (trackSelected);
		
	}




	//
	//	EVENTS
	//


	// Progress bar handler

	volumeslider = $('#volumeslider');
	seekslider = $('#seekslider');

	volumeslider.on("mousedown", function (event) {
		setvolume();
	});

	volumeslider.on("mousemove", function (event) {
		setvolume();
	});

	seekslider.on("mousedown", function (event) {

		seeking = true;

	});

	seekslider.on("mousemove", function (event) {
		seek(event);
	});

	seekslider.on("mouseup", function (e) {
		seek(e);
		seeking = false;
	});

	function setvolume() {

		media.volume = Number(volumeslider.val()) / 100;


	}



	function seek(event) {

		// if mouse is over or clicked on slider
		if (seeking) {

			// convert units
			seekto = media.duration * (seekslider.val() / 100);

			// set value to audio new time position
			media.currentTime = seekto;

		}
	}

	function updateProgress() {

		// refreshed every x seconds
		seekValue = 0;

		// if track is played
		//		if (media.currentTime > 0) {

		seekValue = Math.floor((100 / media.duration) * media.currentTime);

		if (data.menuStyle === 2) {

			seekslider.val(seekValue);

		}

		seekValue += '%';
		//		}

		$('.progress').css({
			width: seekValue
		});

	};
	
	function updateTrackCurrentTime() {
		
		nt = media.currentTime * (100 / media.duration);
		seekslider.value = nt;
		curmins = Math.floor(media.currentTime / 60);
	    cursecs = Math.floor(media.currentTime - curmins * 60);
	    durmins = Math.floor(media.duration / 60);
	    dursecs = Math.floor(media.duration - durmins * 60);
		if(cursecs < 10){ cursecs = "0"+cursecs; }
	    if(dursecs < 10){ dursecs = "0"+dursecs; }
	    if(curmins < 10){ curmins = "0"+curmins; }
	    if(durmins < 10){ durmins = "0"+durmins; }
		$('.track-current-time').html((curmins+":"+cursecs));
	    $('.track-duration').html((durmins+":"+dursecs));
		
		
		
	}

	media.addEventListener("timeupdate", function () {
		if (!seeking) {

			updateProgress();
			
			updateTrackCurrentTime();

		}
	});


	//Animation


	if (data.animation) {

		$('#background').hide();
		animation();

	}

	function animation() {

		function loop(callback, interval) {
			var n = Date.now(),
				s = n,
				l = n,
				i = 0;
			var loop = function () {
				!callback(i++, (n = Date.now()) - s, n - l, l = n) && next();
			};
			var next = interval == null ? requestAnimationFrame.bind(null, loop) : setTimeout.bind(null, loop, interval);
			return loop();
		}


		function rgba(rgba) {
			if (typeof rgba !== 'object') rgba = arguments;
			return 'rgba(' + (rgba[0] * 255 + 0.5 | 0) + ',' + (rgba[1] * 255 + 0.5 | 0) + ',' + (rgba[2] * 255 + 0.5 | 0) + ',' + (rgba[3] != null ? rgba[3] : 1).toFixed(3) + ')';
		};

		function gradient(colors, position) {
			var a, b, c, i, l, t = position;
			for (i = 0; c = colors[i++];) {
				if (t - c[0] >= 0 && (!a || t - c[0] < t - a[0])) a = c;
				if (t - c[0] <= 0 && (!b || t - c[0] > t - b[0])) b = c;
			}
			t = (t - a[0]) / (b[0] - a[0]) || 0;
			for (c = [], i = 0, l = a[1].length; i < l;)
				c[i] = a[1][i] + (b[1][i] - a[1][i++]) * t;
			return c;
		}


		var Analyser = window.Analyser = function (context, fft, smoothing) {
			'use strict';
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = context || new AudioContext();
			this.analyser = this.context.createAnalyser();
			this.analyser.fftSize = fft || 2048;
			this.analyser.smoothingTimeConstant = smoothing || 0;
			this.analyser.connect(this.context.destination);
			this.wave = new Uint8Array(this.analyser.frequencyBinCount * 2);
			this.freq = new Uint8Array(this.analyser.frequencyBinCount);
		}

		Analyser.prototype.audio = function (audio) {
			if (this.source) this.source.disconnect();
			this._audio = media;
			this.source = this.context.createMediaElementSource(this._audio);
			this.source.connect(this.analyser);
			return this;
		};

		Analyser.prototype.stream = function (stream) {
			if (this.source) this.source.disconnect();
			this._stream = stream;
			this.source = this.context.createMediaStreamSource(this._stream);
			this.source.connect(this.analyser);
			return this;
		};

		Analyser.prototype.update = function () {
			this.analyser.getByteFrequencyData(this.freq);
			this.analyser.getByteTimeDomainData(this.wave);
			return this;
		};

		Analyser.prototype.amplitude = function (hz) {
			var l = hz / this.context.sampleRate * this.freq.length | 0;
			for (var sum = 0, i = 0; i < l;) sum += this.freq[i++];
			return sum / l / 255;
		};

		var C = document.getElementById('animation');
		var $ = C.getContext('2d'),
			W, H;

		(window.onresize = function () {
			W = C.width = C.clientWidth;
			H = C.height = C.clientHeight;
		})();

		var audio = media;

		var analyser = new Analyser(null, 2048, 0.5).audio(audio);

		var colors = [[
      [0 / 1, [0.1, 0.9, 1.0, 1.0]],
      [1 / 1, [1.0, 0.2, 1.0, 1.0]]
    ], [
      [0 / 4, [0.0, 0.0, 0.0, 1.0]],
      [1 / 4, [0.0, 0.0, 1.0, 1.0]],
      [2 / 4, [1.0, 0.0, 0.0, 1.0]],
      [3 / 4, [1.0, 1.0, 0.0, 1.0]],
      [4 / 4, [1.0, 1.0, 1.0, 1.0]]
    ]];




		loop(function (f, t, dt) {

			analyser.update();

			var amp = analyser._audio.duration ? Math.min(1, Math.pow(1.25 * analyser.amplitude(15e3), 2)) : 0.5 - 0.25 * Math.cos(t / 1000);

			var s = 1.01 + 0.09 * amp;
			$.setTransform(s, 0, 0, s, W / 2, H / 2);
			$.drawImage(C, -W / 2, -H / 2);


			$.fillStyle = rgba(0, 0, 0, 0.05);


			$.fillRect(-W / 2, -H / 2, W, H);

			$.setTransform(1, 0, 0, 1, W / 2, H / 2);
			$.beginPath();
			for (var a, r, i = 0, j = analyser.wave.length; i < j; i++) {
				a = i / j * 2 * Math.PI;
				r = amp * 256 * (0.5 + analyser.wave[i] / 255);
				$.lineTo(r * Math.sin(a), r * Math.cos(a));
			}

			var c = gradient(colors[0], amp);
			c[3] = amp;
			$.fillStyle = rgba(c);
			$.strokeStyle = rgba(c[0] * 1.25, c[1] * 1.25, c[2] * 1.25, c[3]);
			$.lineWidth = 4 * amp;
			$.fill();
			$.stroke();


		});



	}

	if (data.autoplay) {

		media.play();

	}



	// hide page loader
	$('#loader').delay(250).fadeOut(500);

});