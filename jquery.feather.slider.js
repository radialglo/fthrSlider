/*
 *jQuery FeatherSlider v1.1
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
	     $left = $('<span/>').attr('id','fthr-button-left').html('&lsaquo;'),
	     $right = $('<span/>').attr('id','fthr-button-right').html('&rsaquo;'),
	     $caption = $('<span/>').attr('id','fthr-caption'),
	     $close = $('<span/>').attr('id','fthr-close').html('&times;'),
	     vars = { 
				index : 0 
	     };
	 
	 $('body').append(
			 $gallery.append(
				$caption,$left,$right,$close
			 )
	 );
	
			
			
	 //create Overlay 
	 var $overlay = $('<div/>').attr('id','fthr-overlay').css({'height':document.height > $(window).height()? document.height : $(window).height() });

	 $(window).resize(function() {
		$overlay.css({'height':document.height > $(window).height()? document.height : $(window).height() });
	 });

	 
	 $('body').append($overlay);

	
	 
	 
	 $('.fthr-button').click(function() {
	 
			var button = $(this);
	 
			var album = $(this).siblings(album_selector).find('li').find('img');
			vars.index = 0;

	
			var first_img = createImage(album[vars.index]);

			$overlay.css({'height':document.height > $(window).height()? document.height : $(window).height() })
                                .fadeIn("fast");

			//add initial img after overlay fadesIn
		       	$(first_img).load(function() {
		
				computeDimensions(this);
				
					$gallery.css({"height": this.height +"px","width": this.width+"px","padding": settings.vPadding +"px "+settings.hPadding+"px"})
					.append(this);

					$caption.css({"width":this.width - settings.captionPadding*2+"px","padding":settings.captionPadding}).text( $(this).attr("alt"));
		
					var voffset = $(window).scrollTop() + ($(window).height() - ( settings.vPadding*2+$gallery.height()))/2;
				
					$gallery.css({"top":voffset+"px"});
					$gallery.delay(50).fadeIn("fast");
				
					$(this).off('load');
			});
	
	
			$right.click( function() {
				var next_img = createImage(getNextImage(vars,album));

				animateGallery(next_img);
			});
			
			
			
			
			$left.click(function() {
			
				var prev_img = createImage(getPrevImage(vars,album));

				animateGallery(prev_img);

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
				

			$gallery.fadeOut(function() {
				$(this).find('img').remove();
				$overlay.fadeOut();	
			});
			
			$(this).off('click');
		 
		 	});
		 
		 
		 /* @private */
		 
		 function createImage(new_image) {
			var img = new Image();
			img.src = new_image.src;
			img.alt = new_image.alt;
			
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
			} else {
				vars.index = album.length-1;
			}
			return album[vars.index];
			
		 }
		 
		 function computeDimensions(img) {
			var gallery_height = $(window).height() - settings.vMargin*2,
			gallery_width = $(window).width() - settings.hMargin*2;

			if (gallery_width < 0  || gallery_height <  0) {
				gallery_height = 0;
			} 
			
			
			if(gallery_height < img.height) {
			
				img.width =  gallery_height * (img.width/img.height);
				
				img.height = gallery_height;
				
			}
		}
		
	
		
		function animateGallery(img) {
				
				var gallery_img = $gallery.find('img');
				
				$caption.fadeOut();
				
				gallery_img.fadeOut()

				$(img).load(function() {
				
					computeDimensions(img);
					
					voffset = $(window).scrollTop() + ($(window).height() - ( settings.vPadding*2+img.height))/2;
						
					
						$gallery.delay(100).animate({"height":img.height+"px","width":img.width+"px","top":voffset+"px"},function(){
						
							$caption.css({"width":img.width - settings.captionPadding*2+"px","padding":settings.captionPadding})
							        .text(img.alt)
							        .delay(200).fadeIn();
							
							gallery_img.attr({'src':img.src,'width': img.width,'height': img.height})
								   .delay(200).fadeIn();
						
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
            fthr.data('fthrslider', fthrslider) ;
		
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
