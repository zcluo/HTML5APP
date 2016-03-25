/**
 * Created by luozc-kf1b on 2015/12/22.
 */
function $$(id){
    return document.getElementById(id);
}

function chkPassWord(){
    var $$Pass=$$("txtPassWord");
    var $$spnP=$$("spnPassWord");
    var strP;
    if($$Pass.checkValidity()){
        strP="T";

    }
    else{
        strP="F";
    }
    $$spnP.innerHTML=strP;
    return false;
}