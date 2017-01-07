(function ( $ ) {

    var obsConfig = { childList: true };

    $.fn.windowhighlight = function(action) {
        if (typeof action === 'undefined' || action === 'init'){
            $('body').prepend($(this).detach());
            $(this).show();
            var self = this;
            var startSelector = $(self).data('start');
            if(typeof startSelector === "undefined" || startSelector == null){
                var selectorStrategy = arguments[1];
                if (typeof selectorStrategy === 'function'){
                    startSelector = selectorStrategy.call();
                }
                else{
                    console.log('selectorStrategy argument is not valid. Must be a function that returns a selector');
                    return;
                }
            }
            var forcedHeight = $(self).data('windowheight');
            var rect = $(startSelector)[0].getBoundingClientRect();
            $(self).css("top",(rect.top-20)+"px");
            $(self).css("left",(rect.left-20)+"px");
            $(self).css("width",(rect.width+40)+"px");
            if(typeof forcedHeight !== "undefined" && forcedHeight != null){
                $(self).css("height",forcedHeight+"px");
            }
            else{
                $(self).css("height",(rect.height+40)+"px");
            }
            var observerDepth = 0;
            var myObserver = new MutationObserver(function(mutationRecords){
                if(observerDepth > 100){
                    myObserver.disconnect();
                    return;
                }
                console.log(mutationRecords);
                var rect = $(startSelector)[0].getBoundingClientRect();
                $(self).css("top",(rect.top-20)+"px");
                $(self).css("left",(rect.left-20)+"px");
                $(self).css("width",(rect.width+40)+"px");
                if(typeof forcedHeight !== "undefined" && forcedHeight != null){
                    $(self).css("height",forcedHeight+"px");
                }
                else{
                    $(self).css("height",(rect.height+40)+"px");
                }
                observerDepth++;
            });
            myObserver.observe($(startSelector)[0],obsConfig);
        }
        if(action === 'hide'){
            $(this).css("width",'');
            $(this).css("top",'');
            $(this).css("left",'');
            $(this).css("height",'');
        }
        return this;
    };

}( jQuery ));