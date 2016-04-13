// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
(function($){
    $.sum=function(array){
        var total = 0;

        $.each(array,function(index,value){
            value = $.trim(value);
            value = parseFloat(value)||0;
            total += value;

        });

        return total;
    };

    $.average = function(array){
        if($.isArray(array)){
            return $.sum(array)/array.length;
        }
        return '';
    };
    $.fn.swapClass = function(class1,class2) {
        this.each(function () {
            var $element = $(this);
            if($element.hasClass(class1)){
                $element.removeClass(class1).addClass(class2);
            }
            else if($element.hasClass(class2)){
                $element.removeClass(class2).addClass(class1);
            }
        });
    };
    $.fn.shadow = function(opts){
        var defaults={
            copies:5,
            opacity:0.1
        };
        var options = $.extend(defaults,opts);
        return this.each(function(){
            var $originalElement = $(this);
            for(var i = 0; i < options.copies; i++){
                $originalElement.clone().css({
                    position:'absolute',
                    left:$originalElement.offset().left+i,
                    top:$originalElement.offset().top+i,
                    margin:0,
                    zIndex:-1,
                    opacity:options.opacity
                }).appendTo('body');
            }
        });
    };
    
    $.widget('ljq.tooltip',{
       
        _create:function(){
            this._tooltipDiv = $('<div></div>')
                .addClass('ljq-tooltip-text ' +
                'ui-widget ui-state-highlight ui-corner-all')
                .hide().appendTo('body');
            this.element.addClass('ljq-tooltip-trigger')
                .on('mouseenter.ljq-tooltip',$.proxy(this._open,this))
                .on('mouseleave.ljq-tooltip',$.proxy(this._close,this));
        },
        _open:function(){
            var elementOffset = this.element.offset();
            this._tooltipDiv.css({
                position:'absolute',
                left:elementOffset.left,
                top:elementOffset.top + this.element.height()
            }).text(this.element.data('tooltip-text'));
            this._tooltipDiv.show();
        },
        _close:function(){
            this._tooltipDiv.hide();
        }
    });
})(jQuery);
$(document).ready(function(){
    var $inventory = $('#inventory tbody');
    var quantities = $inventory.find('td:nth-child(2)')
        .map(function(index, qty) {
            return $(qty).text();
        }).get();
    var sum = $.sum(quantities);
    $('#sum').find('td:nth-child(2)').text(sum);
    var prices = $inventory.find('td:nth-child(3)').map(function(index,qty){
        return $(qty).text();
    }).get();
    var average = $.average(prices);
    $('#average').find('td:nth-child(3)').text(average.toFixed(2));

    $('table').click(function(){
        $('tr').swapClass('one','two');
    });
    $('h1').shadow();
    $('a').tooltip();
});