(function(){
//	打开浏览器后登陆弹窗位置
	var login_width = $(".login_window")[0].clientWidth/2;
		var login_height = $(".login_window")[0].clientHeight/2;
		var Left = $("body")[0].clientWidth/2 - login_width;
		var Top = $("body")[0].clientHeight/2 - login_height;
		$(".login_window")[0].style.top = Top+"px";
		$(".login_window")[0].style.left = Left+"px";
		
	//改变浏览器尺寸大小后登陆弹窗位置
	window.onresize = function () {
		var login_width = $(".login_window")[0].clientWidth/2;
		var login_height = $(".login_window")[0].clientHeight/2;
		var Left = $("body")[0].clientWidth/2 - login_width;
		var Top = $("body")[0].clientHeight/2 - login_height;
		$(".login_window")[0].style.top = Top+"px";
		$(".login_window")[0].style.left = Left+"px";
	}
//	点击登录
	var oBtn = document.getElementById("btn");
	oBtn.onclick = function(){
		var userName = document.getElementById("userName");
		var passWord = document.getElementById("passWord");
		console.log(userName.value);
		console.log(passWord.value);
		$.ajax({
			type:"post",
			url:"192.168.2.58/dingfang/public/admin/login/doLogin",
			dataType: "json",
			data : {
				"userName" : userName.value,
				"password" : passWord.value,
			},
			success : function(res){
				console.log(res)
				window.location.href="html/index.html";
			},
			error : function(res){
				console.log(res)
				var err = document.getElementsByClassName("error")[0];
				
			}
		});
	}
})()
