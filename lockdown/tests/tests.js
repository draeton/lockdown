(function (window, $, Lockdown) {
    
Modernizr.load([
    "../src/lockdown.js",
    {
        test: Modernizr.canvas,
        nope: "../src/lib/flashcanvas/flashcanvas.js",
        complete: function () {
            $(function () {
    
                var $elements = $("pre.code");
                var options = {
                    jsdir: "lockdown/build/js",
                    width: 580,
                    filterexp: new RegExp("-- do not copy --")
                };
                Lockdown.init( options );
                Lockdown.lock( $elements );
    
            });
        }
    }
]);

})(window, jQuery, Lockdown);
