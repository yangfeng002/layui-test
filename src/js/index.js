/**
 * Created by fengyang on 2017/4/19.
 */
layui.use(['element','layer','util'],function() {
    var element = layui.element(), layer = layui.layer, $ = layui.jquery, util = layui.util;
    //使用内部工具组件
    var $leftMenu = $('.left-menu');//dom元素
    var tab = 'top-tab';//切换卡（菜单详情中展示的部分）
    var topMenu = 'side-left';//一级菜单名称
    var leftMenu = 'left-menu';//二级菜单名称（是一级菜单下面的子菜单）
    var side = $('.my-side');//左侧导航
    var body = $('.my-body');//中心内容部分
    var footer = $('.my-footer');//底部对象

    //一级菜单导航事件
    element.on('nav(' + topMenu + ')',function(data) {
        //控制二级菜单的展示（顺序需要保证一致）
        $leftMenu.hide().eq(data.index()).show();
    });

    var mainHeight = $(window).height() - 60 - 41 - 44 - 5;
    $("#frame").css({height: $(window).height()-155});//设置iframe高度
    //二级菜单事件
    element.on('nav(' + leftMenu + ')',function(data) {
        var a 	= data.children("a");
        var id = a.data("id");
        var url = a.data("url");
        var title 	= a.text();
        var length 	= $(".layui-tab-title").children("li[lay-id='" + id + "']").length;
        if (!length) {
            //绑定对应的iframe
            var iframe = '<iframe src="' + url + '" style="height:' + mainHeight + 'px;width: 100%;" frameborder="0"></iframe>';
            element.tabAdd(tab, {
                title	: title,
                content	: iframe,
                id		: id
            });
        }
        element.tabChange(tab, id);
    });
    //二级菜单列表点击事件
    $leftMenu.on("click", "li",function() {
        $(this).siblings().removeClass("layui-nav-itemed");
    });
    //默认二级菜单第一个子元素处于选中状态
    $leftMenu.children("li:first").children("a:first").click();

    //左侧菜单收缩事件
    $(".menu-flexible").click(function(){
        if(localStorage.log == 0){
            navShow(50);
        }else{
            navHide(50);
        }
       /* $(".my-side").toggle();
        $(".layui-body,.layui-footer").css("left",($(".my-side").is(":hidden")) ? '0' : '200px');*/
    });

    /*相关方法引入*/
    // 工具
    function _util(){
        var bar = $('.layui-fixbar');
        // 分辨率小于1024  使用内部工具组件
        if ($(window).width() < 1024) {
            $(".menu-flexible").hide();
            util.fixbar({
                bar1: '&#xe602;'
                , css: {left: 10, bottom: 54}
                , click: function (type) {
                    if (type === 'bar1') {
                        //iframe层
                        layer.open({
                            type: 1,                        // 类型
                            title: false,                   // 标题
                            offset: 'l',                    // 定位 左边
                            closeBtn: 0,                    // 关闭按钮
                            anim: 0,                        // 动画
                            shadeClose: true,               // 点击遮罩关闭
                            shade: 0.8,                     // 半透明
                            area: ['150px', '100%'],        // 区域
                            skin: 'my-mobile',              // 样式
                            content: $('body .my-side').html() // 内容
                        });
                    }
                    element.init();
                }
            });
            bar.removeClass('layui-hide');
            bar.addClass('layui-show');
        }else{
            $(".menu-flexible").show();
            bar.removeClass('layui-show');
            bar.addClass('layui-hide');
        }
    }
    // 导航栏收缩
    function navHide(t,st){
        var time = t ? t : 50;
        st ? localStorage.log = 1 : localStorage.log = 0;
        side.animate({'left':-200},time);
        body.animate({'left':0},time);
        footer.animate({'left':0},time);
    }
    // 导航栏展开
    function navShow(t,st){
        var time = t ? t : 50;
        st ? localStorage.log = 0 : localStorage.log = 1;
        side.animate({'left':0},time);
        body.animate({'left':200},time);
        footer.animate({'left':200},time);
    }
    //窗口自适应
    $(window).on('resize', function() {
        if($(this).width() > 1024){
            if(localStorage.log == 0){
                navShow();
            }
        }else{
            if(localStorage.log == 1){
                navHide();
            }
        }
        init();
    });

    // 监听控制content高度
    function init(){
        // 起始判断收缩还是展开
        if(localStorage.log == 0){
            navHide(100);
        }else{
            navShow(1);
        }
        // 工具
        _util();
       // 选项卡高度
       var  cardTitleHeight = $(document).find(".layui-tab[lay-filter='top-tab'] ul.layui-tab-title").height();
        // 需要减去的高度
       var height = $(window).height() - $('.layui-header').height() - cardTitleHeight - $('.layui-footer').height();
        // 设置每一个页面的高度
       $(document).find(".layui-tab[lay-filter='top-tab'] div.layui-tab-content").height( height - 2);
    }
    // 初始化
    init();
});

