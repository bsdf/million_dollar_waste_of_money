var million_dollar_object = (function() {
    var million_dollar_canvas;
    var million_dollar_context;

    var million_dollar_init =
        function(million_dollar_event) {
            million_dollar_canvas = document.getElementById("million_dollar_canvas");
            million_dollar_context = million_dollar_canvas.getContext("2d");
            million_dollar_context.fillStyle = "rgb(255,0,0)";

            var million_dollar_image_node = new Image();
            million_dollar_image_node.onload = function() {
                million_dollar_context.drawImage(million_dollar_image_node, 0, 0);
                million_dollar_rot();
            };
            million_dollar_image_node.src = "million_dollar_image.png";            
        };

    var million_dollar_rot =
        function() {
            var million_dollar_pixels = million_dollar_image_map.pixels;

            for (var i=0; i<pixels.length; i++) {
                (function() {
                    var million_dollar_pixel = million_dollar_pixels[i];
                    var million_dollar_rect = million_dollar_pixel[0].split(',');
                    var million_dollar_x = million_dollar_rect[0];
                    var million_dollar_y = million_dollar_rect[1];
                    var million_dollar_width = million_dollar_rect[2]-million_dollar_rect[0];
                    var million_dollar_height = million_dollar_rect[3]-million_dollar_rect[1];
                    var million_dollar_url = million_dollar_pixel[1];

                    var million_dollar_xhr = new XMLHttpRequest();
                    million_dollar_xhr.onreadystatechange = function(million_dollar_event) {
                        var million_dollar_this = this;
                        if (million_dollar_this.readyState == 4) {
                            var million_dollar_stat = million_dollar_this.status;
                            if (million_dollar_stat == 0 || million_dollar_stat > 400) {
                                million_dollar_context.fillRect(million_dollar_x, million_dollar_y, million_dollar_width, million_dollar_height);
                            }
                        };
                    };

                    million_dollar_xhr.open("GET", million_dollar_url, true);
                    million_dollar_xhr.send();
                })();
            }
        };

    window.onload = million_dollar_init;

    return {};
})();