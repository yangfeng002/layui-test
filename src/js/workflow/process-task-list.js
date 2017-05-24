/**
 * Created by fengyang on 2017/5/19.
 */
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
            {taskId:"17506",taskKey:"",taskName:"任务列表1",processDefinitionId:"leave-dynamic-from:1:10024",processInstanceId:"10049",priority:"50",taskCreateTime:"Wed May 17 15:58:45 CST 2017",taskEndTime:"",taskDetail:"测试内容具体描述",taskOwner:"PM",state:"0"}
        ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            var state = "";
            $.each(data.data, function (i,v) {
                if(v.state=="0"){
                    state="签收";
                }else{
                    state="办理";
                }
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.taskId)+'</td>' +
                    '<td>'+ escapeHtml(v.taskKey)+'</td>' +
                    '<td>'+ escapeHtml(v.taskName)+'</td>' +
                    '<td>'+escapeHtml(v.processDefinitionId)+'</td>' +
                    '<td>'+escapeHtml(v.processInstanceId)+'</td>' +
                    '<td>'+escapeHtml(v.priority)+'</td>' +
                    '<td>'+escapeHtml(v.taskCreateTime)+'</td>' +
                    '<td>'+escapeHtml(v.taskEndTime)+'</td>' +
                    '<td>'+escapeHtml(v.taskDetail)+'</td>' +
                    '<td>'+escapeHtml(v.taskOwner)+'</td>' +
                    '<td><a class="text-blue" href="#" pid="'+escapeHtml(v.processInstanceId)+'" pdid="'+escapeHtml(v.processDefinitionId)+'">'+state+'</a></td>' +
                    '</tr>');
            });
            $("#processTaskList").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }

    }
});
