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
    var c = {
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
        check      : new RegExp("^--remove this line--")
    };

    // constructor
    function Lockdown (options) {
        this.configure(options);
        return this;
    }

    // prototype
    Lockdown.prototype = {
        // drawing context
        context: null,
        
        // update the settings object, perhaps when styling
        // a new section of code blocks
        "configure": function (options) {
            this.settings = $.extend({}, c, options);
        },
        
        // loop through each element to replace the code
        // blocks with canvas elements
        "lock": function ($elements) {
            var self = this;
            
            if ($elements) {
                $elements.each(function () {
                    self.replaceCodeBlock(this, this.innerText, this.className);
                });
            }
        },

        // decode the base64 encoded code
        // get the code text as an array of lines
        // filter out the garbage lines
        "getCode": function (innerText, className) {
            var s = this.settings;

            if (/base64/.test(className)) {
                innerText = decodeURIComponent(innerText);
            }

            var code = $.trim(innerText).split("\n");

            return $(code).filter(function (i, line) {
                return !s.check.test(line);
            });
        },

        // create the canvas element with height for the # of lines
        // FlashCanvas for IE support
        "getCanvas": function (code) {
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
        "writeText": function (text, x, y, color, align) {
            var s = this.settings;

            this.context.font         = s.font;
            this.context.textAlign    = align || "left";
            this.context.textBaseline = s.baseline;
            this.context.fillStyle    = color;
            this.context.fillText(text, x, y);
        },

        "writeTextRight": function (text, x, y, color) {
            this.writeText(text, x, y, color, "right");
        },

        // write the line number
        // write the code
        "writeLine": function (i, line) {
            var s = this.settings;
            var linex = s.left + s.indent - c.indent;
            var liney = i * s.lineheight + s.top + s.yoffset;
            var codex = s.left + s.indent;
            var codey = i * s.lineheight + s.top + s.yoffset;

            if (i % 2) {
                // draw an alternating background
                this.context.fillStyle   = s.rowcolor;
                this.context.fillRect(0, i * s.lineheight + s.top, s.width, s.lineheight);
            }

            this.writeTextRight(i + 1, linex, liney, s.linecolor);
            this.writeText(line, codex, codey, s.codecolor);
        },

        // parse the code from the pre element
        // place and get the canvas
        // get the drawing context
        "replaceCodeBlock": function (element, innerText, className) {
            var s = this.settings;

            // get the code from the text
            var code = this.getCode(innerText, className);

            // determine the indent of the line numbers
            s.indent = c.indent * (code.length + "").length;

            // create a canvas
            var canvas = this.getCanvas(code);

            // replace the element
            $(element).replaceWith(canvas);
            $(canvas).addClass("lockdown");

            // get the drawing context and starting drawing lines
            this.context = canvas.getContext("2d");
            $(code).each($.proxy(this.writeLine, this));
        }
    };

    // global reference
    window.Lockdown = new Lockdown;

})(window, jQuery);