var val = sessionStorage.getItem("MarketChoice"); 
//		第一条导航tab切换
var HouseholdNavUl = document.getElementsByClassName("HouseholdNavUl")[0];
var oLi = HouseholdNavUl.getElementsByTagName("li");
var houseNamberOuter = document.getElementsByClassName("houseNamberOuter");
for(var i=0;i<oLi.length;i++){
	oLi[i].index = i;
	oLi[0].style.background = "#FFF";
	houseNamberOuter[0].style.display = "block";
	oLi[i].onclick = function(){
		for(var j=0;j<houseNamberOuter.length;j++){
			oLi[j].style.background = "#DDD";
			houseNamberOuter[j].style.display = "none";
		}
		this.style.background = "#FFF";
		houseNamberOuter[this.index].style.display = "block";
	}
}
$.ajax({
	type:"get",
	url:"../json/json.js",
	success : function(res){
		var Res = eval(res);
		var str = "";
		for(var i=0;i<Res.length;i++){
			str +='<li class="main">\
						<img src="'+Res[i].url+'" class="imgPeople"/>\
						<h3 class="tittle">'+Res[i].tittle+'</h3>\
						<p class="brand">品牌 : '+Res[i].brand+'</p>\
						<del class="faclity">功能空间 : '+Res[i].faclity+'</del>\
						<span class="plan">方案 : '+Res[i].plan+'</span>\
						<div class="ModifyDelete">\
							<span><img src="http://192.168.2.144/dingfang/common/img/QQ.jpg" class="modifyImg"/>修改</span>\
							<span><img src="http://192.168.2.144/dingfang/common/img/QQ.jpg" class="delete" />删除</span>\
						<div>\
				</li>';
		}
		$(".goodsList").append(str);
	}
});
//点击新增方案
function newAdd(){
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/stuff/getScheme/",
		async:true,
		data : {
			"projectNumber" : val,//楼盘id
		},
		success : function(res){
			var Res =JSON.parse(res);
			console.log(Res)
				var Str = '<div class="windows" id="windows">'
					+'<div class="BindingUnitBox">'
						+'<ul>';
				for(var i=0;i<Res.data.length;i++){
					Str += '<li class="BindingUnitList">'
								+'<dl>'
									+'<dt>'
										+'<img src="'+Res.data[i].pic_url+'" />'
									+'</dt>'
									+'<dd>'
										+'<p>'+Res.data[i].name+''+Res.data[i].values+'</p>'
										+'<p>'+Res.data[i].designer+'</p>'
									+'</dd>'
								+'</dl>'
								+'<div class="confirm">✔</div>'
							+'</li>'
				}		
					Str += '</ul>'
						+'<div class="closeWindows">×</div>'
					+'</div>'
				+'</div>';
				$('.content', window.parent.document).append(Str);
		}
	}).done(function(){
		$('.windows', window.parent.document).css("display","block");
		$(".closeWindows",window.parent.document).click(function(){
			$('.windows', window.parent.document).css("display","none");
			$(this).parent().parent().remove();
		});
	})

	
	
}
//点击添加材料
$(".leftBoxContentBtn").on("click",function(){
	var Str = '<div class="windows" id="windows">\
					<div class="BindingUnitBox">\
						<ol>\
							<li class="BindingUnitList" style="width: 1100px;height: 50px;border-bottom: 1px solid #DDD;padding: 15px 0 15px 0;">\
								<img width="50px" height="50px" style="float: left;border: 0;" src="http://192.168.2.144/dingfang/common/img/user_img.jpg">\
								<span style="float: left;margin: 10px 0 0 10px;">欧玲水槽304全不锈钢双槽水槽</span>\
								<div class="confirm" style="float: right;width: 21px;height: 21px;background: #aaa;border-radius: 50%;float: right;margin:10px 8px 0 0;cursor: pointer;text-align: center;line-height: 21px;color: #FFF;font-family: "bodoni mt";font-weight: 600;">✔</div>\
							</li>\
						</ol>\
						<div class="closeWindows" style="position: absolute;top: -8px;right:-8px;">×</div>\
					</div>\
				</div>';
	$('.content', window.parent.document).append(Str);
	$('.windows', window.parent.document).css("display","block");
	$(".closeWindows",window.parent.document).click(function(){
		$('.windows', window.parent.document).css("display","none");
		$(this).parent().parent().remove();
	});
})