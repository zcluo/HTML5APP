/**
 * Created by zcluo on 2016/5/27.
 */
var http = require("http");
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.end('Hello, World!\n');
}).listen(9090);
console.log('Server running at http://127.0.0.1:9090/');