// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$.fn.cycle.defaults.timeout = 10000;
$.fn.cycle.defaults.random = true;
$(document).ready(function(){

    $('#books').cycle({
        timeout:1000,
        speed:200,
        pause:true,
        before:function () {
            $('#slider').slider('value',$('#books li').index(this));
        }
    });

    var $books = $('#books');
    var $controls = $('<div id="books-controls"></div>');
    $controls.insertAfter($books);
    $('<button>Pause</button>').click(function(event){
        event.preventDefault();
        $books.cycle('pause');
        $.cookie('cyclePaused','y');
    }).button({icons:{primary:'ui-icon-pause'}}).appendTo($controls);
    $('<button>Resume</button>').click(function(event){
        event.preventDefault();
        // $books.cycle('resume');
        var $paused = $('ul:paused');
        if($paused.length){
            $paused.cycle('resume');
        }
        else{
            $(this).effect('shake',{distance:10});
        }
        $.cookie('cyclePaused',null);
    }).button({icons:{primary:'ui-icon-play'}}).appendTo($controls);
    $books.hover(function(){
        $books.find('.title').animate({
            backgroundColor:'#eee',
            color:'#000'
        },1000);
    },function(){
        $books.find('.title').animate({
            backgroundColor:'#000',
            color:'#fff'
        },1000);
    });
    $('h1').click(function (){

        $(this).toggleClass('highlighted','slow','easeInExpo');
    } );

    $books.find('.title').resizable({handlers:'s'});
    /*$('button').button();*/

    $('<div id="slider"></div>').slider({
        min: 0,
        max: $('#books li').length - 1,
        slide: function(event, ui) {
            $books.cycle(ui.value);
        }
    }).appendTo($controls);



});