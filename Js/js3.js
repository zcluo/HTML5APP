/**
 * Created by luozc-kf1b on 2016/1/29.
 */
function $$(id){
    return document.getElementById(id);
}

function fileUpload_GetFileList(f){
    var strLi = "<li class='li'>";
    strLi = strLi + "<span>File name|</span>";
    strLi = strLi + "<span>File type|</span>";
    strLi = strLi + "<span>File size</span>";
    strLi = strLi + "</li>";
    for(var i = 0; i < f.length; i++){
        var tmpFile = f[i];
        strLi = strLi + "<li>";
        strLi = strLi + "<span>" + tmpFile.name + "|</span>";
        strLi = strLi + "<span>" + tmpFile.type + "|</span>";
        strLi = strLi + "<span>" + tmpFile.size + "</span>";
        strLi = strLi + "</li>";
    }
    $$("ulUpload").innerHTML = strLi;
}

function fileUpload_checkType(f){
    var strP="",
        strN="",intJ=0;
    var strFileType=/image.*/;
    for(var intI=0;intI< f.length;intI++){
        var tmpFile=f[intI];
        if(!tmpFile.type.match(strFileType)){
            intJ = intJ + 1;
            strN=strN+tmpFile.name+"<br>";
        }
    }
    strP = "check ("+intJ+") non image files.";
    if(intJ>0){
        strP = strP + " file name: <p>"+strN+"</p>";
    }
    $$("pTip").innerHTML=strP;
}

function fileUpload_PrevImageFile(f){
    if(typeof FileReader == "undefined"){
        alert("检测到您的浏览器不支持FileReader对象！");
    }
    var strHTML="";
    for(var intI=0;intI< f.length;intI++){
        var tmpFile = f[intI];
        var reader = new FileReader();
        reader.readAsDataURL(tmpFile);
        reader.onload=function(e){
            strHTML=strHTML+"<span>";
            strHTML=strHTML+"<img src='"+ e.target.result+"' alt=''/>";
            strHTML=strHTML+"</span>";
            alert(e.target.result);
            $$("ulUpload").innerHTML="<li>"+strHTML+"</li>";
        }
    }


}

function fileUpload_ReadTxtFile(f){
    if(typeof FileReader =='undefined'){
        alert("检测到您的浏览器不支持FileReader对象！");
    }
    var tmpFile=f[0];
    var reader = new FileReader();
    reader.readAsText(tmpFile);
    reader.onload=function(e){
        $$("artShow").innerHTML="<pre>"+ e.target.result+"</pre>";
    }
}

function fileUpload_ShowEvent(f){
    if(typeof FileReader == 'undefined'){
        alert("检测到您的浏览器不支持FileReader对象！");

    }
    var tmpFile=f[0];
    var reader = new FileReader();
    reader.readAsText(tmpFile);
    reader.onload=function(e){
        $$("pStatus").style.display="block";
        $$("pStatus").innerHTML = "数据读取成功！";
    }
    reader.onloadstart=function(e){
        $$("pStatus").style.display="block";
        $$("pStatus").innerHTML="开始读取数据...";
    }
    reader.onloadend= function (e) {
        $$("pStatus").style.display="block";
        $$("pStatus").innerHTML="文件读取成功！";
    }
    reader.onprogress= function (e) {
        $$("pStatus").style.display="block";
        $$("pStatus").innerHTML="正在读取数据...";
    }
}

function fileUpload_MoveFile(f){
    if(typeof FileReader == 'undefined'){
        alert("检测到您的浏览器不支持FileReader对象！");

    }
    for(var i=0;i< f.length;i++){
        var tmpFile=f[i];
        var reader = new FileReader();
        reader.readAsDataURL(tmpFile);
        reader.onload=(function(f1){
            return function(e){
                var eleSpan = document.createElement('span');
                eleSpan.innerHTML=['<img src="',
                    e.target.result,
                    '" title="',
                    f1.name,
                    '"/>'].join(' ');
                $$('ulUpload').insertBefore(eleSpan,null);
            }
        }
        )(tmpFile);
    }
}
function dropFile(e){
    fileUpload_MoveFile(e.dataTransfer.files);
    e.stopPropagation();
    e.preventDefault();
}
var strOrigin="http://localhost:63342";
function pageload(){
    window.addEventListener('message',function(event){
        if(event.origin == strOrigin){
            $$("pStatus").style.display="block";
            $$("pStatus").innerHTML+=event.data;
        }
    },false);
}

function btnSend_Click(){
    var strTxtValue=$$("txtNum").value;
    if(strTxtValue.length>0){
        var targetOrigin=strOrigin;
        $$("ifrA").contentWindow.postMessage(strTxtValue,targetOrigin);
        $$("txtNum").value="";
    }
}

function PageLoadForMessage(){
    window.addEventListener('message',function(event){
        if(event.origin == strOrigin){
            var strRetHTML="<span><b> ";
            strRetHTML+=event.data+"</b>位随机数为：<b>";
            strRetHTML+=RetRndNum(event.data);
            strRetHTML+="</b></span><br>";
            event.source.postMessage(strRetHTML,event.origin);
        }
    },false);
}

function RetRndNum(n){
    var strRnd="";
    for(var i=0;i<n;i++){
        strRnd+=Math.floor(Math.random()*10);
    }
    return strRnd;
}