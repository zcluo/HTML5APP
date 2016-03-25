/**
 * Created by luozc-kf1b on 2016/2/29.
 */

var fs=require("fs"),path=require("path");
var dir=process.cwd();
if(process.argv.length>2) dir=process.argv[2];
var files=fs.readdirSync(dir);
process.stdout.write("Name\t Size\tDate\n");
files.forEach(function(filename){
    var fullname=path.join(dir,filename);
    var stats=fs.statSync(fullname);
    if(stats.isDirectory())filename+="/";
    process.stdout.write(filename+"\t"+stats.size+"\t"+stats.mtime+"\n");
});

