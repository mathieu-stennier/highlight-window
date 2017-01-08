;(function ( $, window, document, undefined ) {

    var htmlHighlight = '<div id="highlight-window"><div class="highlight-window-content"></div></div>';

    function isNotNullOrUndefined(elem){return (typeof elem !== 'undefined' && elem != null);}
    function isNullOrUndefined(elem){return (typeof elem === 'undefined' || elem == null);}

    /* Plugin name and defaults */
    var pluginName = 'highlightWindow',
        defaults = {
            style:{
                borderColor:'#038BCF',
                highlightColor: 'rgba(255,255,255,.7)',
                paddingHighlight: 20,
                minHeight: 100,
                minWidth: 100
            },
            disallowClickOn:'none'
        };

    function HighlightWindow(options){
        this.settings = $.extend( {}, defaults, options );
        this.highlightDOMElem = null;
        this.init();
    }

    $.extend( HighlightWindow.prototype, {
        init: function() {
            $('body').prepend(htmlHighlight);
            this.highlightDOMElem = $('#highlight-window')[0];
            return this;
        },
        moveTo: function(elementSelector) {
            if(isNotNullOrUndefined(elementSelector)){
                var highligh = $(this.highlightDOMElem);
                highligh.show();
                var paddingHighlight = this.settings.style.paddingHighlight;
                var minWidth = this.settings.style.minWidth;
                var minHeight = this.settings.style.minHeight;
                if($(elementSelector).length !== 1){
                    console.log('Element selector is not pointing to only 1 element but :'+$(elementSelector).length);
                    return;
                }
                var elemToHighlight = $(elementSelector)[0];

                var rect = elemToHighlight.getBoundingClientRect();
                highligh.css("top",(rect.top-paddingHighlight)+"px");
                highligh.css("left",(rect.left-paddingHighlight)+"px");

                if(rect.width < minWidth){
                    highligh.css("width",minWidth+"px");
                }
                else{
                    highligh.css("width",(rect.width+(paddingHighlight*2)+"px"));
                }

                if(rect.height < minHeight){
                    highligh.css("height",minHeight+"px");
                }
                else{
                    highligh.css("height",(rect.height+(paddingHighlight*2)+"px"));
                }
            }
        },
        hide : function(){
            var highlight = $(this.highlightDOMElem);
            highlight.css("width",'');
            highlight.css("top",'');
            highlight.css("left",'');
            highlight.css("height",'');
        }
    } );

    $.extend({
        highlightWindow: function (action) {
            if(isNullOrUndefined(action) || action === 'init'){
                if (!$.data(document.body, "plugin_" + pluginName ) ) {
                    var newWindowHighlight = new HighlightWindow(arguments[1]);
                    $.data( document.body, "plugin_" + pluginName, newWindowHighlight);
                    return newWindowHighlight;
                }
            }
            else if(action === 'moveTo'){
                var windowHighlight = $.data(document.body, "plugin_" + pluginName);
                windowHighlight.moveTo(arguments[1]);
                return windowHighlight;
            }
            else if(action === 'hide'){
                var windowHighlight = $.data(document.body, "plugin_" + pluginName);
                windowHighlight.hide();
                return windowHighlight;
            }
        }
    });
}( jQuery, window, document));