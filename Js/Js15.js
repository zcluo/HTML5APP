/**
 * Created by luozc-kf1b on 2015/12/22.
 */
function $$(id){
    return document.getElementById(id);
}
function setErrorInfo(){
    var $$Pass_1=$$("txtPassWord_1");
    var $$Pass_2=$$("txtPassWord_2");
    if($$Pass_1.value==$$Pass_2.value){
        $$Pass_2.setCustomValidity("两次密码相同！");

    }
    else{
        $$Pass_2.setCustomValidity("两次密码不一样！");
    }
}