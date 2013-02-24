// ## Lockdown
//
// Obfuscates code snippets by writing them to the canvas
// [http://draeton.github.com/lockdown](http://draeton.github.com/lockdown)
//
// Copyright 2013, Matthew Cobbs
// Licensed under the MIT license.
//
/*global jQuery, FlashCanvas*/
(function (window, $) {

    "use strict";

    var document = window.document;

    // **Some configuration defaults**
    var defaults = {
        /* font size and positioning */
        fontsize   : 12,
        lineheight : 24,
        font       : "12px Courier",
        baseline   : "top",
        yoffset    : (24 - 12) / 2 - 2,

        /* font colors */
        linecolor  : "blue",
        codecolor  : "black",
        rowcolor   : "LightCyan",

        /* text start position */
        top        : 10,
        left       : 15,
        indent     : 8,

        /* canvas width */
        width      : 600,

        /* lines to remove from code before drawing */
        filterexp  : null
    };

    // ## Lockdown constructor
    //
    // Returns a Lockdown singleton
    //
    //     @param {Object} options Optional configuration hash
    function Lockdown (options) {
        var lockdown = window.Lockdown || this;
        lockdown.init(options);
        return lockdown;
    }

    // ## Lockdown prototype
    Lockdown.prototype = {
        // ### init
        //
        // Update the settings object, perhaps when styling
        // a new section of code blocks
        init: function (options) {
            this.settings = $.extend({}, defaults, options);
        },

        // ### lock
        //
        // Loop through each element to replace the code
        // blocks with canvas elements
        //
        //     @param {jQuery} $elements Set of nodes to lock down
        //     @return {jQuery} The locked down canvas nodes
        lock: function ($elements) {
            var self = this;

            if ($elements) {
                $elements = $elements.map(function (i, element) {
                    return self._replaceCodeBlock(element);
                });
            }

            return $elements;
        },

        // ### *_getCode*
        //
        // Decode the base64 encoded code,
        // get the code text as an array of lines,
        // filter out the garbage lines
        //
        //     @param {String} innerText The innerText of a DOM node
        //     @param {String} className The className of a DOM node
        //     @return {Array} An array of lines of code
        _getCode: function (innerText, className) {
            var s = this.settings;

            /* check for base64 to determine decoding is needed */
            if (/base64/.test(className)) {
                innerText = decodeURIComponent(innerText);
            }

            /* remove whitespace and split on new lines */
            var code = $.trim(innerText).split("\n");

            /* if there is a filterexp regexp, filter lines */
            if (s.filterexp) {
                code = $.grep(code, function (line, i) {
                    return !s.filterexp.test(line);
                });
            }

            /* return the array of code lines */
            return code;
        },

        // ### *_getCanvas*
        //
        // Create the canvas element with height for the # of lines;
        // FlashCanvas for IE support
        //
        //     @param {Array} code An array of lines of code
        //     @return {HTMLCanvasElement}
        _getCanvas: function (code) {
            var s = this.settings;

            var canvas = document.createElement("canvas");
            canvas.width = s.width;
            canvas.height = code.length * s.lineheight + s.top * 2;
            canvas.style.width = canvas.width + "px";
            canvas.style.height = canvas.height + "px";

            if (typeof FlashCanvas !== "undefined") {
                FlashCanvas.initElement(canvas);
            }

            return canvas;
        },

        // ### *_writeText*
        //
        // Write a piece of text to the canvas
        //
        //     @param {CanvasRenderingContext2D} context
        //     @param {String} text Text to write to context
        //     @param {Number} x X-position
        //     @param {Number} y Y-position
        //     @param {String} color Font color
        //     @param {String} align Text alignment
        _writeText: function (context, text, x, y, color, align) {
            var s = this.settings;

            context.font         = s.font;
            context.textAlign    = align || "left";
            context.textBaseline = s.baseline;
            context.fillStyle    = color;
            context.fillText(text, x, y);
        },

        // ### *_writeTextRight*
        //
        // Curry `_writeText` to align text to the right
        _writeTextRight: function (context, text, x, y, color) {
            this._writeText(context, text, x, y, color, "right");
        },

        // ### *_writeLine*
        //
        // Write the line number;
        // write the code
        //
        //     @param {CanvasRenderingContext2D} context
        //     @param {Number} i Line number
        //     @param {String} line Line text
        _writeLine: function (context, i, line) {
            var s = this.settings;
            var linex = s.left + s.indent - defaults.indent;
            var liney = i * s.lineheight + s.top + s.yoffset;
            var codex = s.left + s.indent;
            var codey = i * s.lineheight + s.top + s.yoffset;

            /* draw an alternating background */
            if (i % 2) {
                context.fillStyle   = s.rowcolor;
                context.fillRect(0, i * s.lineheight + s.top, s.width, s.lineheight);
            }

            this._writeTextRight(context, i + 1, linex, liney, s.linecolor);
            this._writeText(context, line, codex, codey, s.codecolor);
        },

        // ### *_replaceCodeBlock*
        //
        // Parse the code from the pre element;
        // place and get the canvas;
        // get the drawing context
        //
        //     @param {HTMLElement} element
        //     @return {jQuery} Wrapped canvas node
        _replaceCodeBlock: function (element) {
            var self = this;
            var s = this.settings;

            /* Get the code array from the text */
            var code = this._getCode($(element).text(), element.className);

            /* determine the indent of the line numbers */
            s.indent = defaults.indent * (code.length + "").length;

            /* create a canvas */
            var canvas = this._getCanvas(code);
            var $canvas = $(canvas);

            /* replace the element */
            $(element).replaceWith(canvas);

            /* get the drawing context and starting drawing lines */
            var context = canvas.getContext("2d");
            $.each(code, function (i, line) {
                self._writeLine(context, i, line);
            });

            /* return the canvas with the code added to DOM data and a class of `lockdown` */
            $canvas.data("code", code.join("\n")).addClass("lockdown");
            return $canvas;
        }
    };

    // **Set the global reference**
    window.Lockdown = new Lockdown();

})(window, jQuery);