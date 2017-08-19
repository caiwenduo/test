
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
	url:"http://192.168.2.144/dingfang/common/json/json.js",
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
//点击新增套餐
function newAdd(){
	var Str = '<div class="windows" id="windows">\
					<div class="BindingUnitBox">\
						<ul>\
							<li class="BindingUnitList">\
								<dl>\
									<dt></dt>\
									<dd></dd>\
								</dl>\
								<div class="confirm">✔</div>\
							</li>\
							<li class="BindingUnitList">\
								<dl>\
									<dt></dt>\
									<dd></dd>\
								</dl>\
								<div class="confirm">✔</div>\
							</li>\
						</ul>\
						<div class="closeWindows">×</div>\
					</div>\
				</div>';
	$('.content', window.parent.document).append(Str);
	$('.windows', window.parent.document).css("display","block");
	$(".closeWindows",window.parent.document).click(function(){
		$('.windows', window.parent.document).css("display","none");
		$(this).parent().parent().remove();
	});
}
//点击添加软装搭配方案
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
//点击右边的编辑
$(".SoftEdit").on("click",function(){
	$(".houseNamberBox").hide();
	var str = '<img src="http://192.168.2.144/dingfang/common/img/back.jpg" />';
	$(".HouseholdNav").find("p").hide();
	$(".HouseholdNav").append(str);
	var Str = '<div class="SoftEditBox">\
	<div class="houseNamberEditLeftBox">\
	<div class="big_imgBox box box-4">\
			<img src="http://192.168.2.144/dingfang/common/img/bg_img.jpg">\
			<dl class="ui-widget-content resizable1"><i class="hander"></i><img src="http://192.168.2.144/dingfang/common/img/test03.jpg" onDblClick="return Resize(this,10);return false;" onmousewheel="return resizeimg(this)"></dl>\
	</div>\
	<div class="pic_tittle">\
	<dl><dt><p><span>M户型</span>3房2厅2卫/客厅<span></span></p><p><span>默认套餐价 : </span><span>¥25800.00</span></p></dt>\
	<dd><div class="addGoodsBox">添加商品</div><div class="delPicBox"><img src="http://192.168.2.144/dingfang/common/img/del.jpg">删除</div><div class="reviseBox"><img src="http://192.168.2.144/dingfang/common/img/edit_C.jpg">修改</div><div class="importPicBox"><img src="http://192.168.2.144/dingfang/common/img/addImg.jpg">主图</div></dd>\
	</dl>\
	</div></div><div class="houseNamberEditRightBox">\
		<ul>\
			<li>\
				<dl>\
					<dt><h4>电视柜</h4><img src="http://192.168.2.144/dingfang/common/img/Edit.jpg"></dt>\
					<dd>\
						<ol>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test01.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test02.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
						</ol>\
					</dd>\
				</dl>\
			</li>\
			<li>\
				<dl>\
					<dt><h4>电视柜</h4><img src="http://192.168.2.144/dingfang/common/img/Edit.jpg"></dt>\
					<dd>\
						<ol>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test03.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test04.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test05.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test06.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
						</ol>\
					</dd>\
				</dl>\
			</li>\
			<li>\
				<dl>\
					<dt><h4>电视柜</h4><img src="http://192.168.2.144/dingfang/common/img/Edit.jpg"></dt>\
					<dd>\
						<ol>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test07.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test08.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test09.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
							<li>\
								<img src="http://192.168.2.144/dingfang/common/img/test05.jpg">\
								<p>宜家布艺转角沙发 多色可选</p>\
								<span>¥6800.00</span>\
							</li>\
						</ol>\
					</dd>\
				</dl>\
			</li>\
		</ul>\
	</div></div>'
	$(".houseNamberOuter").eq(0).append(Str);
//	点击返回按钮
	$(".HouseholdNav").find("img").on("click",function(){
		$(".houseNamberBox").show();
		$(this).remove();
		$(".HouseholdNav").find("p").show();
		$(".SoftEditBox").remove();
	})
//	拖拽图片
//	$('.box-4 dl').each(function(){
//		$(this).dragging({
//			move : 'both',
//			randomPosition : true
//		});
//	});
	$('.box-4 dl').each(function() {
		$(this).dragging({
			move: 'both',
			randomPosition: true,
			hander: '.hander'
		});
	});
//	拖拽右下角改变图片大小
	$(function() {

		$(".resizable1").resizable({

			aspectRatio: true //开启按比例缩放，也可以指定比例： 16 / 9

		});

	});
//	$(".rAdd").click(function(){
//		$(this).parent().css("transform","rotateY(50deg)")
//	})
//	$(".tAdd").click(function(){
//		$(this).parent().css("transform","rotateX(50deg)")
//	})
//	$(".lReduce").click(function(){
//		$(this).parent().css("transform","rotateY(-50deg)")
//	})
//	$(".bReduce").click(function(){
//		$(this).parent().css("transform","rotateX(-50deg)")
//	})
	$(".houseNamberEditRightBox dd img").click(function(){
    	$(".resizable1 img").attr("src",$(this).attr("src"));
    	$(".big_imgBox").append('<dl class="ui-widget-content resizable1"><i class="hander"></i><img src="http://192.168.2.144/dingfang/common/img/test03.jpg" onDblClick="return Resize(this,10);return false;" onmousewheel="return resizeimg(this)"></dl>')
	})
	
});
