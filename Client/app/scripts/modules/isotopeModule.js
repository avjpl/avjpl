$( function() {
    var container = document.querySelector('#container');
    var filters = document.querySelector('#filters');

    console.log(filters);

    // init
    var iso = new Isotope( container, {
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });

    // Quick and simple cross-browser event handler - to compensate for IE's attachEvent handler
    function addEvent(obj, evt, fn, capture) {
        if ( window.attachEvent ) {
            obj.attachEvent("on" + evt, fn);
        } else {
            if ( !capture ) capture = false; // capture
            obj.addEventListener(evt, fn, capture)
        }
    }

    // Check to see if the node that was clicked is an anchor tag. If so, proceed per usual.
    addEvent(filters, "click", function(e) {
        // Firefox and IE access the target element different. e.target, and event.srcElement, respectively.
        var target = e ? e.target : window.event.srcElement;
        var filt = target.getAttribute('data-filter');

        if ( target.nodeName.toLowerCase() === 'button' ) {
            iso.arrange({
                filter: (function(f) {
                    return f;
                })(filt)
            });

            return false;
        }
    });
});
