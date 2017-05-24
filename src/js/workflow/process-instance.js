/**
 * Created by fengyang on 2017/5/19.
 */
layui.use(['form','element','layer','laypage'], function () {
    var element = layui.element(), layer = layui.layer,$ = layui.jquery,laypage = layui.laypage;
    //页面初始化加载默认第一页
    var data =  rendeInstances(1);
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
            rendeInstances(curr);
        }
    });
    var id;//定义的id参数
    //点击事件
    $(document).on("click",".show-detail", function () {
        $(".instance-list").hide();
        $(".instance-detail-list").show();
        id = $(this).attr("pid");
        $(".migu-tab li.layui-this").trigger("click");
    });
    $(document).on("click",".return-list", function () {
        $(".instance-list").show();
        $(".instance-detail-list").hide();
    });

    //tab点击事件
    $(".migu-tab li").on("click",function () {
        var dataUrl = $(this).attr("data-url");
        if(dataUrl=="1"){
            //调用task的接口
            /* var index;
             var url = ctxStatic+"threshold/getAllThreshold";
             $.ajax({
             url:url,
             method:"post",
             data:{},
             cache:false,
             dataType:"json",
             beforeSend: function () {
             //调用之前进行加载
             index = layer.load(2, {
             shade: [0.5,'#000'] //0.1透明度的白色背景
             });
             },
             success: function (data) {
             //执行列表加载并处理数据
             layer.close(index);
             //{"data":[{"id":"MT001","parts":"JVM?????%?","threshold":80.0},{"id":"MT002","parts":"??????????","threshold":3.0},{"id":"MT003","parts":"JVM????????","threshold":3.0}]}
             var temp = [];
             var interval = '';
             $.each(data.data, function (i,v) {
             if(v.id=="MT001"){
             interval = 'required|number|jvmValue';
             }else if(v.id=="MT002" || v.id=="MT003"){
             interval = "required|number|heartbeatValue";
             }
             temp.push('<tr><td>'+v.id+'</td><td>'+ v.parts+'</td>' +
             '         <td><input  name="" lay-verify="'+interval+'"  value="'+v.threshold+'" readonly="readonly" class="no-border"></td>' +
             '         <td class="handler"><a><button  class="layui-btn layui-btn-small"  lay-filter="editor"><i class="layui-icon">&#xe642;</i>编辑</button>' +
             '                <button class="layui-btn layui-btn-small layui-btn-warm" lay-submit="" lay-filter="save"><i class="layui-icon">&#xe618;</i>保存</button> ' +
             '            </a>' +
             '         </td>' +
             '    </tr>');
             });
             $("#threshold").empty().append(temp.join(""));
             element.init();
             },
             error: function (xhr,error,msg) {
             layer.msg("对不起，你访问的页面暂时停止服务！");
             }
             });*/
            var instanceDetailData= renderInstanceTaskDetails(1,8,id);
            //详情分页加载
            laypage({
                cont: $("#instanceTaskPage"),//dom，字符串id,jquery对象都可以
                pages: instanceDetailData.pages,//总页数
                curr:instanceDetailData.page,//表示当前页
                skip: true,//是否展示调整
                hash:"abcd",
                jump: function(obj, first){
                    //得到了当前页，用于向服务端请求对应数据
                    var curr = obj.curr;
                    //此处用于请求后台，加载数据
                    renderInstanceTaskDetails(curr);
                }
            });

        }else if(dataUrl=="2"){
            //调用job的接口
            /*  var index;
             var phoneUrl = ctxStatic+"threshold/getAllMonitorPhone";
             var ajaxTimeout = $.ajax({
             url:phoneUrl,
             method:'post',
             data:{},
             dataType:"json",
             async:false,
             timeout:6000,
             beforeSend:function () {
             index = layer.load(2, {
             shade: [0.5,'#000'] //0.1透明度的白色背景
             });
             },
             success:function (data) {
             //{"data":[{"ID":"1234","PHONE_NUMBER":"1222","PHONE_NAME":"ss2"}]}
             layer.close(index);
             var temp = [];
             $.each(data.data, function (i,v) {
             temp.push('<tr>' +
             ' <td><input type="hidden" value="'+v.ID+'">'+(i+1)+'</td>' +
             '<td><input placeholder="" name="username" autocomplete="off" value="'+ v.PHONE_NAME+'"  lay-verify="required|username"  readonly="readonly" class="no-border"/></td> ' +
             '<td><input placeholder="" name="phonenum" autocomplete="off" value="'+ v.PHONE_NUMBER+'" lay-verify="required|phoneNum" maxlength="11" readonly="readonly" class="no-border"/>' + '</td> ' +
             '<td><a> ' +
             '    <button  class="layui-btn layui-btn-normal layui-btn-small" lay-filter="editorPhone"><i class="layui-icon">&#xe642;</i>编辑</button>' +
             '    <button class="layui-btn layui-btn-danger  layui-btn-small" lay-filter="deletePhone"><i class="layui-icon">&#xe640;</i>删除</button> ' +
             '    <button class="layui-btn layui-btn-warm layui-btn-small" lay-submit="" lay-filter="savePhone"><i class="layui-icon">&#xe618;</i>保存</button>'+
             '   </a></td>' +
             '</tr>');
             })
             $("#phone").empty().append(temp.join(""));
             element.init();
             },
             error:function (xhr,error,status) {
             layer.msg("服务器请求出错");
             },
             complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
             if(status=='timeout'){//超时,status还有success,error等值的情况
             ajaxTimeout.abort();
             layer.msg("对不起，请求超时，请稍后访问");
             }
             },
             });*/
            var instanceDetailData= renderInstanceJobDetails(1,8,id);
            //详情分页加载
            laypage({
                cont: $("#instanceJobPage"),//dom，字符串id,jquery对象都可以
                pages: instanceDetailData.pages,//总页数
                curr:instanceDetailData.page,//表示当前页
                skip: true,//是否展示调整
                hash:"abcd",
                jump: function(obj, first){
                    //得到了当前页，用于向服务端请求对应数据
                    var curr = obj.curr;
                    //此处用于请求后台，加载数据
                    renderInstanceJobDetails(curr);
                }
            });
        }
    });
    $(".migu-tab li.layui-this").trigger("click");


    //渲染内容
    function rendeInstances(page,pageNum){
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
        var data = {data:[
            {id:"10049",processDefinition:"汇总流程",key:"",createTime:"May 22 2017 10:54 AM",endTime:"May 22 2017 10:54 AM	"},
            {id:"10035",processDefinition:"汇总流程11",key:"",createTime:"May 23 2017 10:54 AM",endTime:"May 23 2017 10:54 AM"},
            {id:"10028",processDefinition:"汇总流程2",key:"",createTime:"May 22 2017 10:54 AM",endTime:"May 22 2017 10:54 AM	"},
            {id:"10063",processDefinition:"汇总流程221",key:"",createTime:"May 23 2017 10:54 AM",endTime:"May 23 2017 10:54 AM	"}
           ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td>'+escapeHtml(v.key)+'</td>' +
                    '<td><a class="text-blue show-detail"  pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.processDefinition)+'</a></td>'+
                    '<td>'+escapeHtml(v.createTime)+'</td>' +
                    '<td>'+escapeHtml(v.endTime)+'</td>' +
                    '<td><a class="text-blue" id="'+escapeHtml(v.id)+'" title="点击查看流程图">查看节点</a></td>' +
                    '</tr>');
            });
            $("#instances").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }

    }
    //渲染task列表
    function renderInstanceTaskDetails(page,pageNum,id){
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
            {id:"work_migu:1:2515",name:"汇总流程",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"},
            {id:"work_migu:1:2510",name:"my-process",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"},
            {id:"2154",name:"test",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"},
            {id:"1524",name:"工作流测试",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"}
        ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td><a  class="text-blue" pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.name)+'</a>' +
                    '<td>'+escapeHtml(v.createTime)+'</td>' +
                    '<td>'+escapeHtml(v.endTime)+'</td>' +
                    '</tr>');
            });
            $("#instanceTaskDetails").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }
    }
    //渲染job列表
    function renderInstanceJobDetails(page,pageNum,id){
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
            {id:"1111",name:"汇总流程1",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"},
            {id:"1240",name:"my-proces2s",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"},
            {id:"1210",name:"test3",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"},
            {id:"1230",name:"工作流测试2",endTime:"May 22 2017 10:54 AM",createTime:"May 22 2017 10:54 AM"}
        ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td><a  class="text-blue" pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.name)+'</a>' +
                    '<td>'+escapeHtml(v.createTime)+'</td>' +
                    '<td>'+escapeHtml(v.endTime)+'</td>' +
                    '</tr>');
            });
            $("#instanceJobDetails").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }
    }

});
