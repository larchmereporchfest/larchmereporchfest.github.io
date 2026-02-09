$(document).ready(function(e) {
	$("img.lazy").lazyload();
	$('a.scroll').click(function(){
		$('html, body').animate({
			scrollTop: $('#' + $(this).attr('href').substr(1)).offset().top - 90
		}, 500);
		return false;
	});
});
//
function createStorylines() {
	createFeatures();
}
//
function createFeatures(itemWidth, itemHeightPercentage) {
	$.each($('.feature'), function(i,v) {
		$(this).parent().find(".carousel_prev").css("display", "none");
		$(this).parent().find(".carousel_next").css("display", "none");
		$(this).carouFredSel({
			width: "100%",
			height: 470,
			items: {
				visible: 1,
				width: 1920,
				height: 470
			},
			auto : false,
			prev : $(this).parent().find(".carousel_prev"),
			next : $(this).parent().find(".carousel_next"),
			scroll: {
				easing: "quadratic",
				fx: "crossfade",
				onAfter: function( data ) {
					loadImage( data.items.old.prev());
					loadImage( data.items.visible.next());
				}
			},
			onCreate: function( data ) {
				$(this).find(".slide").css("visibility", "visible");
				if ((data.items).length > 1) {
					$(this).parent().find(".carousel_prev").css("display", "block");
					$(this).parent().find(".carousel_next").css("display", "block");
				}
				$.each(data.items, function(i, v) {
					loadImage($(this));
				});
				loadImage( data.items.next());
			}
		});
	});
}
//	load the actual image
function loadImage( $img ) {
	if ( !$img.is( 'img' ) ) {
		$img = $img.find( 'img' );
	}
	if ( $img.is( 'img' ) ) {
		if ( $img.attr( 'src' ).indexOf( 'placeholder' ) != -1 ) {
			$img.attr( 'src', $img.data( 'original' ) ).load(function() {}); 
		}
	}
}
//
function pauseSlideshows() {
	$('.feature').trigger("pause");
}
//
function resumeSlideshows() {
	$('.feature').trigger("play");
}