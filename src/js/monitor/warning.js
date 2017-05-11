/**
 * Created by fengyang on 2017/4/28.
 */
/*引入相关文件*/
layui.use(['element','layer','util','form'],function() {
    //1.服务引入
    var element = layui.element(), layer = layui.layer,form =layui.form(),$ = layui.jquery;

    //2.模拟后台数据调用

    form.on('submit(editor)', function(data){
       $(data.elem).closest("td").prev().find("input").attr("readonly",false);
       $(data.elem).closest("td").prev().find("input").focus();
    });
  //阀值保存事件
    form.on('submit(save)', function(data){
        //往后台调用并进行验证

        layer.msg('保存成功');
    });

    //手机号码验证

});