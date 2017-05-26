/**
 * Created by fengyang on 2017/4/19.
 */
/*layui引入需要使用的模块*/
layui.use(['layer','form'], function() {
    var layer = layui.layer;
    var form = layui.form();
    var $ = layui.jquery;
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
    //返回登录页面
    $("#to-login").on("click", function () {
        $("#retrievePass").slideUp();
        $("#login-form").slideDown();
        location.reload();
    });
    //自定义校验规则(该框架内置了几款校验的)
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        identical: function(value, item) { //value：表单的值、item：表单的DOM对象
            console.log(item);
            var newPass = $("#newPass").val();
            if (value!==newPass) {
                return '两次输入的密码不一致，请重新输入';
            }
        },
        phoneNum: function (value,item) {
            //value表示输入的值，item：表单的DOM对象(移动的手机号段 139、138、137、136、135、134、159、150、151、158、157、188、187、152、182、147)
            var reg = /^(139|138|137|136|135|134|159|150|151|158|157|188|187|152|182|147)\d{8}$/;
            if(!reg.test(value)){
                return "请输入合法的移动手机号码";
            }
        },

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
    //找回密码事件进入下一步
    form.on('submit(confirm)', function (data) {
        //请求验证码，发送短信并请求验证码
        $("#forgot-password-form").slideUp();
        $("#retrievePass").slideDown();
        return false;
    });
    //进入找回密码第二步
    form.on('submit(retrieve-password)', function (data) {
        //输入新密码,后台请求，根据后台返回的消息看是否找回密码成功
        $("#retrievePass").slideUp();
        $("#login-form").slideDown();
        location.reload();
    });
    form.on('submit(getphoneMsg)', function (data) {
        settime($(this));
    });
    var countdown=60;
    function settime(obj) {
        if (countdown == 0) {
            obj.prop("disabled");
            obj.html("免费获取验证码");
            countdown = 60;
            return;
        } else {
            obj.prop("disabled", true);
            obj.html("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
                settime(obj) }
            ,1000)
    }
});