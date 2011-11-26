---
layout: default
title: Lockdown - Obfuscates code snippets by writing them to the canvas
---

<link rel="stylesheet" href="css/lockdown-0.0.1-min.css">

<section id="main" role="main">

[Lockdown](http://github.matthewcobbs.com/lockdown/) obfuscates code snippets 
by writing them to the canvas. This demo is compatible with IE7+, Firefox, Chrome,
and Safari.

<a href="http://www.w3.org/html/logo/"><img src="http://www.w3.org/html/logo/badge/html5-badge-h-css3-graphics.png" height="50" alt="HTML5 Powered with CSS3 / Styling, and Graphics" title="HTML5 Powered with CSS3 / Styling, and Graphics"></a>

<!-- code examples -->
    <h2>Code 1</h2>
    <pre class="code base64">
function%20foo%20()%20%7B%0A%20%20alert('Hello%20world!')%0A%7D
    </pre>

    <h2>Code 2</h2>
    <pre class="code base64">
var%20t%20%3D%20%24(%22%3Ctextarea%3E%22).prependTo(%22body%22)%3B%0Avar%20b%20%3D%20%24(%22%3Cbutton%3Eclick%20to%20encode%3C%2Fbutton%3E%22).click(function%20()%20%7B%0A%20%20var%20val%20%3D%20t.val()%3B%0A%20%20if%20(val)%20%7B%0A%20%20%20%20t.val(encodeURIComponent(val))%3B%0A%20%20%7D%0A%7D).insertBefore(t)%3B%0A%24(%22%3Cbr%3E%22).insertBefore(t)%3B
    </pre>
<!-- end code examples -->
    
## Implementation

Place jQuery, the Lockdown script and the Lockdown stylesheet on the page:

{% highlight html %}
<link rel="stylesheet" href="css/lockdown-0.0.1-min.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
<script src="js/lockdown-0.0.1-min.js"></script>
{% endhighlight %}

Once that's in place, you may replace code blocks using the `Lockdown.lock` method:

{% highlight js %}
jQuery(document).ready(function ($) {

    Lockdown.configure( {} );
    Lockdown.lock( $("pre.code") );

});
{% endhighlight %}
    
## Dependencies

[jQuery 1.7+](http://jquery.com/), *[Flashcanvas](http://flashcanvas.net/) for older browser support*

## Contributors

Matthew Cobbs (matthew.cobbs@gmail.com)

## License

[MIT](https://raw.github.com/draeton/stitches/master/LICENSE)

## Download

**The latest release, 0.0.1, is [available here](dist/lockdown-0.0.1.zip).**

You can download this project in either [zip](https://github.com/draeton/lockdown/zipball/master) 
or [tar](https://github.com/draeton/lockdown/tarball/master) formats.

You can also clone the project with [Git](http://git-scm.com) by running:

    $ git clone git://github.com/draeton/lockdown

</section>

<script src="js/lockdown-0.0.1-min.js"></script>
<script>
jQuery(document).ready(function ($) {

    Lockdown.configure( {} );
    Lockdown.lock( $("pre.code") );

});
</script>