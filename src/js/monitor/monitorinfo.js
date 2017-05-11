/**
 * Created by fengyang on 2017/4/28.
 */
/*引入相关文件*/
layui.use(['element','layer','util'],function() {
    //1.服务引入
    var element = layui.element(), layer = layui.layer,$ = layui.jquery;
    $(window).bind('scroll',function(){
        var len=$(this).scrollTop();
        if(len>=100){
            //显示回到顶部按钮
            $('.layui-fixbar').show();
        }else{
            //隐藏回到顶部按钮
            $('.layui-fixbar').hide();
        }
    });
    $('.layui-fixbar-top').click(function(){
        //不需要动画则直接
        $(document).scrollTop(0);
    });
    //2.业务逻辑功能部分
    //2.1服务器列表动态加载（展示当前服务器的信息）
    var param = "";
    /*  $.ajax({
        url:"",
        method:"post",
        data:param,
        dataType:"json",
        beforeSend: function () {

        },
        success: function (data) {
            //执行列表加载
        },
        error: function (xhr,error,msg) {
            
        }
    });*/
    var data = {result:[{serverName:"redis服务器1",IP:"127.0.0.1",info:"danger"},{serverName:"redis服务器2",IP:"127.0.0.1",info:"warning"},{serverName:"redis服务器3",IP:"127.0.0.1",info:"current"},{serverName:"redis服务器4",IP:"127.0.0.1",info:"normal"}]};
    var temp = [];
    $.each(data.result, function (i,v) {
        temp.push('<li class="layui-elip '+ v.info+'">' +
            '<a  title="'+v.serverName+':'+ v.IP+'" >' +
            '<i class="iconfont icon-diannao1 text-'+ v.info+'"></i>' +
            '<span>'+ v.serverName+'</span>:<span>'+ v.IP+'</span>'+
            '</a></li>');
    });
    $(".monitor-nav").empty().append(temp.join(""));
    element.init();
    //服务器列表事件绑定
    $(".monitor-nav li").on("click", function () {
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
       //ajax请求（服务器详细信息加载）

    });

    //资源使用情况

    getOption("cpuContainer","48","cpu","占比");
    getOption("storageContainer","60","内存","使用量");
    getOption("exchangeContainer","75","交换区","使用量");
    getOption("discContainer","20","磁盘","使用量");



    //调用接口
    function getOption(dom,value,title1,title2){
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 10,
                            shadowBlur: 0,
                            color:[[0.75, '#7CBB55'],[0.85, '#DDBD4D'],[1.0, '#E43F3D']]
                        }
                    },
                    axisTick: {
                        show: false,
                        splitNumber: 1
                    },
                    axisLabel:{
                        distance:0,
                        show:true
                    },
                    splitLine:{
                        show: false,
                    },
                    name: title1,
                    type: 'gauge',
                    radius:'100%',
                    detail: {
                        formatter:'{value}%',
                        offsetCenter: [0, "60%"],
                        textStyle: {
                            fontSize: 20,
                            color: "#333"
                        }},
                    data: [{value: value, name: title2}]
                }
            ]
        };
        echarts.init(document.getElementById(dom)).setOption(option);
    }
});