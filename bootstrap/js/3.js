/**
 * Created by luozc-kf1b on 2016/4/28.
 */
$(document).ready(function () {

    var cxml = null;
    var pxml = null;
    $.ajax({
        type: "GET",
        url: "data/categories.xml",
        cache: false,
        async: false,
        dataType: "xml",
        success: function (xml) {
            cxml = xml;
            $(cxml).find("Categories").each(function () {
                var name = $(this).find("CategoryName").text();
                console.log(name);
            });
            console.log($(cxml).find("Categories").find("CategoryName").text());
            var ret = $.xml2json(cxml);
            console.log(JSON.stringify(ret));

        }
    });

    $.ajax({
        type: "GET",
        url: "data/products.xml",
        cache: false,
        async: false,
        dataType: "xml",
        success: function (xml) {
            pxml = xml;

            var ret = $.xml2json(pxml);
            console.log(JSON.stringify(ret));

        }
    });

    function buildDomTree() {

        var categories = [];
        var products = [];

        function walkC(nodes, data) {
            if (!nodes) {
                return;
            }

            $.each(nodes, function (id, node) {
                if (node.nodeName === 'Categories') {
                    var cid = $(node).find('CategoryID').first().text();
                    var ctext = $(node).find('CategoryName').first().text();
                    var cdesc = $(node).find('Description').first().text()
                    var obj = {
                        id: cid,
                        name: ctext,
                        desc: cdesc
                    };
                    if (node.childElementCount > 0&& $(node).find('Categories')) {
                        obj.children = [];
                        walkC($(node).children('Categories'), obj.children);
                    }
                    data.push(obj);
                }
            });

        }

        function walkP(nodes, data) {
            if (!nodes) {
                return;
            }

            $.each(nodes, function (id, node) {
                if (node.nodeName === 'Products') {
                    var cid = $(node).find('ProductID').first().text();
                    var ctext = $(node).find('ProductName').first().text();
                    var cquantitypu = $(node).find('QuantityPerUnit').first().text();
                    var cprice = $(node).find('UnitPrice').first().text();
                    var cateid = $(node).find('CategoryID').first().text();
                    var ctitle = 'QuantityPerUnit: ' + cquantitypu + '; UnitPrice: ' + cprice;
                    var obj = {
                        id: cid,
                        name: ctext,
                        desc:ctitle,
                        cateid:cateid,
                        qpu:cquantitypu,
                        price:cprice

                    };
                    if (node.childElementCount > 0&& $(node).find('Products')) {
                        obj.children = [];
                        walkP($(node).children('Products'), obj.children);
                    }
                    data.push(obj);
                }
            });

        }



        //walk($(rxml)[0].children, data);
        walkC($(cxml).find('CategoriesRoot').children('Categories'), categories);
        walkP($(pxml).find('ProductsRoot').children('Products'), products);
        console.log(JSON.stringify(categories));
        console.log(JSON.stringify(products));
        for(var i = 0; i < products.length; i++){
            var cateid = products[i].cateid;
            for(var j = 0; j < categories.length; j++)
            {
                if(categories[j].id === cateid)
                    categories[j].children.push(products[i]);
            }
        }
        console.log(JSON.stringify(categories));
        return categories;
    }


    var options = {
        bootstrap2: false,
        showTags: false,
        levels: 5,

        data: buildDomTree()
    };
    var setting = {
        view:{
            showTitle:false
        },
        /*data:{
            key:{
                title:'desc'
            }
        },*/
        callback: {
            onClick: zTreeOnClick
        }
    };

    function zTreeOnClick(event, treeId, treeNode) {
        alert(treeNode.desc);
    };

    //setting.view.showTitle = true & setting.data.key.title = ''
    zTreeObj = $.fn.zTree.init($("#treeview"), setting, buildDomTree());




});
