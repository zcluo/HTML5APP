/**
 * Created by luozc-kf1b on 2015/10/13.
 */
function $$(id){
    return document.getElementById(id);
}

var intR,intG,intB,strColor;

function setSpnColor(){
    intR=$$("txtR").value;
    intG=$$("txtG").value;
    intB=$$("txtB").value;
    strColor = "rgb("+intR+","+intG+","+intB+")";
    $$("pColor").innerHTML = strColor;
    $$("spnPrev").style.backgroundColor=strColor;
}

setSpnColor();