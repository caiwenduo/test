//内容区滚动条
$(".content_3").mCustomScrollbar({

	scrollInertia:600,

	autoDraggerLength:false

});
//首页ajax获取信息
var val = sessionStorage.getItem("MarketChoice");
$.ajax({
	type:"post",
	url:"http://192.168.2.144/dingfang/public/admin/workbench",
	async:true,
	data : {
		"projectNumber" : val,
	},
	success : function(res){
		var Res = JSON.parse(res);
		$(".newOrders").html(Res.data.countOrder);//认购订单
		$(".newBuilder").html(Res.data.countBuildLog);//施工日志
		var strLookHouse = '';
		var lookHouse = Res.data.seeHouse;
		for(var i=0;i<lookHouse.length;i++){//看房预约
			strLookHouse +='<li>\
							<img src="'+lookHouse[i].head_pic+'"/>\
							<span>'+lookHouse[i].name+'</span>\
							<span>'+lookHouse[i].phone+'</span>\
							<span>'+lookHouse[i].appointed_time+'</span>\
							<span>'+lookHouse[i].memo+'</span>\
						</li>'
		}
		$(".lookHouseList").html(strLookHouse);
		var strOrders = '';
		var allOrders = Res.data.order;
		for(var i=0;i<allOrders.length;i++){ //装修订单
			strOrders += '<li>\
						<div>\
							<p>订单编号&nbsp;:&nbsp;'+allOrders[i].order_code+'</p>\
							<p>订单用户&nbsp;:&nbsp;'+allOrders[i].build_name+'号楼'+allOrders[i].unit_id+'单元'+allOrders[i].home_name+'室 '+allOrders[i].user_name+'</p>\
							<p>合计订单金额&nbsp;:&nbsp;<span>'+allOrders[i].total_money+'</span></p>\
						</div>\
						<div>\
							<p>装修方案&nbsp;:<span>&nbsp;'+allOrders[i].area+'方&nbsp;'+allOrders[i].house_name+'户型&nbsp;'+allOrders[i].scheme_name+'方案&nbsp;'+allOrders[i].vaules+'</span></p>\
							<p>材料升级&nbsp;:&nbsp;<span>'+allOrders[i].stuff_count+'项</span> &nbsp;金额:&nbsp;<span>'+allOrders[i].stuff_money+'</span></p>\
							<p>软装搭配&nbsp;:&nbsp;<span>'+allOrders[i].soft_outfit_count+'项</span> &nbsp;金额:&nbsp;<span>'+allOrders[i].soft_outfit_money+'</span></p>\
						</div>\
						<div>></div>\
					</li>';
		}
		$(".allOrdersList").html(strOrders);
		$(".announcement").html(Res.data.countOwnerNews);//业主公告维护
		$(".houseDynamic").html(Res.data.countProjectNews);//楼盘动态
	},
	error : function(res){
		console.log(res);
	}
});
//销售统计
function salesStatistics(){
	$("body").children("div").hide();
	str = '<div class="salesStatisticsOuter">\
				<div class="salesStatisticsNavOuter">\
					<div class="salesStatisticsNav">\
						<ul>\
							<li onclick="newPengingOrder()">待处理订单</li>\
							<li onclick="newAnyOrder()">订单管理</li>\
						</ul>\
						<div class="reorder">\
							<img width="15px" height="15px" src="http://192.168.2.144/dingfang/common/img/RT_06.jpg"/>按户号排序\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="ListOuter">\
				<ol class="PendingOrderList">\
					<li>\
						<div class="PendingOrderListLeftOuter">\
							<dl>\
								<dt><img src="img/1.jpg"/></dt>\
								<dd>\
									<p>3号楼2单元401室</p>\
									<span>赵亚萍 - 女士</span>\
								</dd>\
							</dl>\
						</div>\
						<div class="PendingOrderListCenterOuter">\
							<p>订单编号 : 2017021200135</p>\
							<p>装修方案 : <span>89方 M户型 C方案 时尚北欧风格</span></p>\
							<div class="center_bottomBox">\
								<p>材料升级 : <span>5项</span>金额 : <span>21500.00</span></p>\
								<p>软装搭配 : <span>5项</span>金额 : <span>58800.00</span></p>\
								<p>合计订单金额 : <span>815800.00</span></p>\
							</div>\
						</div>\
						<div class="PendingOrderListRightOuter">\
							<dl>\
								<dt>\
									<img src="img/1.jpg"/>订单详情\
								</dt>\
								<dd>\
									<p>✔</p>\
								</dd>\
							</dl>\
						</div>\
					</li>\
					<li></li>\
					<li></li>\
					<li></li>\
					<li></li>\
				</ol>\
			</div>'
	$("body").append(str);
//	点击切换子页面   点击切换子页面  点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面 
			$(".salesStatisticsNav li").eq(0).css("background","#FFF");
			$(".salesStatisticsNav li").eq(0).siblings().css("background","#CCC");
			$(".salesStatisticsNav li").click(function(){
				$(this).css("background","#FFF");
				$(this).siblings().css("background","#CCC");
			})
			
}
//  待处理订单 待处理订单 字符串拼接
function newPengingOrder(){
	var str =   '<ol class="PendingOrderList">\
					<li>\
						<div class="PendingOrderListLeftOuter">\
							<dl>\
								<dt><img src="http://192.168.2.144/dingfang/common/img/user_img.jpg"/></dt>\
								<dd>\
									<p>3号楼2单元401室</p>\
									<span>赵亚萍 - 女士</span>\
								</dd>\
							</dl>\
						</div>\
						<div class="PendingOrderListCenterOuter">\
							<p>订单编号 : 2017021200135</p>\
							<p>装修方案 : <span>89方 M户型 C方案 时尚北欧风格</span></p>\
							<div class="center_bottomBox">\
								<p>材料升级 : <span>5项</span>金额 : <span>21500.00</span></p>\
								<p>软装搭配 : <span>5项</span>金额 : <span>58800.00</span></p>\
								<p>合计订单金额 : <span>815800.00</span></p>\
							</div>\
						</div>\
						<div class="PendingOrderListRightOuter">\
							<dl>\
								<dt>\
									<img src="http://192.168.2.144/dingfang/common/img/Rt_05.jpg"/>订单详情\
								</dt>\
								<dd>\
									<p>✔</p>\
								</dd>\
							</dl>\
						</div>\
					</li>\
					<li></li>\
					<li></li>\
					<li></li>\
					<li></li>\
				</ol>'
	$(".ListOuter").html(str)
}
//  全部订单 全部订单 字符串拼接
function newAnyOrder(){
	
}
function dataAuditing(){
	$("body").children("div").hide();
	var str = '<div class="dataAuditingOuter">\
				<div class="dataAuditingNavOuter">\
					<div class="dataAuditingNav">\
						<ul>\
							<li onclick="newCheckPenging()">待审核</li>\
							<li onclick="checked()">已审核</li>\
						</ul>\
						<img src="http://192.168.2.144/dingfang/common/img/back.jpg" />\
					</div>\
				</div>\
			</div>\
			<div class="ListOuter">\
			</div>'
	$("body").append(str);
	$(".dataAuditingNav img").click(function(){
		$("body").find(".dataAuditingOuter").remove();
		$("body").find(".ListOuter").remove();
		$("body").children("div").show();
	})
//	点击切换子页面   点击切换子页面  点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面 
		$(".dataAuditingNav li").eq(0).css("background","#FFF");
		$(".dataAuditingNav li").eq(0).siblings().css("background","#CCC");
		$(".dataAuditingNav li").click(function(){
			$(this).css("background","#FFF");
			$(this).siblings().css("background","#CCC");
		})
	newCheckPenging();	
}
//资料审核里的待审核 字符串拼接
function newCheckPenging(){
	var str = '<ul class="checkPenging">\
				<li>\
					<dl>\
						<dt><img src="http://192.168.2.144/dingfang/common/img/houseImg.jpg"/></dt>\
						<dd>\
							<h3>M户型 3房2厅2卫生</h3>\
							<div><p>软装搭配 ( 5 )</p><p><span>2</span>条待审核</p></div>\
							<div><p>软装搭配 ( 5 )</p><p><span>2</span>条待审核</p></div>\
						</dd>\
					</dl>\
				</li>\
				<li>\
					<dl>\
						<dt><img src="http://192.168.2.144/dingfang/common/img/houseImg.jpg"/></dt>\
						<dd>\
							<h3>M户型 3房2厅2卫生</h3>\
							<div><p>软装搭配 ( 5 )</p><p><span>2</span>条待审核</p></div>\
							<div><p>软装搭配 ( 5 )</p><p><span>2</span>条待审核</p></div>\
						</dd>\
					</dl>\
				</li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
			</ul>'
	$(".ListOuter").html(str)
}
//资料审核里的已审核 字符串拼接
function checked(){
	var str = '<ul class="checked checkPenging">\
				<li>\
					<dl>\
						<dt><img src="http://192.168.2.144/dingfang/common/img/houseImg.jpg"/></dt>\
						<dd>\
							<h3>M户型 3房2厅2卫生</h3>\
							<div><p>软装搭配 ( 5 )</p></div>\
							<div><p>软装搭配 ( 5 )</p></div>\
						</dd>\
					</dl>\
				</li>\
				<li>\
					<dl>\
						<dt><img src="http://192.168.2.144/dingfang/common/img/houseImg.jpg"/></dt>\
						<dd>\
							<h3>M户型 3房2厅2卫生</h3>\
							<div><p>软装搭配 ( 5 )</p></div>\
							<div><p>软装搭配 ( 5 )</p></div>\
						</dd>\
					</dl>\
				</li>\
				<li>\
					<dl>\
						<dt><img src="http://192.168.2.144/dingfang/common/img/houseImg.jpg"/></dt>\
						<dd>\
							<h3>M户型 3房2厅2卫生</h3>\
							<div><p>软装搭配 ( 5 )</p></div>\
							<div><p>软装搭配 ( 5 )</p></div>\
						</dd>\
					</dl>\
				</li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
				<li></li>\
			</ul>'
	$(".ListOuter").html(str)
}
//主页的施工日志内容页面
function builderDiary(){
	$("body").children("div").hide();
	var str = '<div class="builderDiaryOuter">\
				<div class="builderDiaryNavOuter">\
					<div class="builderDiaryNav">\
						<ul class="builderDiaryNavList">\
							<li onclick="newCivilConstruction()">土建施工</li>\
							<li onclick="newDecorationConstruction()">装修施工</li>\
						</ul>\
						<img src="http://192.168.2.144/dingfang/common/img/back.jpg" />\
					</div>\
				</div>\
				<div class="ListOuter">\
				</div>\
			</div>'
	$("body").append(str);
	$(".builderDiaryNav img").click(function(){
		$("body").find(".builderDiaryOuter").remove();
		$("body").children("div").show();
	})
//	点击切换子页面   点击切换子页面  点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面 
		$(".builderDiaryNav li").eq(0).css("background","#FFF");
		$(".builderDiaryNav li").eq(0).siblings().css("background","#CCC");
		$(".builderDiaryNav li").click(function(){
			$(this).css("background","#FFF");
			$(this).siblings().css("background","#CCC");
		})
	newCivilConstruction();	//土建施工内容
}
//土建施工内容
function newCivilConstruction(){
			var str = '<div class="serveOuter">\
					<ul class="listNav">\
						<li><p>地基与基础工程<span>></span></p>\
							<div class="select">\
								<span>地基与基础工程</span>\
								<span>地基与基础工程</span>\
								<span>地基与基础工程</span>\
							</div>\
						</li>\
						<li><p>主体结构工程<span>></span></p>\
							<div class="select">\
								<span>地基与基础工程</span>\
							</div>\
						</li>\
						<li><p>水电安装工程<span>></span></p>\
							<div class="select">\
								<span>地基与基础工程</span>\
								<span>地基与基础工程</span>\
							</div>\
						</li>\
						<li><p>装饰工程<span>></span></p>\
							<div class="select">\
								<span>地基与基础工程</span>\
							</div>\
						</li>\
						<li><p>屋面工程<span>></span></p>\
							<div class="select">\
								<span>地基与基础工程</span>\
								<span>地基与基础工程</span>\
							</div>\
						</li>\
						<li><p>防水工程<span>></span></p>\
							<div class="select">\
							</div>\
						</li>\
						<li><p>现场安全保证措施<span>></span></p>\
							<div class="select">\
								<span>地基与基础工程</span>\
								<span>地基与基础工程</span>\
							</div>\
						</li>\
						<li><p>资料管理<span>></span></p>\
							<div class="select">\
								<span>地基与基础工程</span>\
								<span>地基与基础工程</span>\
							</div>\
						</li>\
					</ul>\
					<div class="listMain">\
						<ol>\
							<li>\
								<div class="ListMainTittle">\
									砌筑与墙体施工<div>></div>\
								</div>\
								<div class="ListMainList">\
									<ul>\
										<li>\
											<div class="ListMainList_time">2016-12-24 14:34<p>由 老葛 提交</p></div>\
											<div class="ListMainList_img">\
												<img src="http://192.168.2.144/dingfang/common/img/test01.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test02.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test03.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test04.jpg"/>\
												<img src="http://192.168.2.144/dingfang/common/img/test05.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test06.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test07.jpg"/><img src="img/http://192.168.2.144/dingfang/common/img/test08.jpg"/>\
											</div>\
											<div class="ListMainList_main">\
												高大模板支撑系统是指建设工程施工现场混泥土构建模板，支撑高度超过8米，或搭建跨度超过18米，或施工总载大于 15kN/m²，或集中线荷载大于20kN/m²，的模板支撑系统 <span>( 魔板搭建完毕 )</span>\
											</div>\
										</li>\
										<li>\
											<div class="ListMainList_time">2016-12-24 14:34<p>由 老葛 提交</p></div>\
											<div class="ListMainList_img">\
												<img src="http://192.168.2.144/dingfang/common/img/test01.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test02.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test03.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test04.jpg"/>\
											</div>\
											<div class="ListMainList_main">\
												高大模板支撑系统是指建设工程施工现场混泥土构建模板，支撑高度超过8米，或搭建跨度超过18米，或施工总载大于 15kN/m²，或集中线荷载大于20kN/m²，的模板支撑系统 <span>( 魔板搭建完毕 )</span>\
											</div>\
										</li>\
									</ul>\
								</div>\
							</li>\
							<li>\
								<div class="ListMainTittle">\
									模板工程<div>></div>\
								</div>\
							</li>\
							<li>\
								<div class="ListMainTittle">\
									钢筋工程<div>></div>\
								</div>\
							</li>\
							<li>\
								<div class="ListMainTittle">\
									混泥土工程<div>></div>\
								</div>\
								<div class="ListMainList">\
									<ul>\
										<li>\
											<div class="ListMainList_time">2016-12-24 14:34<p>由 老葛 提交</p></div>\
											<div class="ListMainList_img">\
												<img src="http://192.168.2.144/dingfang/common/img/test01.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test02.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test03.jpg"/><img src="http://192.168.2.144/dingfang/common/img/test04.jpg"/>\
											</div>\
											<div class="ListMainList_main">\
												高大模板支撑系统是指建设工程施工现场混泥土构建模板，支撑高度超过8米，或搭建跨度超过18米，或施工总载大于 15kN/m²，或集中线荷载大于20kN/m²，的模板支撑系统 <span>( 魔板搭建完毕 )</span>\
											</div>\
										</li>\
									</ul>\
								</div>\
							</li>\
						</ol>\
					</div>\
				</div>'
			$(".ListOuter").html(str);
//		控制左边下拉菜单
			$(".select").hide();
			$(".listNav li p span").click(function(){
				$(".listNav li p span").each(function(){
					$(this).css({"transform":"rotateZ(0deg)","transition":"1s"});
					$(this).parent().next(".select").hide(500);
				})
				$(this).css({"transform":"rotateZ(90deg)","transition":"1s"})
				$(this).parent().next(".select").show(500);
			})
//		控制右边下拉菜单			
			$(".ListMainList").hide()
			$(".ListMainTittle div").click(function(){
				
				$(".ListMainTittle div").each(function(){
					$(this).css({"transform":"rotateZ(0deg)","transition":"1s"});
					$(this).parent().next(".ListMainList").hide(500);
				})
				$(this).css({"transform":"rotateZ(90deg)","transition":"1s"});
				$(this).parent().next(".ListMainList").show(500);
			})	
}
//施工日志里面的装修施工内容
function newDecorationConstruction(){
	var str = '<div class="serveOuter">\
					<div class="decConLeftOuter">\
						<select class="decConLeftSelect" name="">\
							<option value="">选择楼号</option>\
							<option value="">#1</option>\
							<option value="">#2</option>\
							<option value="">#3</option>\
							<option value="">#4</option>\
						</select>\
						<select class="decConLeftSelect" name="">\
							<option value="">选择单元</option>\
							<option value="">1</option>\
							<option value="">2</option>\
							<option value="">3</option>\
							<option value="">4</option>\
						</select>\
						<select class="decConLeftSelect" name="">\
							<option value="">选择户号</option>\
							<option value="">1101</option>\
							<option value="">1102</option>\
							<option value="">1103</option>\
							<option value="">1104</option>\
						</select>\
					</div>\
					<div class="decConRightOuter">\
						<ol class="decConRightList">\
							<li>\
								<div class="ListMainTit">1# 1单元<div>></div></div>\
								<ul class="ListMainTitList">\
									<li>\
										<span>101</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>102</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>103</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>104</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
								</ul>\
							</li>\
							<li>\
								<div class="ListMainTit">1# 1单元<div>></div></div>\
								<ul class="ListMainTitList">\
									<li>\
										<span>101</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>102</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>103</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>104</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
								</ul>\
							</li>\
							<li>\
								<div class="ListMainTit">1# 1单元<div>></div></div>\
								<ul class="ListMainTitList">\
									<li>\
										<span>101</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>102</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>103</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
									<li>\
										<span>104</span>\
										<span>当前:水电安装/给水排水</span>\
										<span>前往查看</span>\
									</li>\
								</ul>\
							</li>\
						</ol>\
					</div>\
				</div>'
		$(".ListOuter").html(str);
//			右边内容部分
			$(".ListMainTitList").hide();
			$(".ListMainTit div").click(function(){
				$(".ListMainTit div").each(function(){
					$(this).css({"transform":"rotateZ(0deg)","transition":"1s"});
					$(this).parent().next(".ListMainTitList").hide(500);
				})
				$(this).css({"transform":"rotateZ(90deg)","transition":"1s"});
				$(this).parent().next(".ListMainTitList").show(500);
			})
}
//全部预约内容页面
$(".centerFirst span").click(function(){
	$("body").children("div").hide();
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/houseno/seeHouse",
		data:{
			"projectNumber" : val,
		},
		async:true,
		success : function(res){
			var Res = JSON.parse(res);
			console.log(Res)
			if(Res.code == "true"){
				var Data = Res.data;
				var str = '<div class="HouseReservationOuter">\
								<div class="HouseReservationNavOuter">\
									<div class="HouseReservationNav">\
										<ul class="HouseReservationNavList">\
											<li>看房预约</li>\
										</ul>\
										<div><img src = "">按预约时间排序</div>\
									</div>\
								</div>\
								<div class="HouseReservation">\
									<ul class="HouseReservationList">';
				for(var i=0;i<Data.length;i++){
					if(Data[i].sex == 1){
						Data[i].sex = "女士";
					}else if(Data[i].sex == 0){
						Data[i].sex = "男士";
					}
					if(Data[i].real_name == null){
						Data[i].real_name = "选择置业顾问";
					}
					str += '<li>\
								<img src="'+Data[i].head_pic+'" />\
								<span>'+Data[i].name+'-'+Data[i].sex+'</span>\
								<span>'+Data[i].phone+'</span>\
								<span>'+Data[i].appointed_time+'</span>\
								<span>'+Data[i].memo+'</span>\
								<select class="select">\
									<option style="display: none;" value = "'+Data[i].linker_id+'">'+Data[i].real_name+'</option>\
								</select>\
							</li>'
				}
				str += '</ul>\
					</div>\
				</div>';
				$("body").append(str);
				$.ajax({
					type:"post",
					url:"http://192.168.2.144/dingfang/public/admin/houseno/getConsultant",
					async:true,
					data : {
						"projectNumber" : val,
					},
					success : function(res){
						var Res = JSON.parse(res);
						console.log(Res)
						var str = '';
						for(var k=0;k<Res.data.length;k++){
							str += '<option value="'+Res.data[k].user_id+'">'+Res.data[k].real_name+'</option>'
						}
						$(".select").append(str);
//						点击按时间排序的select选择
						$(".select").change(function(){
							var seeHouseId = Data[$(this).index(".select")].id;
							var consultantId = $(this).val();
							$.ajax({
								type:"post",
								url:"http://192.168.2.144/dingfang/public/admin/houseno/selectConsultant",
								async:true,
								data : {
									"seeHouseNumber" : seeHouseId,
									"consultantNumber" : consultantId,
								},
								success : function(res){
									var Res = JSON.parse(res);
								},
								error : function(res){
									console.log(res)
								}
							});

							
						})
					},
					error : function(res){
						console.log(res)
					}
				});
//				点击时间排序
				$(".HouseReservationNav div").click(function(){
					$.ajax({
						type:"post",
						url:"http://192.168.2.144/dingfang/public/admin/houseno/seeHouse",
						async:true,
						data : {
							"projectNumber" : val,
							"seqType" : 1,
						},
						success : function(res){
							var Res = JSON.parse(res);
							var Str = '';
							var data = Res.data;
							for(var j=0;j<data.length;j++){
								if(data[j].sex == 1){
									data[j].sex = "女士";
								}else if(data[j].sex == 0){
									data[j].sex = "男士";
								}
								if(data[j].real_name == null){
									data[j].real_name = "选择置业顾问";
								}
								Str += '<li>\
											<img src="'+data[j].head_pic+'" />\
											<span>'+data[j].name+'-'+data[j].sex+'</span>\
											<span>'+data[j].phone+'</span>\
											<span>'+data[j].appointed_time+'</span>\
											<span>'+data[j].memo+'</span>\
											<select class="select">\
												<option style="display: none;" value='+data[j].user_id+'>'+data[j].real_name+'</option>\
											</select>\
										</li>';
							}
							$(".HouseReservationList").html(Str);
							$.ajax({
								type:"post",
								url:"http://192.168.2.144/dingfang/public/admin/houseno/getConsultant",
								async:true,
								data : {
									"projectNumber" : val,
								},
								success : function(res){
									var Res = JSON.parse(res);
									var str = '';
									for(var k=0;k<Res.data.length;k++){
										str += '<option value="'+Res.data[k].user_id+'">'+Res.data[k].real_name+'</option>'
									}
									$(".select").append(str);
//									点击按时间排序的select选择
									$(".select").change(function(){
										var seeHouseId = data[$(this).index(".select")].id;
										var consultantId = $(this).val();
										$.ajax({
											type:"post",
											url:"http://192.168.2.144/dingfang/public/admin/houseno/selectConsultant",
											async:true,
											data : {
												"seeHouseNumber" : seeHouseId,
												"consultantNumber" : consultantId,
											},
											success : function(res){
												var Res = JSON.parse(res);
											},
											error : function(res){
												console.log(res)
											}
										});

										
									})
								},
								error : function(res){
									console.log(res)
								}
							});
						},
						error : function(res){
							
						}
					});
				})
			}
		},
		error : function(res){
			
		}
	});
	
	
})
//全部订单页面内容
//销售统计
function AllOrders(){
	$("body").children("div").hide();
	str = '<div class="salesStatisticsOuter">\
				<div class="salesStatisticsNavOuter">\
					<div class="salesStatisticsNav">\
						<ul>\
							<li onclick="newPengingOrder()">待处理订单</li>\
							<li onclick="newAnyOrder()">订单管理</li>\
						</ul>\
						<div class="reorder">\
							<img width="15px" height="15px" src="http://192.168.2.144/dingfang/common/img/RT_06.jpg"/>按户号排序\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="ListOuter">\
				<ol class="PendingOrderList">\
					<li>\
						<div class="PendingOrderListLeftOuter">\
							<dl>\
								<dt><img src="img/1.jpg"/></dt>\
								<dd>\
									<p>3号楼2单元401室</p>\
									<span>赵亚萍 - 女士</span>\
								</dd>\
							</dl>\
						</div>\
						<div class="PendingOrderListCenterOuter">\
							<p>订单编号 : 2017021200135</p>\
							<p>装修方案 : <span>89方 M户型 C方案 时尚北欧风格</span></p>\
							<div class="center_bottomBox">\
								<p>材料升级 : <span>5项</span>金额 : <span>21500.00</span></p>\
								<p>软装搭配 : <span>5项</span>金额 : <span>58800.00</span></p>\
								<p>合计订单金额 : <span>815800.00</span></p>\
							</div>\
						</div>\
						<div class="PendingOrderListRightOuter">\
							<dl>\
								<dt>\
									<img src="img/1.jpg"/>订单详情\
								</dt>\
								<dd>\
									<p>✔</p>\
								</dd>\
							</dl>\
						</div>\
					</li>\
					<li></li>\
					<li></li>\
					<li></li>\
					<li></li>\
				</ol>\
			</div>'
	$("body").append(str);
//	点击切换子页面   点击切换子页面  点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面   点击切换子页面 
			$(".salesStatisticsNav li").eq(0).css("background","#FFF");
			$(".salesStatisticsNav li").eq(0).siblings().css("background","#CCC");
			$(".salesStatisticsNav li").click(function(){
				$(this).css("background","#FFF");
				$(this).siblings().css("background","#CCC");
			})
			
}
//  待处理订单 待处理订单 字符串拼接
function newPengingOrder(){
	var str =   '<ol class="PendingOrderList">\
					<li>\
						<div class="PendingOrderListLeftOuter">\
							<dl>\
								<dt><img src="http://192.168.2.144/dingfang/common/img/user_img.jpg"/></dt>\
								<dd>\
									<p>3号楼2单元401室</p>\
									<span>赵亚萍 - 女士</span>\
								</dd>\
							</dl>\
						</div>\
						<div class="PendingOrderListCenterOuter">\
							<p>订单编号 : 2017021200135</p>\
							<p>装修方案 : <span>89方 M户型 C方案 时尚北欧风格</span></p>\
							<div class="center_bottomBox">\
								<p>材料升级 : <span>5项</span>金额 : <span>21500.00</span></p>\
								<p>软装搭配 : <span>5项</span>金额 : <span>58800.00</span></p>\
								<p>合计订单金额 : <span>815800.00</span></p>\
							</div>\
						</div>\
						<div class="PendingOrderListRightOuter">\
							<dl>\
								<dt>\
									<img src="http://192.168.2.144/dingfang/common/img/Rt_05.jpg"/>订单详情\
								</dt>\
								<dd>\
									<p>✔</p>\
								</dd>\
							</dl>\
						</div>\
					</li>\
					<li></li>\
					<li></li>\
					<li></li>\
					<li></li>\
				</ol>'
	$(".ListOuter").html(str)
}
//  全部订单 全部订单 字符串拼接
function newAnyOrder(){
	
}
//快捷入口点击跳转
//快捷入口点击跳转
//业主公告维护
$(".rightTopContent li").eq(0).click(function(){
	sessionStorage.setItem("testShow","2");
	$("#content_rightMain", window.parent.document).attr("src","EstateManagement.html");
	$(".list_left li", window.parent.document).eq(1).css({"background":"rgba(153,153,153,0.3)","color":"#caa815"});
	$(".list_left li", window.parent.document).eq(1).siblings().css({"background":"#FFF"});
	$(".list_left .list_outer", window.parent.document).eq(1).siblings(".list_outer").css({"color":"#000"});
})
//楼盘动态
$(".rightTopContent li").eq(1).click(function(){
	sessionStorage.setItem("testShow","0");
	$("#content_rightMain", window.parent.document).attr("src","EstateManagement.html");
	$(".list_left li", window.parent.document).eq(1).css({"background":"rgba(153,153,153,0.3)","color":"#caa815"});
	$(".list_left li", window.parent.document).eq(1).siblings().css({"background":"#FFF"});
	$(".list_left .list_outer", window.parent.document).eq(1).siblings(".list_outer").css({"color":"#000"});
})
//楼盘评论管理
$(".rightTopContent li").eq(2).click(function(){
	sessionStorage.setItem("testShow","1");
	$("#content_rightMain", window.parent.document).attr("src","EstateManagement.html");
	$(".list_left li", window.parent.document).eq(1).css({"background":"rgba(153,153,153,0.3)","color":"#caa815"});
	$(".list_left li", window.parent.document).eq(1).siblings().css({"background":"#FFF"});
	$(".list_left .list_outer", window.parent.document).eq(1).siblings(".list_outer").css({"color":"#000"});
})
//开盘及销售管理
$(".rightTopContent li").eq(3).click(function(){
	sessionStorage.setItem("testShow","0");
	$("#content_rightMain", window.parent.document).attr("src","marketingmanagement.html");
	$(".list_left li", window.parent.document).eq(2).css({"background":"rgba(153,153,153,0.3)","color":"#caa815"});
	$(".list_left li", window.parent.document).eq(2).siblings().css({"background":"#FFF"});
	$(".list_left .list_outer", window.parent.document).eq(2).siblings(".list_outer").css({"color":"#000"});
})
//施工日志设置
$(".rightTopContent li").eq(4).click(function(){
	sessionStorage.setItem("testShow","6");
	$("#content_rightMain", window.parent.document).attr("src","EstateManagement.html");
	$(".list_left li", window.parent.document).eq(1).css({"background":"rgba(153,153,153,0.3)","color":"#caa815"});
	$(".list_left li", window.parent.document).eq(1).siblings().css({"background":"#FFF"});
	$(".list_left .list_outer", window.parent.document).eq(1).siblings(".list_outer").css({"color":"#000"});
})
//二维码管理
$(".rightTopContent li").eq(5).click(function(){
	sessionStorage.setItem("testShow","0");
	$("#content_rightMain", window.parent.document).attr("src","HouseholdManagement.html");
	$(".list_left li", window.parent.document).eq(2).css({"background":"rgba(153,153,153,0.3)","color":"#caa815"});
	$(".list_left li", window.parent.document).eq(2).siblings().css({"background":"#FFF"});
	$(".list_left .list_outer", window.parent.document).eq(2).siblings(".list_outer").css({"color":"#000"});
})
// 快捷售楼管理
$.ajax({
	type : "post",
	url : "http://192.168.2.144/dingfang/public/admin/houseno/getHouseNo",
	data : {
		"projectNumber" : val,
		"buildingNumber" : 0,
		"unitNumber" : 0,
		"levelNumber" : 0,
	},
	success : function(res){
		var Res = JSON.parse(res);
		if(Res.code == "true"){
			var building = Res.data.building;
			var strBuilding = '';
			for(var i=0;i<building.length;i++){
				strBuilding += '<option value="'+building[i].id+'">'+building[i].name+'</option>';
			}
			$(".buildingNum").append(strBuilding);
			$(".buildingNum").change(function(){
				var that = this;
				$.ajax({
					type : "post",
					url : "http://192.168.2.144/dingfang/public/admin/houseno/getHouseNo",
					data : {
						"projectNumber" : val,
						"buildingNumber" : $(that).val(),
						"unitNumber" : 0,
						"levelNumber" : 0,
					},
					success : function(res){
						var Res = JSON.parse(res);
						var strUnit = '';
						var unit = Res.data.unit;
						for(var j=0;j<unit.length;j++){
							 strUnit += '<option value="'+unit[j].unit_id+'">'+unit[j].unit_id+'</option>';
						}
						$(".unitNum").html(strUnit);
						$(".unitNum").change(function(){
							var that = this;
							$.ajax({
								type : "post",
								url : "http://192.168.2.144/dingfang/public/admin/houseno/getHouseNo",
								data : {
									"projectNumber" : val,
									"buildingNumber" : $(".buildingNum").val(),
									"unitNumber" : $(that).val(),
									"levelNumber" : 0,
								},
								success : function(res){
									var Res = JSON.parse(res);
									var strLevel = '';
									var level = Res.data.level;
									for(var k=0;k<level.length;k++){
										strLevel += '<option value="'+level[k].level+'">'+level[k].level+'</option>';
									}
									$(".levelNum").html(strLevel);
									$(".levelNum").change(function(){
										var that = this;
										$.ajax({
											type : "post",
											url : "http://192.168.2.144/dingfang/public/admin/houseno/getHouseNo",
											data : {
												"projectNumber" : val,
												"buildingNumber" : $(".buildingNum").val(),
												"unitNumber" : $(".unitNum").val(),
												"levelNumber" : $(that).val(),
											},
											success : function(res){
												var Res = JSON.parse(res);
												var house = Res.data.house;
												var strHouse = '';
												for(var m=0;m<house.length;m++){
													strHouse += '<option value="'+house[m].id+'">'+house[m].name+'</option>';
												}
												$(".houseNum").html(strHouse)
											},
											error : function(res){
												console.log(res);
											}
										})
									})
								},
								error : function(res){
									console.log(res)
								}
							})
						})
					},
					error : function(res){
						console.log(res);
					}
				})
			})

		}
	},
	error : function(res){
		var Res = JSON.parse(res);
		console.log(Res);
	}
});
// 快捷售楼管理点击确定按钮提交
$(".subBtn").click(function(){
	console.log(val);
	console.log($(".houseNum").val());
	console.log($("#ownerName").val());
	console.log($("#phoneNamber").val());
	$.ajax({
		type : "post",
		url : "http://192.168.2.144/dingfang/public/admin/houseno/saleHouseNo",
		data : {
			"projectNumber" : val,
			"houseNumber" : $(".houseNum").val(),
			"name" : $("#ownerName").val(),
			"phone" : $("#phoneNamber").val(),
		},
		success : function(res){
			var Res = JSON.parse(res);
			console.log(Res)
			window.location.reload();
		},
		error : function(res){
			console.log(res)
		}
	})
})
