/**
 * Created by luozc-kf1b on 2015/10/19.
 */
function $$(id){
    return document.getElementById(id);
}
function ShowKeyWord(){
    var strTmp="<b>������Ĳ�ѯ�ؼ����ǣ�</b>";
    strTmp = strTmp + $$('txtKeyWord').value;
    $$('pTip').innerHTML = strTmp;
    return false;
}
