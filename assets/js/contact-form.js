jQuery(document).ready(function () {
	jQuery('#submit').on('click', document, function () {
		if (jQuery('#captcha_val').val() != jQuery('#captcha_text').val()) {
			$('#captcha_text').parent('div').append('<span class="error">Captch is not match</span>');
		}
		else {
			jQuery("#contactpage").validate({
				submitHandler: function (e) {
					submitSignupFormNow(jQuery("#contactpage"))
				},
				rules: {
					fname: {
						required: true
					},
					email: {
						required: true,
						email: true
					}
				},
				errorElement: "span",
				errorPlacement: function (e, t) {
					e.appendTo(t.parent())
				}
			});
			submitSignupFormNow = function (e) {
				var t = e.serialize();
				var n = "contact-form.php";
				jQuery.ajax({
					url: n,
					type: "POST",
					data: t,
					success: function (e) {
						var t = jQuery.parseJSON(e);
						if (t.status == "Success") {
							jQuery("#form_result").html('<span class="form-success alert alert-success d-block">' + t.msg + "</span>");
						} else {
							jQuery("#form_result").html('<span class="form-error alert alert-danger d-block">' + t.msg + "</span>")
						}
						jQuery("#form_result").show();
					}
				});
				return false
			}
		}
	});

	// Mobil cihazlarda video kartlarının alt alta düzenlenmesi
	function checkMobile() {
		if (window.matchMedia("(max-width: 767px)").matches) {
			if (jQuery("#owl-carouseltwo").hasClass("owl-carousel")) {
				jQuery("#owl-carouseltwo").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				jQuery("#owl-carouseltwo").find('.owl-stage-outer').children().unwrap();

				// Kartlar arasındaki boşluğu arttır
				jQuery("#owl-carouseltwo .item").css({
					"margin-bottom": "60px"
				});

				// Son elemanda margin olmasın
				jQuery("#owl-carouseltwo .item:last-child").css({
					"margin-bottom": "0"
				});
			}
		} else {
			// Kartlar arasındaki margin'i sıfırla
			jQuery("#owl-carouseltwo .item").css({
				"margin-bottom": ""
			});

			if (!jQuery("#owl-carouseltwo").hasClass("owl-carousel")) {
				jQuery("#owl-carouseltwo").addClass('owl-carousel').owlCarousel({
					loop: true,
					margin: 30,
					dots: true,
					nav: false,
					autoplay: true,
					responsive: {
						0: {
							items: 1
						},
						768: {
							items: 2
						},
						992: {
							items: 3
						}
					}
				});
			}
		}
	}

	// Sayfa yüklendiğinde ve boyutu değiştiğinde kontrol et
	checkMobile();
	jQuery(window).resize(function () {
		checkMobile();
	});
})
