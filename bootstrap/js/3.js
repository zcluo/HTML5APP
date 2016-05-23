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
                        text: ctext,
                        desc: cdesc,
                        tags: null
                    };
                    if (node.childElementCount > 0&& $(node).find('Categories')) {
                        obj.nodes = [];
                        walkC($(node).children('Categories'), obj.nodes);
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
                    var obj = {
                        id: cid,
                        text: ctext,
                        cateid:cateid,
                        qpu:cquantitypu,
                        price:cprice,
                        tags: null
                    };
                    if (node.childElementCount > 0&& $(node).find('Products')) {
                        obj.nodes = [];
                        walkP($(node).children('Products'), obj.nodes);
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
                    categories[j].nodes.push(products[i]);
            }
        }
        return categories;
    }


    var options = {
        bootstrap2: false,
        showTags: false,
        levels: 5,

        data: buildDomTree()
    };
    $('#treeview').treeview(options);
    //nodeSelected
    $('#treeview').on('nodeSelected', function(event, data) {
        console.log('clicked');
        var message = '';
        if(data.desc)
            message = data.desc;
        else
            message = "QuantityPerUnit: " + data.qpu + "; " + " UnitPrice: " + data.price;
        //$('<p></p>').text(message)
        $('#dialog-message').append(message);
        $( "#dialog-message" ).dialog({
            modal: true,
            buttons: {
                Ok: function() {
                    $('#dialog-message').text('')
                    $( this ).dialog( "close" );
                    //$(this).destroy();
                }
            }
        });
    });



});
