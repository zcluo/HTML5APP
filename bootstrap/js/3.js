/**
 * Created by luozc-kf1b on 2016/4/28.
 */
$(document).ready(function () {
    var data = [];
    function buildDomTree() {




        function walk(nodes, data) {
            if (!nodes) { return; }
            $.each(nodes, function (id, node) {
                var obj = {
                    id: id,
                    text: node.nodeName + " - " + (node.textContent ? node.textContent : ''),
                    tags: [node.childElementCount > 0 ? node.childElementCount + ' child elements' : '']
                };
                if (node.childElementCount > 0) {
                    obj.nodes = [];
                    walk(node.childNodes, obj.nodes);
                }
                data.push(obj);
            });
        }
        //walk($('html')[0].children, data);
        $.ajax({
            type: "GET",
            url: "data/categories.xml",
            cache: false,
            async:false,
            dataType: "xml",
            success: function(xml) {
                $(xml).find("Categories").each(function(){
                    var name = $(this).find("CategoryName").text();
                    console.log(name);});
                console.log($(xml).find("Categories").find("CategoryName").text());
                walk($(xml)[0].childNodes,data);
            }
        });
        return data;
    }
    $(function() {
        var options = {
            bootstrap2: false,
            showTags: true,
            levels: 5,
            data: buildDomTree()
        };
        $('#treeview').treeview(options);
    });

});
