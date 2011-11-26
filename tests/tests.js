(function (window, $, Lockdown) {

    $(document).ready(function () {
        Lockdown.configure( {} );
        Lockdown.lock( $("pre.code") );
    });

})(window, jQuery, Lockdown);
