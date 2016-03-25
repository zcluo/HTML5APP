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
 * �����Ĺ���Ϊ����e��n������Ԫ�أ���������ڴ������Ȼ����Ȳ���Element,�򷵻�null��
 * ���nΪ0����Χe�������nΪ1����ʡ�ԣ����򷵻��丸Ԫ��
 * ���nΪ2���򷵻����游Ԫ�أ��Դ����ơ�
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
 * ����Ԫ��e�ĵ�n���ֵ�Ԫ��
 * ���nΪ�������غ����ĵ�n���ֵ�Ԫ��
 * ���nΪ��������ǰ��ĵ�n���ֵ�Ԫ��
 * ���nΪ�㣬����e����
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
                /*��ѭ��*/
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