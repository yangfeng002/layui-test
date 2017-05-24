/**
 * Created by fengyang on 2017/5/19.
 */
layui.use(['form','element','layer','laypage'], function () {
    var element = layui.element(), layer = layui.layer,$ = layui.jquery,laypage = layui.laypage;
    //页面初始化加载默认第一页
    var data =  renderProcessList(1);
    //分页加载
    laypage({
        cont: $(".layui-pagination"),//dom，字符串id,jquery对象都可以
        pages: data.pages,//总页数
        curr:data.page,//表示当前页
        skip: true,//是否展示调整
        hash:"abc",
        jump: function(obj, first){
            //得到了当前页，用于向服务端请求对应数据
            var curr = obj.curr;
            //此处用于请求后台，加载数据
            renderProcessList(curr);
        }
    });
    //1.加载ajax流程列表请求
    /*   var index;//用于加载loading的
    var ajaxTimeout =$.ajax({
        url:"",
        method:"",
        data:{page:"",pageNum:""},
        dataType:"json",
        async:false,
        timeout:6000,
        beforeSend:function(){
           //请求之前的操作
             index = layer.load(2, {
             shade: [0.5,'#000'] //0.1透明度的白色背景
             });
        },
        success: function (data) {
            //成功后的操作
            layer.close(index);
            //加载请求

        },
        error: function (xhr,error,status) {
            layer.msg("对不起，请求访问失败，请稍后操作！");
        },
        complete : function(xhr,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                ajaxTimeout.abort();
                layer.msg("对不起，请求超时，请稍后访问");
            }
        },
    })*/


    /*已结束的流程列表*/


    //渲染内容
    function renderProcessList(page,pageNum){
        /*说明：此处的page表示当前页*/
        //测试数据
        var data = {data:[
            {id:"25001",key:"timerExample",name:"timerExample.bpmn",version:"1",startTime:"2017-5-19",endTime:"2017-5-20",detail:'{"name":"test1","revision":1,"description":"测试一个例子"}'},
            {id:"25026",key:"process",name:"测试.bpmn20.xml",version:"1",startTime:"2017-5-15",endTime:"2017-5-18",detail:'{"name":"Demo model","description":"This is a demo model"}'},
            {id:"25001",key:"timerExample",name:"timerExample.bpmn",version:"1",startTime:"2017-5-19",endTime:"2017-5-21",detail:'{"name":null,"revision":1,"description":null}'}
        ],pages:1,page:1};
        var temp = [];
        var state="";
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td>'+escapeHtml(v.key)+'</td>' +
                    '<td>'+escapeHtml(v.name)+'</td>' +
                    '<td>'+escapeHtml(v.version)+'</td>' +
                    '<td>'+escapeHtml(v.startTime)+'</td>' +
                    '<td>'+escapeHtml(v.endTime)+'</td>' +
                    '<td>'+escapeHtml(v.detail)+'</td>' +
                    '<td>' +
                    ' <a href="${ctx}/modeler.html?modelId=${model.id}" class="text-blue" target="_blank">编辑</a>' +
                    ' <a href="${ctx}/workflow/model/deploy/${model.id}" class="text-blue">部署</a>' +
                    ' 导出(<a href="${ctx}/workflow/model/export/${model.id}/bpmn" class="text-blue" target="_blank">BPMN</a> ' +
                    ' |&nbsp;<a href="${ctx}/workflow/model/export/${model.id}/json" class="text-blue" target="_blank">JSON</a> ' +
                    ' |&nbsp;<a href="#" class="text-blue">SVG</a>)' +
                    ' <a href="${ctx}/workflow/model/delete/${model.id}" class="text-blue">删除</a></td>' +
                    '</tr>');
            });
            $("#modelList").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }

    }

});
