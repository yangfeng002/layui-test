/**
 * Created by fengyang on 2017/4/19.
 */
/*layui引入需要使用的模块*/
layui.use(['layer','form'], function() {
    var layer = layui.layer;
    var form = layui.form();
    var $ = layui.jquery;
    $(function () {
        //登录页面距离顶部的高度
        var height = window.innerHeight;//浏览器的可用高度
        $(".login-box").css("top",(height)/4);

        //忘记密码点击事件
        $("#forgot-password").on("click", function () {
            $("#login-form").slideUp();
            $("#forgot-password-form").slideDown();
        });
        //返回登录按钮点击事件
        $("#go-back-login").on("click", function () {
            $("#login-form").slideDown();
            $("#forgot-password-form").slideUp();
        });

    });
    //自定义校验规则(该框架内置了几款校验的)
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });
    //登录事件提交
    form.on('submit(login)', function (data) {
        layer.msg('登录成功');
        window.location.href = "http://localhost:63342/layui-test/src/index.html";
        /* $.ajax({
         url:"index.html",
         type:"post",
         data:JSON.stringify(data.field),
         //dataType: "json",
         success:function (result){
         layer.msg("登录成功");
         },
         error:function () {
         layer.msg("登录失败");
         }
         });*/

    });
    //找回密码事件提交
    form.on('submit(retrieve-password)', function (data) {
        layer.msg("找回密码成功");
        console.log(data);
        return false;
    })
})