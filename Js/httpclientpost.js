/**
 * Created by luozc-kf1b on 2016/3/1.
 */
exports.post=function(url,data,callback){
    url=require('url').parse(url);
    var hostname=url.hostname,port=url.port||80;
    var path=url.pathname,query=url.query;
    if(query)path+="?"+query;

    var type;
    if(data==null)data="";
    if(data instanceof Buffer){
        type="application/octet-stream";
    }
    else if(typeof data === "string"){
        type="text/plain;charset=UTF-8";
    }
    else if(typeof data === "object"){
        data=require("querystring").stringify(data);
        type="application/x-www-form-urlencoded";
    }

    var client = require("http").createClient(port,hostname);
    var request=client.request("POST",path,{"HOST":hostname,"Content-Type":type});
    console.log(data);
    request.write(data);
    request.end();

    request.on("response",function(response){
        response.setEncoding("utf8");
        var body="";
        response.on("data",function(chunk){
            body+=chunk;
        });
        response.on("end",function(){
            if(callback)callback(response.statusCode,response.headers,body);
        });
    });
};

//exports.get("http://127.0.0.1:8000/test/delay",console.log);
postData={'para1':'test1','para2':'test2'};
exports.post("http://127.0.0.1:8000/test/mirror",postData,console.log);