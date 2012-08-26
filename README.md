fthrSlider
==========

######*lightweight jQuery image gallery designed in CSS3.*

runs on jQuery 1.7+ , use of .off

Only image asset is the loader gif.

CSS3 properties:
+ box-shadow
+ border-radius
+ rgba

If image is too large, image is resized to fit browser window.

Gallery is vertically aligned relative to the window.

Plugin takes in arbitrary selector for a list of images.

Sample Usage:
<pre><code> $(document).ready(function() {
    $(this).fthrSlider('.gallery-list');
  });
</code></pre>