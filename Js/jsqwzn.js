/**
 * Created by luozc-kf1b on 2016/2/18.
 */

function inherit(p) {
    if (p == null) throw TypeError();
    if (Object.create) return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {
    };
    f.prototype = p;
    return new f();
}
var p = {
    x: 1.0,
    y: 1.0,
    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y);
        var ratio = newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta() {
        return Math.atan2(this.y, this.x)
    }

};

var serialnum={
    $n:0,
    get next(){return this.$n++;},
    set next(n){
        if(n>=this.$n) this.$n=n;
        else throw "序列号的值不能比当前值小";
    }
};

var q=inherit(p);
q.x=1;
q.y=1;
console.log(q.r);


var scope="global scope";
function checkscope(){
    var scope="local scope";
    function f(){return scope;}
    return f();
}

function checkscope(){
    var scope="local scope";
    function f(){return scope;}
    return f;
}

var uniqueInteger=(function(){
    var counter=0;
    return function(){return counter++;};
}());

function addPrivateProperty(o,name,predicate){
    var value;
    //getter方法简单地将其返回
    o["get"+name]=function(){return value;};

    //setter方法首先检查值是否合法，若不合法就抛出异常
    //否则就将其存储起来
    o["set"+name]=function(v){
        if(predicate&&!predicate(v)){
            throw Error("set"+name+": invalid value "+v);
        }
        else
        value=v;
    };
}

function constfunc(v){
    return function(){
        return v;
    };
}
var funcs=[];
for(var i=0;i<10;i++)
funcs[i]=constfunc(i);

funcs[5]();

function constfuncs(){
    var funcs=[];
    for(var i=0;i<10;i++){
        funcs[i]=function(){return i;};
    }
    return funcs;
}
var funcs = constfuncs();
funcs[5]();

var o={
    add:function(v1,v2){
        return v1+v2;
    }
};
function trace(o,m){
    var original=o[m];
    o[m]=function(){
        console.log(new Date(),"Entering:",m);
        var result = original.apply(this,arguments);
        console.log(new Date(),"Exiting:",m);
        return result;
    };
}

var ret = trace(o,"add");

function f(y)
{
    return this.x+y;
}
var o={x:1};
var g=f.bind(o);
g(2)

function bind(f,o){
    if(f.bind) return f.bind(o);
    else return function(){
        return f.apply(o,arguments);
    };
}

function Range(from,to){
    this.from=from;
    this.to=to;
}

Range.prototype={
    includes:function(x){return this.from<=x&&x<=this.to;},
    foreach:function(f){
        for(var x=Math.ceil(this.from);x<=this.to;x++)f(x);
    },
    toString:function(){return "("+this.from+"..."+this.to+")";}
};
var r=range(1,3);
r.includes(2);
r.foreach(console.log);
console.log(r);

while((result=pattern.exec(text))!=null){
    alert("Matched '"+result[0]+"'"+" at position "+result.index+"; next search begins at "+pattern.lastIndex);
}