(function (window, undefined) {

    "use strict";


    module("main", {
        teardown: window.moduleTeardown
    });


    test("Dependencies", 1, function () {
        ok(jQuery, "jQuery exists.");
        ok(Modernizr, "Modernizr exists.");
        ok(Lockdown, "Lockdown exists.");
    });


}(window));