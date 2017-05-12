/**
 * Created by fengyang on 2017/4/28.
 */
/*引入相关文件*/
layui.use(['element','layer','util','form'],function() {
    //1.服务引入
    var element = layui.element(), layer = layui.layer,form =layui.form(),$ = layui.jquery;
    //自定义验证规则
    form.verify({
        heartbeatValue: function (value, item) {
            if(value>99 || value<1){
                return "您输入的数据有误，请设置1-99之间的值";
            }
        },
        jvmValue:function (value, item) {
            if(value>90 || value<10){
                return "您输入的数据有误，请设置10-90之间的值";
            }
        },
        jvm2Value:function (value, item) {
            if(value>90 || value<10){
                return "您输入的数据有误，请设置10-90之间的值";
            }
        },
        phoneNum: function (value,item) {
            //value表示输入的值，item：表单的DOM对象(移动的手机号段 139、138、137、136、135、134、159、150、151、158、157、188、187、152、182、147)
            var reg = /^(139|138|137|136|135|134|159|150|151|158|157|188|187|152|182|147)\d{8}$/;
            if(!reg.test(value)){
              return "请输入合法的移动手机号码";
            }
        }
    });
    //2.模拟后台数据调用
    var data = {result:[{name:"心跳",thresholdValue:"20"},{name:"jvm使用占比（%）",thresholdValue:"80"},{name:"jvm使用资源（%）",thresholdValue:"90"}]};
    var temp = [];
    var interval = '';
    $.each(data.result, function (i,v) {
        if(i==0){
            interval = 'required|number|heartbeatValue';
        }else if(i==1){
            interval = "required|number|jvmValue";
        }else{
            interval = "required|number|jvm2Value";
        }
        temp.push('<tr><td>'+(i+1)+'</td><td>'+ v.name+'</td>' +
            '         <td><input placeholder="请输入心跳信息" name="" lay-verify=" '+interval+'" value="'+v.thresholdValue+'" readonly="readonly" class="no-border"></td>' +
            '         <td><a><button  class="layui-btn layui-btn-small" lay-submit=""  lay-filter="editor"><i class="layui-icon">&#xe642;</i>编辑</button>' +
            '                <button class="layui-btn layui-btn-small layui-btn-warm" lay-submit="" lay-filter="save"><i class="layui-icon">&#xe618;</i>保存</button> ' +
            '            </a>' +
            '         </td>' +
            '    </tr>');
    });
    $("#threshold").empty().append(temp.join(""));
    form.on('submit(editor)', function(data){
       $(data.elem).closest("td").prev().find("input").attr("readonly",false);
       $(data.elem).closest("td").prev().find("input").focus();
    });
  //阀值保存事件
    form.on('submit(save)', function(data){
        //往后台调用并进行验证
        $(data.elem).closest("td").prev().find("input").attr("readonly",true);
        layer.msg('保存成功');
    });

    //3.手机号码设置页面
    var data = {result:[{username:"张三",num:"15123456789"},{username:"李四",num:"15103456789"}]};
    temp = [];
    $.each(data.result, function (i,v) {
        temp.push('<tr>' +
                   ' <td>'+(i+1)+'</td>' +
                    '<td><input placeholder="" name="username" autocomplete="off" value="'+ v.username+'"  lay-verify="required"  readonly="readonly" class="no-border"/></td> ' +
                    '<td><input placeholder="" name="phonenum" autocomplete="off" value="'+ v.num+'" lay-verify="required|phoneNum" maxlength="11" readonly="readonly" class="no-border"/>' + '</td> ' +
                    '<td><a> ' +
                    '    <button  class="layui-btn layui-btn-normal layui-btn-small" lay-submit="" lay-filter="editorPhone"><i class="layui-icon">&#xe642;</i>编辑</button>' +
                    '    <button class="layui-btn layui-btn-danger  layui-btn-small" lay-filter="deletePhone"><i class="layui-icon">&#xe640;</i>删除</button> ' +
                    '   </a></td>' +
                  '</tr>');
    })
    $("#phone").empty().append(temp.join(""));
    //手机号和名字编辑功能
    form.on('submit(editorPhone)', function (data) {
        var dom = $(data.elem).closest("tr").find("input");
        $.each(dom, function (i,v) {
            $(this).attr("readonly",false) ;
            if(i==0){
                $(this).focus();
            }
        });

       // $(data.elem).closest("td").prev().find("input").focus();
    });

    //手机号码删除功能
    $(document).on("click","button[lay-filter='deletePhone']", function () {
        //判断是否为最后一个，如果为最后一个那么就不能删除（提示信息），如果不为最后一个那么也提示是否要删除
        var $this = $(this);
        if($("#phone").find("tr").length==1){
            layer.alert("至少要保留一个手机号码！");
        }else{
            var index = layer.confirm('您确定要删除吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                //执行删除操作
                $this.closest("tr").remove();
                layer.closeAll();
            }, function(){
               //取消操作
            });
        }

    });
    //添加功能
    $("button[lay-filter='addPhone']").on("click", function(){
       //添加一行，需要判断td有多少行，如果超过10行，那么就不允许添加了。
      if($("#phone").find("tr").length<9) {
          var temp = [];
          var num =$("#phone").find("tr").length;
          temp.push('<tr>' +
              ' <td>'+(1+num)+'</td>' +
              '<td><input placeholder="" autocomplete="off" name="username" lay-verify="required" value=""  class="no-border"/></td> ' +
              '<td><input placeholder="" autocomplete="off" name="phonenum" maxlength="11" value="" lay-verify="required|phoneNum" class="no-border"/>' + '</td> ' +
              '<td><a> ' +
              '    <button  class="layui-btn layui-btn-normal layui-btn-small" lay-submit="" lay-filter="editorPhone"><i class="layui-icon">&#xe642;</i>编辑</button>' +
              '    <button class="layui-btn layui-btn-danger  layui-btn-small" lay-filter="deletePhone"><i class="layui-icon">&#xe640;</i>删除</button> ' +
              '   </a></td>' +
              '</tr>');
          $("#phone").append(temp.join(""));
      }else{
          layer.alert("不好意思，最多只能添加8行！");
      }
    });
    //保存功能
    form.on('submit(savePhone)', function(data){
        //往后台调用并进行验证
        var dom = $("#phone").find("input");
        $.each(dom, function (i,v) {
            $(this).attr("readonly",true);
            if(i==dom.length-1){
                layer.msg('保存成功');
            }
        });

    });
});