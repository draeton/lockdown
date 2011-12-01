---
layout: default
title: Lockdown - hide your code!
---

<link rel="stylesheet" href="http://draeton.github.com/lockdown/lockdown/build/css/lockdown-@VERSION@-min.css">

<section id="main" role="main">

[Lockdown](http://draeton.github.com/lockdown/) obfuscates code snippets 
by writing them to the canvas. This demo is compatible with IE7+, Firefox, Chrome,
and Safari.

The use case for the particular project is a testing environment where the
proctor wants to prevent test-takers from easily copying code and determining the 
answer using the console or a CLI.

Code blocks can either have random lines inserted, which are then removed using
a regular expression before rendering to canvas, or they may be base-64 encoded,
or both.

<a href="http://www.w3.org/html/logo/"><img src="http://www.w3.org/html/logo/badge/html5-badge-h-css3-graphics.png" height="50" alt="HTML5 Powered with CSS3 / Styling, and Graphics" title="HTML5 Powered with CSS3 / Styling, and Graphics"></a>

<!-- code examples -->
<h3>Sample 1</h3>
<pre class="code">
function bar (baz) {
-- do not copy --
    return function () {
        alert("Do not copy " + baz + "!");
    };
-- do not copy --
}
-- do not copy --
</pre>

<h3>Sample 2</h3>
<pre class="code base64">
function%20foo%20()%20%7B%0A%20%20alert('Hello%20world!')%0A%7D
</pre>

<h3>Sample 3</h3>
<pre class="code base64">
var%20t%20%3D%20%24(%22%3Ctextarea%3E%22).prependTo(%22body%22)%3B%0Avar%20b%20%3D%20%24(%22%3Cbutton%3Eclick%20to%20encode%3C%2Fbutton%3E%22).click(function%20()%20%7B%0A%20%20var%20val%20%3D%20t.val()%3B%0A%20%20if%20(val)%20%7B%0A%20%20%20%20t.val(encodeURIComponent(val))%3B%0A%20%20%7D%0A%7D).insertBefore(t)%3B%0A%24(%22%3Cbr%3E%22).insertBefore(t)%3B
</pre>
<!-- end code examples -->
    

## Implementation

Place jQuery, the Lockdown script and the Lockdown stylesheet on the page:

{% highlight html %}
<link rel="stylesheet" href="css/lockdown-@VERSION@-min.css">

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
<script src="js/lockdown-@VERSION@-min.js"></script>
{% endhighlight %}

Once that's in place, you may replace code blocks using the `Lockdown.lock` method:

{% highlight js %}
$(document).ready(function () {

    var options = {
        width: 572,
        filterexp: new RegExp("-- do not copy --")
    };
    Lockdown.configure( options );
    Lockdown.lock( $("pre.code") );

});
{% endhighlight %}

Documentation is available [here.](http://draeton.github.com/lockdown/lockdown/docs/lockdown.html)
    

## Dependencies

[jQuery 1.7+](http://jquery.com/), *[Flashcanvas](http://flashcanvas.net/) for older browser support*


## Contributors

Matthew Cobbs (matthew.cobbs@gmail.com)


## License

[MIT](https://raw.github.com/draeton/lockdown/master/LICENSE)


## Download

The latest release, **@VERSION@, is [available here](http://draeton.github.com/lockdown/lockdown/dist/lockdown-@VERSION@.zip).**

You can download this project in either [zip](https://github.com/draeton/lockdown/zipball/master) 
or [tar](https://github.com/draeton/lockdown/tarball/master) formats.

You can also clone the project with [Git](http://git-scm.com) by running:

    $ git clone git://github.com/draeton/lockdown

</section>

<script src="http://draeton.github.com/lockdown/lockdown/build/js/lockdown-@VERSION@-min.js"></script>
<script>
$(document).ready(function () {

    var options = {
        width: 572,
        filterexp: new RegExp("-- do not copy --")
    };
    Lockdown.configure( options );
    Lockdown.lock( $("pre.code") );

});
</script>