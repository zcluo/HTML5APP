/**
 * Created by luozc-kf1b on 2016/3/4.
 */
/**
* Document=9;
* Element=1;
* Text=3;
* Comment=8;
* DocumentFragment=11;
* */
/**
 * 函数的功能为返回e的n层祖先元素，如果不存在此类祖先或祖先不是Element,则返回null，
 * 如果n为0，则范围e本身。如果n为1（或省略），则返回其父元素
 * 如果n为2，则返回其祖父元素，以此类推。
 * @param e
 * @param n
 * @returns {*}
 */
function parent(e,n){
    if(n===undefined)n=1
    while(n--&&e)e= e.parent;
    if(!e|| e.nodeType!==1)return null;
    return e;
}

/**
 * 返回元素e的第n个兄弟元素
 * 如果n为正，返回后续的第n个兄弟元素
 * 如果n为负，返回前面的第n个兄弟元素
 * 如果n为零，返回e本身
 * @param e
 * @param n
 * @returns {*}
 */
function sibling(e,n){
    while(e&&n!==0){
        if(n>0){
            if(e.nextElementSibling)e= e.nextElementSibling;
            else{
                for(e= e.nextSibling;e&& e.nodeType!==1;e= e.nextSibling);
                /*空循环*/
            }
            n--;
        }
        else{
            if(e.previousElementSibling)e= e.previousElementSibling;
            else{
                for(e= e.previousSibling;e&& e.nodeType!==1;e= e.previousSibling);
            }
            n++;
        }
    }
    return e;
}

function child(e,n){
    if(e.children){
        if(n<0)n+= e.children.length;
        if(n<0)return null;
        return e.children[n];
    }
    if(n>=0){
        if(e.firstElementChild)e= e.firstElementChild;
        else{
            for(e= e.firstChild;e&& e.nodeType!==1;e= e.nextSibling);
        }
        return sibling(e,n);
    }
    else{
        if(e.lastElementChild)e= e.lastElementChild;
        else{
            for(e= e.lastChild;e&& e.nodeType!==1;e= e.previousSibling);
        }
        return sibling(e,n+1);
    }
}