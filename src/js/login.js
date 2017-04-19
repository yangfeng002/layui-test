/**
 * Created by fengyang on 2017/4/19.
 */
/*layui引入需要使用的模块*/
layui.use(['layer','form'], function(){
    var layer = layui.layer;
    var form = layui.form();
    var $ = layui.jquery;
    $(function(){
        $('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
        $(window).resize(function(){
            $('.loginbox').css({'position':'absolute','left':($(window).width()-692)/2});
        });
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
        pass:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ]
    });
    //登录事件提交
    form.on('submit(login)', function(data){
        layer.msg('登录成功');
        window.location.href= "http://localhost:63342/layui-test/src/index.html";
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
});


// Cloud Float...
/*
var $main = $cloud = mainwidth = null;
var offset1 = 450;
var offset2 = 0;

var offsetbg = 0;

$(document).ready(function () {
        $body = $("body");//body对象
        $main = $("#mainBody");//云彩外部div
        $cloud1 = $("#cloud1");//云彩1
        $cloud2 = $("#cloud2");//云彩2
        mainwidth = $main.outerWidth();
    }
);

//
setInterval(function flutter() {
    if (offset1 >= mainwidth) {
        offset1 =  -580;
    }

    if (offset2 >= mainwidth) {
        offset2 =  -580;
    }
    offset1 += 1.1;
    offset2 += 1;
    $cloud1.css("background-position", offset1 + "px 100px");//云彩1位置移动
    $cloud2.css("background-position", offset2 + "px 460px");//云彩2位置移动
}, 70);

setInterval(function bg() {
    if (offsetbg >= mainwidth) {
        offsetbg =  -580;
    }
    offsetbg += 0.9;
    $body.css("background-position", -offsetbg + "px 0")
}, 90);
*/
