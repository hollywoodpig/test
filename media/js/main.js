$(document).ready(function() {

	var state = 0;

	// HEAD TIME
	function clock() {
		var time = new Date(),
			hours = time.getHours(),
			minutes = time.getMinutes()
		document.querySelectorAll('#time')[0].innerHTML = harold(hours) + ":" + harold(minutes);
		function harold(standIn) {
			if (standIn < 10) {
				standIn = '0' + standIn
			}
			return standIn;
		}
	}

	//ALL ADAPTATIONS
	$('.form-hide').on('click', function() {
		$('.form-for-check').fadeIn(600);
	});
	$('.close-form').on('click', function() {
		$('.form-for-check').fadeOut(600);
	});
	$('.hamurger').on('click', function() {
		$('.main-menu').css('transform', 'translateX(0)');
		$('header').css('margin-left', '280px');
		$('.main-content').css('transform', 'translateX(280px)');
		state += 1;

		if (state % 2 == 0) {
			$('.main-menu').css('transform', ''); 
			$('header').removeAttr("style"); 
			$('.main-content').removeAttr("style");         
			state = 0;
		}
	});
	// REMOVE BUGS
	(function($) {
		var $window = $(window),
		$html = $('html');

		$window.resize(function resize() {
			if ($window.width() > 1000) {
				$('.main-menu').css('transform', '');
				$('header').removeAttr("style");
				$('.main-content').removeAttr("style");
			}
			if ($window.width() > 800) {
				$(".form-for-check").removeAttr("style");
			}
			if ($window.width() <= 1300) {
				clearInterval(clock_timer);
			} else if ($window.width() > 1300) {
				var clock_timer = setInterval(clock, 1000);               
			}
		}).trigger('resize');
	})(jQuery);

	//FULL SCREEN
	$('.sizer').on('click', function() {
		$('#max').toggle();
		$('#min').toggle();
		$('#max').css('dispalay', 'none');
		$('#min').css('dispalay', 'block');
	});

	const target = $('#target')[0];
	$('#max').on('click', () => {
		if (screenfull.enabled) {
			screenfull.request(target);
		}
	});
	$('#min').on('click', () => {
		if (screenfull.enabled) {
			screenfull.exit(target);
		}
	});

	// upload files button

	$('.collect_file').change(function () {
		if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
		else $(this).prev().text('Выберите файлы');
	});

	function showFile(e) {
		var files = e.target.files;
		for (var i = 0, f; f = files[i]; i++) {
			if (!f.type.match('image.*')) continue;
			var fr = new FileReader();
			fr.onload = (function (theFile) {
				return function (e) {
					var photo = document.getElementById('same-file');
					photo.style.backgroundImage = "url('" + e.target.result + "')";
				};
			})(f);

			fr.readAsDataURL(f);
		}
	}
	document.getElementById('preview').addEventListener('change', showFile, false);

	// set value from progress-bar aria-valuenow attribute to progress-bar style - width: %aria-valuenow value%;

	var updateTime = 1000;
	var progressBarsArr = $(".progress-bar");

	var updateProgressBar = setInterval(function () {
		$.each(progressBarsArr, function (index) {
			$(this).css( "width", $(this).attr("aria-valuenow") + "%" );
		});
	}, updateTime);      

});