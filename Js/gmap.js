/**
 * Created by luozc-kf1b on 2016/5/18.
 */
function $$(id){
    return document.getElementById(id);
}
var objNav = null;
var strHTML = "";

function pageLoad(){
    if(objNav == null){
        objNav = window.navigator;
    }
    if(objNav != null)
    {
        var objGeoLoc = objNav.geolocation;
        if(objGeoLoc != null){
            objGeoLoc.getCurrentPosition(function(objPos){
                var objCrd = objPos.coords;
                var lat = objCrd.latitude;
                var lng = objCrd.longitude;
                var latlng = new google.maps.LatLng(lat,lng);
                var objOpt = {
                    zoom:16,
                    center:latlng,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                };
                var objMap = new google.maps.Map($$("divMap"),objOpt);

                var objMrk = new google.maps.Marker({
                    position:latlng,
                    map:objMap
                });
                var objInf = new google.maps.InfoWindow({
                    content:"我在这里"
                });
                objInf.open(objMap,objMrk);
            },function(objError){
                Status_Handle(objError.code + ":" + objError.message);
            },{
                maximumAge:3*1000*60,
                timeout:3000
            });
        }
    }
}