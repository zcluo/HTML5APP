/**
 * Created by luozc-kf1b on 2016/2/3.
 */
function $$(id){
    return document.getElementById(id);
}
var strTip="";
var objWs=null;
var conUrl="ws://localhost:63342/Html5/10-2.html";
var SocketCreated=false;
var arrState=new Array("Connection Creating...","Create Sucess!",
                        "Connection Closing...","Connection closed!",
                         "Initialing...","Connection error!");
function pageload(){
    if(SocketCreated&&(objWs.readyState==0||objWs.readyState==1)){
        objWs.close();
    }
    else{
        Handle_List(arrState[4]);
        try{
            objWs=new WebSocket(conUrl);
            SocketCreated = true;
        }
        catch(ex)
        {
            Handle_List(ex);
            return;
        }
    }
    objWs.onopen = function(){
        Handle_List(arrState[objWs.readyState]);

    }
    objWs.onmessage= function (event) {
        Handle_List("System Message:"+event.data);
    }
    objWs.onclose=function(){
        Handle_List(arrState[objWs.readyState]);
    }
    objWs.onerror=function(){
        Handle_List(arrState[5]);
    }
    function btnSend_Click(){
        var strTxtMessage=$$("txtMessage").value;
        if(strTxtMessage.length>0){
            objWs.send(strTxtMessage);
            Handle_List("I Say: "+strTxtMessage);
            $$("txtMessage").value="";
        }
    }
    function Handle_List(message){
        strTip+=message+"\n";
        $$("txtaList").innerHTML=strTip;
    }
}
var objNav=null;
var strHTML="";
function pageload1(){
    if(objNav==null){
        objNav=window.navigator;
    }
    if(objNav!=null){
        var objGeoLoc = objNav.geolocation;
        if(objGeoLoc!=null){
            objGeoLoc.getCurrentPosition(function(objPos){
                var objCrd=objPos.coords;
                strHTML+="WD:<b>"+objCrd.latitude+"</b><br>";
                strHTML+="JZD:<b>"+objCrd.accuracy+"</b><br>";
                strHTML+="JD:<b>"+objCrd.longitude+"</b><br>";
                strHTML+="Timestamp:<b>"+objPos.timestamp+"</b><br>";
                var objAdd=objPos.address;
                strHTML+="----------------------<br>";
                strHTML+="Country:<b>"+objAdd.country+"</b><br>";
                strHTML+="Province:<b>"+objAdd.region+"</b><br>";
                strHTML+="City:<b>"+objAdd.city+"</b><br>";
                Status_handle(strHTML);
            },function(objError){
                Status_Handle(objError.code+":"+objError.message);
            },{
                maximumAge:3*1000*60,
                timeout:3000
            });
        }
    }
}

function Status_Handle(message){
    $$("pStatus").style.display="block";
    $$("pStatus").innerHTML=message;
}