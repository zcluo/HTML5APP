/**
 * Created by luozc-kf1b on 2016/2/29.
 */
var net=require("net");
var server=net.createServer();
server.listen(2000,function(){ console.log("Listening on port 2000");});
server.on("connect",function(stream){

    console.log("Accepting connection from ",stream.remoteAddress);

    stream.on("data",function(data){stream.write(data);console.log("Received data is "+data);});
    stream.on("end",function(data){console.log("Connection closed!");});
});