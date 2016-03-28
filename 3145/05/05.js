// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function(){

    $('div.chapter a[href*="wikipedia"]').attr(
        {rel:'external',
        title:function(index,oldValue){
            return 'Learn more about '+$(this).text()+' at Wikipedia.';
        },
            id:function(index,oldValue){
                return 'wikilink-'+index;
            }
    }
    );
    $('<a href="#top">back to top</a>').insertAfter('div.chapter p');
    $('<a id="top"></a>').prependTo('body');
    /*$('span.footnote').insertBefore('#footer').wrapAll('<ol id="notes"></ol>').wrap('<li></li>');*/
    var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
    $('span.footnote').each(function(index){
        $(this).before([
            '<a href="#footernote-',
            index+1,
            '" id="context-',
            index+1,
            '" class="context">',
            '<sup>',
            index+1,
            '</sup></a>'
        ].join(''))
            .appendTo($notes)
            .append(
                [
                    '&nbsp;(<a href="#ontext-',
                    index+1,
                    '">context</a>)'
                ].join('')
            )
            .wrap('<li id="footnote-'+(index+1)+'"></li>');

    });
    $('span.pull-quote').each(function(index){
        var $parentParagraph = $(this).parent('p');
        $parentParagraph.css('position','relative');
        var $clonedCopy = $(this).clone();
        $clonedCopy.addClass('pulled')
            .find('span.drop')
            .html('&hellip;')
            .end()
            .text($clonedCopy.text())
            .prependTo($parentParagraph);
        
    });
});