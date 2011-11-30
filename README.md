## Lockdown

[Lockdown](http://draeton.github.com/lockdown/) obfuscates code snippets by writing them to the canvas.
The current version is `0.0.12`. Documentation is available
[here](http://draeton.github.com/lockdown/docs/lockdown.html).

## Implementation

Place jQuery, the Lockdown script and the Lockdown stylesheet on the page:

    <link rel="stylesheet" href="css/lockdown-0.0.12-min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
    <script src="js/lockdown-0.0.12-min.js"></script>

Once that's in place, you may replace code blocks using the `Lockdown.lock` method:

    jQuery(document).ready(function ($) {

        Lockdown.configure( {filterexp: new RegExp("-- do not copy --")} );
        Lockdown.lock( $("pre.code") );

    });

## Dependencies

jQuery 1.7+, *Flashcanvas for older browser support*

## To-do

* scrolling for long text
* syntax highlighting?
* add options to documentation
* write unit tests

## License

(The MIT License)

Copyright (c) 2011, <[Matthew Cobbs](mailto:draeton@gmail.com)>

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