(function (window, $, Lockdown) {

    $(document).ready(function () {
        
        Lockdown.configure( {filterexp: new RegExp("-- do not copy --")} );
        Lockdown.lock( $("pre.code") );
        
    });

})(window, jQuery, Lockdown);
