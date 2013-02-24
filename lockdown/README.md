## Lockdown

[Lockdown](http://draeton.github.com/lockdown/) obfuscates code snippets by writing them to the canvas.
The current version is `0.0.38`. Documentation is available
[here](http://draeton.github.com/lockdown/lockdown/docs/lockdown.html).

## Implementation

Place jQuery, the Lockdown script and the Lockdown stylesheet on the page:

    <link rel="stylesheet" href="css/lockdown-0.0.38-min.css">
    <script src="js/jquery-1.7.1.min.js"></script>
    <script src="js/modernizr-2.0.6.min.js"></script>
    <script src="js/lockdown-0.0.38-min.js"></script>

Once that's in place, you may replace code blocks using the `Lockdown.lock` method:

    Modernizr.load([
        "js/lockdown-0.0.38-min.js",
        {
            test: Modernizr.canvas,
            nope: "js/flashcanvas/flashcanvas.js",
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

## Dependencies

jQuery 1.7+, Modernizr; *Flashcanvas for older browser support*

## License

(The MIT License)

Copyright (c) 2013, <[Matthew Cobbs](mailto:draeton@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.