/**
 * Created by fengyang on 2017/5/19.
 */
layui.use(['form','element','layer','laypage','upload'], function () {
    var element = layui.element(), layer = layui.layer,$ = layui.jquery,laypage = layui.laypage;
    //上传文件操作
    layui.upload({
        url: '',
        elem: '', //指定原始元素，默认直接查找class="layui-upload-file"
        method: 'get', //上传接口的http类型
        before: function(input){
            //返回的参数item，即为当前的input DOM对象
            console.log('文件上传中');
        },
        success: function(res){
            console.log(res);
            layer.msg(res.msg);
        }
    });

    //页面初始化加载默认第一页
    var deployData =  renderDeployments(1);
    //列表分页加载
    laypage({
        cont: $("#deployPage"),//dom，字符串id,jquery对象都可以
        pages: deployData.pages,//总页数
        curr:deployData.page,//表示当前页
        skip: true,//是否展示调整
        hash:"abc",
        jump: function(obj, first){
            //得到了当前页，用于向服务端请求对应数据
            var curr = obj.curr;
            //此处用于请求后台，加载数据
            renderDeployments(curr);
        }
    });

    //点击事件
    $(document).on("click",".show-detail", function () {
        $(".deploy-list").hide();
        $(".deploy-detail-list").show();
        var id = $(this).attr("pid");
        var deployDetailData= renderDeployDetails(1,8,id);
        //详情分页加载
        laypage({
            cont: $("#deployDetailPage"),//dom，字符串id,jquery对象都可以
            pages: deployDetailData.pages,//总页数
            curr:deployDetailData.page,//表示当前页
            skip: true,//是否展示调整
            hash:"abcd",
            jump: function(obj, first){
                //得到了当前页，用于向服务端请求对应数据
                var curr = obj.curr;
                //此处用于请求后台，加载数据
                renderDeployDetails(curr);
            }
        });
    });
    $(document).on("click",".return-list", function () {
        $(".deploy-list").show();
        $(".deploy-detail-list").hide();
    });
    //删除事件
    $(document).on("click","button[lay-filter='deleteProcess']", function () {
        var $this = $(this);
        var index = layer.confirm('您确定要删除吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            //执行删除操作
            $this.closest("tr").remove();
            layer.closeAll();
        }, function(){
            //取消操作
        });


    });

    //渲染内容列表
    function renderDeployments(page,pageNum){
        /*说明：此处的page表示当前页*/
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
        //测试数据
        var data = {data:[
            {id:"10049",name:"leave-dynamic-from:1:10049",deplyTime:"May 22 2017 10:36 AM",category:"",tenant:""},
            {id:"10025",name:"leave-dynamic-from:1:10025",deplyTime:"May 22 2017 10:36 AM",category:"",tenant:""},
            {id:"10029",name:"leave-dynamic-from:1:10029",deplyTime:"May 22 2017 10:36 AM",category:"",tenant:""},
            {id:"10046",name:"leave-dynamic-from:1:10046",deplyTime:"May 19 2017 10:36 AM",category:"",tenant:""},
            {id:"10024",name:"leave-dynamic-from:1:10024",deplyTime:"May 21 2017 10:36 AM",category:"",tenant:""},
            {id:"10031",name:"leave-dynamic-from:1:10031",deplyTime:"May 20 2017 10:36 AM",category:"",tenant:""}
           ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td><a class="text-blue show-detail"  pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.name)+'</a></td>' +
                    '<td>'+escapeHtml(v.deplyTime)+'</td>' +
                    '<td>'+escapeHtml(v.category)+'</td>' +
                    '<td>'+escapeHtml(v.tenant)+'</td>' +
                    '<td><button class="layui-btn layui-btn-small layui-btn-danger" lay-filter="deleteProcess">删除</button></td>' +
                    '</tr>');
            });
            $("#deployments").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }

    }
    //渲染详情列表
    function renderDeployDetails(page,pageNum,id){
        //ajax请求
        /*   var index;//用于加载loading的
         var ajaxTimeout =$.ajax({
         url:"",
         method:"",
         data:{page:page,pageNum:pageNun,id:id},
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
        var data = {data:[
            {id:"work_migu:1:2515",name:"汇总流程",version:"1",key:"work_migu"},
            {id:"work_migu:1:2515",name:"my-process",version:"1",key:"work_migu"},
            {id:"work_migu:1:2515",name:"test",version:"1",key:"work_migu"},
            {id:"work_migu:1:2515",name:"工作流测试",version:"1",key:"work_migu"}
        ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td><a class="text-blue" pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.name)+'</a>' +
                    '<td>'+escapeHtml(v.version)+'</td>' +
                    '<td>'+escapeHtml(v.key)+'</td>' +
                    '</tr>');
            });
            $("#deployDetails").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }
    }
});
