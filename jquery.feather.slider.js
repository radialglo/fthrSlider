/*
 *jQuery FeatherSlider v1.0
 *http://www.radialglo.com
 *
 * Copyright 2012, Anthony Su
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 */
(function($) {
	 var FeatherSlider = function(fthr,selector,options){
							//target to merge in, object1, object2
	 var settings = $.extend({}, $.fn.fthrSlider.defaults, options);
	 
	 var album_selector = selector;
	 $(album_selector).css({'list-style':'none','display':'none'});
	 
	 
	 var $gallery = $('<div/>').attr('id','fthrGallery').css({'display': 'none'}),
	 vars = { 
				index : 0 
	};
	 
	 $('body').append($gallery);
	  $gallery.append(
			'<span id="fthr-caption"></span> '
			+'<span id="fthr-button-left">&larr;</span>'
			+'<span id="fthr-button-right">&rarr;</span>'
			+'<span id="fthr-close" >&times;</span>');
	
	var $left = $gallery.children('#fthr-button-left'),
	$right = $gallery.children('#fthr-button-right'),
	$caption = $gallery.children('#fthr-caption'),
	$close = $gallery.children('#fthr-close');
			
			
	 
	 var $overlay = $('<div/>').attr('id','fthr-overlay').css({'height':document.height > $(window).height()? document.height : $(window).height() });

	 
	 $('body').append($overlay);

	
	 
	 
	 $('.fthr-button').click(function() {
	 
			var button = $(this);
	 
			var album = $(this).siblings(album_selector).find('li').find('img');
			vars.index = 0;

	
			var img = createImage(album[vars.index]);
			
			
			$gallery.css({"height": img.height +"px","width": img.width+"px","padding": settings.vPadding +"px "+settings.hPadding+"px"});
			$gallery.append($(img).css({"height":img.height+"px","width":img.width+"px"}));
			$caption.css({"width":img.width - settings.captionPadding*2+"px","padding":settings.captionPadding}).text($(img).attr("alt"));
			
			var voffset = $(window).scrollTop() + ($(window).height() - ( settings.vPadding*2+$gallery.height()))/2;
			
			$gallery.css({"top":voffset+"px"})
	
	
	
			$right.click( function() {
				var next_img = createImage(getNextImage(vars,album));
				$(next_img).load(function(){
					animateGallery(this);
				});

			});
			
			
			
			
			$left.click(function() {
			
				var prev_img = createImage(getPrevImage(vars,album));
				$(prev_img).load(function() {
					animateGallery(this);
				});

			});
			
				
			$(document).on('keydown',this,function(e){
				if(e.keyCode=== 37) {//left
					$left.click();
				}
				if(e.keyCode === 39) {//right
					$right.click();
				}
				if(e.keyCode === 27) {//escape
					$overlay.click();
				}
			});
			
			
			
			$close.click(function() {
				$overlay.click();
			});
			
		
			 $overlay.click(function() {
				
				$left.off('click');
				$right.off('click');
				$close.off('click');
				
				$(document).off('keydown');
				

			$gallery.fadeOut( function() {
				$(this).find('img').remove();
				$overlay.fadeOut();	
			});
			
			$(this).off('click');
		 
		 });
		 
		 
		 $overlay.fadeIn("fast",function(){
			$gallery.fadeIn("fast");
		 });
		 
		 
		 /* @private */
		 
		 function createImage(new_image) {
			var img = new Image();
			img.src = new_image.src;
			img.alt = new_image.alt;
			computeDimensions(img);
		
			return img;
		 }
		 
		 
		 function getNextImage() {
			if(vars.index < album.length-1) {
				vars.index ++;
			} else {
				vars.index = 0;
			}
			return album[vars.index];
		 }
		 
		 
		  function getPrevImage() {
			if(vars.index > 0) {
				vars.index --;
			}else {
				vars.index = album.length-1;
			}
			return album[vars.index];
			
		 }
		 
		 function computeDimensions(img) {
			var gallery_height = $(window).height() - settings.vMargin*2,
			gallery_width = $(window).width() - settings.hMargin*2;
			
			
			if(gallery_height < img.height) {
			
				img.width =  gallery_height * (img.width/img.height);
				
				img.height = gallery_height;
				
			}
		}
		
		function animateGallery(img) {
					
				var gallery_img = $gallery.find('img');
				
				
				$caption.fadeOut();

				gallery_img.fadeOut(function(){
					
					voffset = $(window).scrollTop() + ($(window).height() - ( settings.vPadding*2+img.height))/2;
						
					
						$gallery.animate({"height":img.height+"px","width":img.width+"px","top":voffset+"px"},function(){
						
							$caption.css({"width":img.width - settings.captionPadding*2+"px","padding":settings.captionPadding})
							        .text(img.alt)
							        .fadeIn();
							
							gallery_img.attr({'src':img.src})
									   .css({'width':img.width,'height':img.height})
									   .fadeIn();
						
						});
				});
		}
		
	 });
	 	
	
	 

	 return this; //maintains chainability
	 };


	$.fn.fthrSlider = function(selector,options) {
	
	  return this.each(function(key, value){
            var fthr = $(this);
            // Return early if this element already has a plugin instance
            if (fthr.data('fthrslider')) return fthr.data('fthrslider');
            // Pass options to plugin constructor
            var fthrslider = new FeatherSlider(this,selector,options);
            // Store plugin object in this element's data
            fthr.data('fthrslider', fthrslider);
        });

	};

    $.fn.fthrSlider.defaults = {
		vMargin: 100, 
		hMargin: 100,
		vPadding: 20,
		hPadding: 20,
		captionPadding: 8
	};
	
	$(document).ready(function() {
		$(this).fthrSlider('.gallery-list');
	});
	
})(jQuery);