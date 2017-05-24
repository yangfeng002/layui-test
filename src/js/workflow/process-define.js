/**
 * Created by fengyang on 2017/5/18.
 */
layui.use(['form','element','layer','laypage'], function () {
    var element = layui.element(), layer = layui.layer,$ = layui.jquery,laypage = layui.laypage;
    //页面初始化加载默认第一页
    var defineData =  renderDefinitions(1);
    //列表分页加载
    laypage({
        cont: $("#definePage"),//dom，字符串id,jquery对象都可以
        pages: defineData.pages,//总页数
        curr:defineData.page,//表示当前页
        skip: true,//是否展示调整
        hash:"abc",
        jump: function(obj, first){
            //得到了当前页，用于向服务端请求对应数据
            var curr = obj.curr;
            //此处用于请求后台，加载数据
            renderDefinitions(curr);
        }
    });
    var id;//定义的id参数
    //点击事件
    $(document).on("click",".show-detail", function () {
        $(".define-list").hide();
        $(".define-detail-list").show();
        id = $(this).attr("pid");
        $(".migu-tab li.layui-this").trigger("click");
    });
    $(document).on("click",".return-list", function () {
        $(".define-list").show();
        $(".define-detail-list").hide();
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
            var defineDetailData= renderDefineTaskDetails(1,8,id);
            //详情分页加载
            laypage({
                cont: $("#defineTaskPage"),//dom，字符串id,jquery对象都可以
                pages: defineDetailData.pages,//总页数
                curr:defineDetailData.page,//表示当前页
                skip: true,//是否展示调整
                hash:"abcd",
                jump: function(obj, first){
                    //得到了当前页，用于向服务端请求对应数据
                    var curr = obj.curr;
                    //此处用于请求后台，加载数据
                    renderDefineTaskDetails(curr);
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
            var defineDetailData= renderDefineJobDetails(1,8,id);
            //详情分页加载
            laypage({
                cont: $("#defineJobPage"),//dom，字符串id,jquery对象都可以
                pages: defineDetailData.pages,//总页数
                curr:defineDetailData.page,//表示当前页
                skip: true,//是否展示调整
                hash:"abcd",
                jump: function(obj, first){
                    //得到了当前页，用于向服务端请求对应数据
                    var curr = obj.curr;
                    //此处用于请求后台，加载数据
                    renderDefineJobDetails(curr);
                }
            });
        }
    });
    $(".migu-tab li.layui-this").trigger("click");

    //渲染内容列表
    function renderDefinitions(page,pageNum){
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
            {id:"10049",name:"汇总流程",version:"1",key:"",tenant:""},
            {id:"10025",name:"工作流测试",version:"1",key:"",tenant:""},
            {id:"10029",name:"timer-boundary-event-cancel",version:"1",key:"",tenant:""},
            {id:"10046",name:"leave-dynamic-from:1:10046",version:"1",key:"",tenant:""},
            {id:"10024",name:"leave-dynamic-from:1:10024",version:"1",key:"",tenant:""},
            {id:"10031",name:"leave-dynamic-from:1:10031",version:"1",key:"",tenant:""}
        ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td><a class="text-blue show-detail"  pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.name)+'</a></td>'+
                    '<td>'+escapeHtml(v.version)+'</td>' +
                    '<td>'+escapeHtml(v.key)+'</td>' +
                    '<td>'+escapeHtml(v.tenant)+'</td>' +
                    '<td>' +
                    '<button class="layui-btn layui-btn-small layui-btn-normal" lay-filter="deleteProcess"><i class="layui-icon">&#xe623;</i>启动</button>' +
                    '<button class="layui-btn layui-btn-small layui-btn-warm" lay-filter="showProcess"><i class="layui-icon">&#xe64a;</i>查看流程图</button>' +
                    '</td>' +
                    '</tr>');
            });
            $("#definitions").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }

    }
    //渲染task列表
    function renderDefineTaskDetails(page,pageNum,id){
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
            {id:"work_migu:1:2515",name:"汇总流程",status:"active",createTime:"2017-5-23"},
            {id:"work_migu:1:2515",name:"my-process",status:"active",createTime:"2017-5-22"},
            {id:"work_migu:1:2515",name:"test",status:"active",createTime:"2017-5-22"},
            {id:"work_migu:1:2515",name:"工作流测试",status:"active",createTime:"2017-5-22"}
        ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td><a  class="text-blue" pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.name)+'</a>' +
                    '<td>'+escapeHtml(v.status)+'</td>' +
                    '<td>'+escapeHtml(v.createTime)+'</td>' +
                    '</tr>');
            });
            $("#defineTaskDetails").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }
    }
    //渲染job列表
    function renderDefineJobDetails(page,pageNum,id){
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
            {id:"work_migu:1:2515",name:"汇总流程11",status:"active",createTime:"2017-5-23"},
            {id:"work_migu",name:"my144",status:"active",createTime:"2017-5-22"},
            {id:"1532",name:"test",status:"active",createTime:"2017-5-22"},
            {id:"1524",name:"工作流测试",status:"active",createTime:"2017-5-22"}
        ],pages:1,page:1};
        var temp = [];
        if(data.data &&data.data.length>0){
            //拼接字符串
            $.each(data.data, function (i,v) {
                temp.push('<tr>' +
                    '<td>'+ escapeHtml(v.id)+'</td>' +
                    '<td><a  class="text-blue" pid="'+escapeHtml(v.id)+'" title="详情列表">'+escapeHtml(v.name)+'</a>' +
                    '<td>'+escapeHtml(v.status)+'</td>' +
                    '<td>'+escapeHtml(v.createTime)+'</td>' +
                    '</tr>');
            });
            $("#defineJobDetails").empty().append(temp.join(""));
            element.init();
            var result = {pages:data.pages,page:data.page};
            return result;
        }
    }

});
