/*!
 * Lockdown.js
 * Obfuscates code snippets by writing them to the canvas
 * http://draeton.github.com/lockdown
 *
 * Copyright 2011, Matthew Cobbs
 * Licensed under the MIT license.
 */
/*global jQuery, FlashCanvas*/
(function (window, $) {

     "use strict";

    var document = window.document;

    // configuration variables
    var defaults = {
        // font size and positioning
        fontsize   : 12,
        lineheight : 24,
        font       : "12px Courier",
        baseline   : "top",
        yoffset    : (24 - 12) / 2 - 2,

        // font colors
        linecolor  : "blue",
        codecolor  : "black",
        rowcolor   : "LightCyan",

        // text start position
        top        : 10,
        left       : 15,
        indent     : 8,

        // canvas width
        width      : 600,

        // lines to remove from code before drawing
        check      : null
    };

    // constructor
    function Lockdown (options) {
        this.configure(options);
        return this;
    }

    // prototype
    Lockdown.prototype = {
        // update the settings object, perhaps when styling
        // a new section of code blocks
        configure: function (options) {
            this.settings = $.extend({}, defaults, options);
        },
        
        // loop through each element to replace the code
        // blocks with canvas elements
        lock: function ($elements) {
            var self = this;
            
            if ($elements) {
                // return the new canvas elements back to the array
                $elements = $elements.map(function (i, element) {
                    return self._replaceCodeBlock(element, element.innerText, element.className);
                });
            }
            
            return $elements;
        },

        // decode the base64 encoded code
        // get the code text as an array of lines
        // filter out the garbage lines
        _getCode: function (innerText, className) {
            var s = this.settings;

            // check for base64 to determine decoding is needed
            if (/base64/.test(className)) {
                innerText = decodeURIComponent(innerText);
            }

            // remove whitespace and split on new lines
            var code = $.trim(innerText).split("\n");
            
            // if there is a check regexp, filter lines
            if (s.check) {
                code = $.grep(code, function (line, i) {
                    return !s.check.test(line);
                });
            }
            
            // return the array of code lines
            return code;
        },

        // create the canvas element with height for the # of lines
        // FlashCanvas for IE support
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

        // write a piece of text to the canvas
        _writeText: function (context, text, x, y, color, align) {
            var s = this.settings;

            context.font         = s.font;
            context.textAlign    = align || "left";
            context.textBaseline = s.baseline;
            context.fillStyle    = color;
            context.fillText(text, x, y);
        },

        _writeTextRight: function (context, text, x, y, color) {
            this._writeText(context, text, x, y, color, "right");
        },

        // write the line number
        // write the code
        _writeLine: function (context, i, line) {
            var s = this.settings;
            var linex = s.left + s.indent - defaults.indent;
            var liney = i * s.lineheight + s.top + s.yoffset;
            var codex = s.left + s.indent;
            var codey = i * s.lineheight + s.top + s.yoffset;

            if (i % 2) {
                // draw an alternating background
                context.fillStyle   = s.rowcolor;
                context.fillRect(0, i * s.lineheight + s.top, s.width, s.lineheight);
            }

            this._writeTextRight(context, i + 1, linex, liney, s.linecolor);
            this._writeText(context, line, codex, codey, s.codecolor);
        },

        // parse the code from the pre element
        // place and get the canvas
        // get the drawing context
        _replaceCodeBlock: function (element, innerText, className) {
            var self = this;
            var s = this.settings;

            // get the code from the text
            var code = this._getCode(innerText, className);

            // determine the indent of the line numbers
            s.indent = defaults.indent * (code.length + "").length;

            // create a canvas
            var canvas = this._getCanvas(code);
            var $canvas = $(canvas);

            // replace the element
            $(element).replaceWith(canvas);

            // get the drawing context and starting drawing lines
            var context = canvas.getContext("2d");
            $.each(code, function (i, line) {
                self._writeLine(context, i, line);
            });
            
            // return the canvas
            $canvas.data("code", code.join("\n")).addClass("lockdown");
            return $canvas;
        }
    };

    // global reference
    window.Lockdown = new Lockdown();

})(window, jQuery);