/**
 * Created by luozc-kf1b on 2016/4/28.
 */
$(document).ready(function () {
    var url1 = 'http://localhost:8080/ajaxserverjsonp/user/re';
    $.ajax(url1,{
        dataType:'jsonp',
        data:{"id":1},
        //jsonpCallback: 'JsonpCallback',
        contentType: 'application/jsonp;charset=UTF-8',
        success:function (data) {
            //console.log(JSON.parse(data));
            //var ret = JSON.parse(data);
            console.log(data["127"].name);

        }
    });
});
