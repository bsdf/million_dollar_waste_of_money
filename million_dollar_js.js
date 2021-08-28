var million_dollar_FAKEMODE = false;
var million_dollar_timer;
var million_dollar_counter = 0;

var million_dollar_object = (function() {
    var million_dollar_value = 1000000;

    var million_dollar_header;
    var million_dollar_canvas;
    var million_dollar_context;

    var million_dollar_init =
        function(million_dollar_event) {
            million_dollar_canvas = document.getElementById("million_dollar_canvas");
            million_dollar_context = million_dollar_canvas.getContext("2d");
            million_dollar_context.fillStyle = "rgb(255,0,0)";

            million_dollar_header = document.getElementById("million_dollar_header");

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

            if (million_dollar_FAKEMODE) {
                million_dollar_counter = 0;
                million_dollar_timer = window.setInterval(million_dollar_fake, 100);
            } else {
                for (var million_dollar_i=0; million_dollar_i < million_dollar_pixels.length; million_dollar_i++) {
                    (function() {
                        var million_dollar_pixel = million_dollar_pixels[million_dollar_i];
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
                                    million_dollar_value -= million_dollar_width*million_dollar_height;
                                    million_dollar_context.fillRect(million_dollar_x, million_dollar_y, million_dollar_width, million_dollar_height);
                                }
                            };
                        };

                        million_dollar_xhr.open("GET", million_dollar_url, true);
                        million_dollar_xhr.send();
                    })();
                }
            }
        };

    Number.prototype.formatMoney = function(c, d, t){
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    var million_dollar_update_value = 
        function() {
            million_dollar_header.innerHTML = 'The $' + million_dollar_value.formatMoney(0, '.', ',') + " Homepage";
        };

    var million_dollar_fake =
        function() {
            if (million_dollar_counter++ > 200) {
                window.clearInterval(million_dollar_timer);
            } else {
                var million_dollar_pixels = million_dollar_image_map.pixels;
                var million_dollar_rnd = Math.floor(Math.random()*million_dollar_pixels.length);
                var million_dollar_pixel = million_dollar_pixels[million_dollar_rnd];
                var million_dollar_rect = million_dollar_pixel[0].split(',');
                var million_dollar_x = million_dollar_rect[0];
                var million_dollar_y = million_dollar_rect[1];
                var million_dollar_width = million_dollar_rect[2]-million_dollar_rect[0];
                var million_dollar_height = million_dollar_rect[3]-million_dollar_rect[1];
                var million_dollar_url = million_dollar_pixel[1];

                million_dollar_value -= million_dollar_width*million_dollar_height;
                million_dollar_context.fillRect(million_dollar_x, million_dollar_y, million_dollar_width, million_dollar_height);

                million_dollar_update_value();
            }
        };

    window.onload = million_dollar_init;

    return {};
})();
