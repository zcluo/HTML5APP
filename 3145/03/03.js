// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function(){
    $('#switcher').hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
    });

    var toggleSwitcher=function(event){
        if(!$(event.target).is('button')){
            $('#switcher button').toggleClass('hidden');
        }
    };

    $('#switcher').on('click',toggleSwitcher);
    $('#switcher').click();

    var setBodyClass=function(className){
        $('body').removeClass().addClass(className);
        $('#switcher button').removeClass('selected');
        $('#switcher-'+className).addClass('selected');
        $('#switcher').off('click',toggleSwitcher);
        if(className==='default'){
            $('#switcher').on('click',toggleSwitcher);
        }
    }



    $('#switcher-default').addClass('selected');
    var triggers={
        D:'default',
        N:'narrow',
        L:'large'

    };
    $('#switcher').click(function(event){
        if($(event.target).is('button')){
            var bodyClass=event.target.id.split('-')[1];
            setBodyClass(bodyClass);
        }
    });
    $(document).keyup(function(event){
        var key=String.fromCharCode(event.keyCode);
        if(event.keyCode == 39){
            var selectedButton = $('#switcher button.selected').get(0).id.split('-')[1];
            if(selectedButton === 'default')
              key='N';
            if(selectedButton === 'narrow')
              key='L';
            if(selectedButton === 'large')
              key='D';
        }
        if(key in triggers){

            setBodyClass(triggers[key]);
        }
    });

    $('h3.chapter-title').dblclick(function(event){
        $(event.target).parent().addClass('hidden');
        //$('h3.chapter-title').parent().addClass('hidden');
    });
});