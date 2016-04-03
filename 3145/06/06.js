// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function(){
    $('body').on('click', 'h3.term', function() {
        $(this).siblings('.definition').slideToggle();
    });
    $('#letter-a a').click(function(event){
        event.preventDefault();
        $('#dictionary').load('a.html');
        $('body').on('click', 'h3.term', function() {
            $(this).siblings('.definition').slideToggle();
        });
        var $ret = $.getJSON('b.json',null,function (data) {
            /*console.log(JSON.stringify(data));*/
            var html='';
            $.each(data,function(entryIndex,entry){
                html += '<div class="entry">';
                html += '<h3 class="term">'+entry.term+'</h3>';
                html += '<div class="part">'+entry.part+'</div>';
                html += '<div class="definition">';
                html += entry.definition;
                if(entry.quote){
                    html += '<div class="quote">';
                    $.each(entry.quote,function(lineIndex,line){
                        html += '<div class="quote-line">'+line+'</div>';

                    });
                    if(entry.author){
                        html += '<div class="quote-author">'+entry.author+'</div>';

                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
            });
            $('#dictionary').html(html);
        });


       /* alert(JSON.stringify($ret));*/
    });

    $('#letter-c a').click(function(event){

        event.preventDefault();
        $.getScript('c.js');
    });

    $('#letter-d a').click(function(event) {
        event.preventDefault();
        $.get('d.xml', function(data) {
            $('#dictionary').empty();
            $(data).find('entry').each(function() {
                var $entry = $(this);
                var html = '<div class="entry">';
                html += '<h3 class="term">' + $entry.attr('term');
                html += '</h3>';
                html += '<div class="part">' + $entry.attr('part');
                html += '</div>';
                html += '<div class="definition">';
                html += $entry.find('definition').text();
                var $quote = $entry.find('quote');
                if ($quote.length) {
                    html += '<div class="quote">';
                    $quote.find('line').each(function() {
                        html += '<div class="quote-line">';
                        html += $(this).text() + '</div>';
                    });
                    if ($quote.attr('author')) {
                        html += '<div class="quote-author">';
                        html += $quote.attr('author') + '</div>';
                    }
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
                $('#dictionary').append($(html));
            });
        });
    });

    $('#letter-e a').click(function(event){
        event.preventDefault();
        var requestData={'term':$(this).text()};
        $.get('e.php',requestData,function(data){

            $('#dictionary').html(data);
        });

    });
    $('#letter-f form').submit(function(event){

        event.preventDefault();
        $.get('f.php',{'term':$('input[name="term"]').val()},function(data){
            $('#dictionary').html(data);
        });
    });




    var url = 'https://api.github.com/users/jquery/repos';
    $('#letter-g a').click(function(event) {
        event.preventDefault();
        $.getJSON(url + '?callback=?', function(data) {
            var html = '';
            $.each(data.data, function(entryIndex, entry) {
                html += '<div class="entry">';

                html += '<label>Full Name: ' + '<div>' + entry.full_name + '</div>' + '</label>';
                html += '<label>Url: ' + '<div>' + entry.html_url + '</div>' + '</label>';
                html += '</div>'


            });
            $('#dictionary').html(html);
        });
    });
    var url1 = 'http://localhost:8080/ajaxserverjsonp/user/showName';
    $.ajax(url1,{
        dataType:'jsonp',
        data:{"id":1},
        jsonpCallback: 'JsonpCallback',
        contentType: 'application/jsonp;charset=UTF-8',
        success:function (data) {
            console.log(JSON.stringify(data));

        }
    })
});