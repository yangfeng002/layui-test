/**
 * Created by fengyang on 2017/4/19.
 */
/*
layui.use(['element','layer'],function() {
    var $ = layui.jquery;
    var element = layui.element();
    var layer = layui.layer;

    var l_o = $('.left-menu'),
        tab = 'top-tab',
        l_m = 'left-menu',
        t_m = 'top-menu';

    var mainHeight = $(window).height() - 60 - 41 - 44 - 5;

    element.on('nav(' + t_m + ')',function(data) {
        l_o.hide().eq(data.index()).show();
    });

    l_o.on("click", "li",function() {
        $(this).siblings().removeClass("layui-nav-itemed");
    });

    element.on('nav(' + l_m + ')',function(data) {
        var a_t 	= data.children("a"),
            id 		= a_t.data("id"),
            url 	= a_t.data("url"),
            title 	= a_t.text(),
            length 	= $(".layui-tab-title").children("li[lay-id='" + id + "']").length;
        if (!length) {
            var iframe = '<iframe src="' + url + '" style="height:' + mainHeight + 'px;"></iframe>';
            element.tabAdd(tab, {
                title	: title,
                content	: iframe,
                id		: id
            });
        }
        element.tabChange(tab, id);
    });

    l_o.children("li:first").children("a:first").click();

    $(".menu-flexible").click(function(){
        $(".left-menu-all").toggle();
        $(".layui-body,.layui-footer").css("left",($(".left-menu-all").is(":hidden")) ? '0' : '200px');
    })

    /!*$(".skin-rade .layui-nav-child").on("click","a",function(){
     var color = $(this).css("background-color");
     $(".layui-layout-admin .layui-header,.layui-bg-black").css("background-color",color);
     })*!/
});*/
layui.use(['element','layer'], function(){
    var element = layui.element(); //导航的hover效果、二级菜单等功能，需要依赖element模块
    var layer = layui.layer;
    //监听导航点击
    element.on('nav(demo)', function(elem){
        //console.log(elem)
        layer.msg(elem.text());
    });
});
