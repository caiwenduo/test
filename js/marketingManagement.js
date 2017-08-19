//小滚动条
$(".houseUnit_list").mCustomScrollbar({

	scrollInertia:600,

	autoDraggerLength:false

});

var val = sessionStorage.getItem("MarketChoice");
var num = "";
$(".textNamber").click(function (){
	$(".textNamber").css({"background":"#EEE","color":"gray"});
	$(this).css({"background":"#DDD","color":"#FFF"});
	$("#test01")[0].value = this.innerHTML;
})
var Text = 0;
$(".WhetherOverheadInner").click(function (){
	if(Text==0){
		$(".oneFloorNull").css("background","orange");
		Text = 1;
		$("#test02")[0].value = Text;
	}else{
		$(".oneFloorNull").css("background","#CCC");
		Text = 0;
		$("#test02")[0].value = Text;
	}
}) 
//批量新增里的保存
var moreAddOne = $("#houseN01")[0];
var moreAddTwo = $("#houseN02")[0];
var moreAddThree = $("#houseN03")[0];
var moreAddFour = $("#houseN04")[0];
var moreAddFive = $("#maxFloor")[0];
var moreAddSix = $("#test01")[0];
var moreAddSeven = $("#maxHouseNumber")[0];
var empty = $("#test02")[0];
function moreAddConserve(){
	console.log(val);
	console.log(moreAddOne.value);
	console.log(moreAddTwo.value);
	console.log(moreAddThree.value);
	console.log(moreAddFour.value);
	console.log(moreAddFive.value);
	console.log(moreAddFive.value);
	console.log(moreAddSix.value);
	console.log(moreAddSeven.value);
	console.log(empty.value);
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/houseno/addMore",
		dataType:"text",
		data:{
			"projectNumber" : val,
			"buildingNumberStart" : moreAddOne.value,
			"buildingNumberEnd" : moreAddTwo.value,
			"unitNumberStart" : moreAddThree.value,
			"unitNumberEnd" : moreAddFour.value,
			"floorNumberMax" : moreAddFive.value,
			"accountNumber" : moreAddSix.value,
			"accountNumberMax" : moreAddSeven.value,
			"empty" : empty.value,
		},
		success : function(res){
			var Res = JSON.parse(res)
			if(Res.code=="true"){
				window.location.href = "HouseholdManagement.html"
			}
		},
		error : function(){
			alert("批量新增保存失败");
		}
		
	});
}
//新增户号里的保存
var newAddOne = document.getElementById("newHouseNamber");
var newAddTwo = $("#newUnit")[0];
var newAddThree = $("#newFloor")[0];
var newAddFour = $("#newHomeNamber")[0];
function newAddConserve(){	
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/houseno/add",
		dataType: "text",
		data:{
			"projectNumber" : val,
			"buildingNumber" : newAddOne.value,
			"unitNumber" : newAddTwo.value,
			"floorNumber" : newAddThree.value,
			"accountNumber" : newAddFour.value,
		},
		success : function(res){
			var Res = JSON.parse(res);
			if(Res.code=="true"){
				window.location.href = "HouseholdManagement.html";
			}	
		},
		error : function(res){
			alert("error")
			$(".point")[0].innerHTML = res;
		}
		
	});
}		
//		发送楼盘名称获取楼号
		window.addEventListener("storage",function(){
			console.log(val)
		});
		MarketChoice();
		function MarketChoice(){
			var Num = val;
			$.ajax({
				type:"post",
				url:"http://192.168.2.144/dingfang/public/admin/houseno/",
				data:{
					"projectNumber" : Num,
				},
				success:function(res){
					var Res = eval('(' + res + ')');
					var Data = Res.data;
					console.log(Res)
					var str = "";
					for(var i=0;i<Data.length;i++){
						str+='<div class="outerList"><div class="outerListNav"><h3 class="FloorN">'+Data[i].name+'楼</h3><div class="ExpandHide"><span>展开</span><img class="rotateImg" src="http://localhost/dingfang/common/img/right.jpg"><i class="num">'+Data[i].id+'</i></div><div class="funct"><div class="salesStatue"></div><span yesOrNo = "0">✔</span><div class="quanxuan">全选</div></div></div><div class="ListOuter"></div></div>'
					}
					$(".outerBox")[0].innerHTML = str;
					for(var i=0;i<Data.length;i++){
						$(".outerList").eq(i).data("ID",Data[i].id);
						if(Data[i].is_sale == 0){
							$(".funct").eq(i).children("span").css({"background":"#bbb","display":"inline-block"});
							$(".salesStatue").eq(i).css({"display":"inline-block","font-size":"14px","color":"#555","margin-right":"15px"});
							$(".quanxuan").eq(i).css({"display":"inline-block","font-size":"12px"});
							$(".salesStatue").eq(i).text("未售");
							$(".salesStatue").click();
							
						}else if(Data[i].is_sale == 1){
							$(".funct").eq(i).children("span").css({"background":"#bbb","display":"inline-block"});
							$(".salesStatue").eq(i).css({"display":"inline-block","font-size":"14px","color":"green","margin-right":"15px"});
							$(".quanxuan").eq(i).css({"display":"inline-block","font-size":"12px"});
							$(".salesStatue").eq(i).text("在售");
							$(".salesStatue").click();
						}
					}
					$(".salesStatue").click(function(){
//						if($(this).children("span").attr("yesOrNo") == "0"){
//							$(this).children("span").css("background","orange");
//							$(this).children("span").attr("yesOrNo","1");
//						}else if($(this).children("span").attr("yesOrNo") == "1"){
//							$(this).children("span").css("background","#BBB");
//							$(this).children("span").attr("yesOrNo","0");
//						}
						var buildingId = $(".outerList").eq($(this).index(".salesStatue")).data("ID");
						var that = this;
						$.ajax({
							type:"post",
							url:"http://192.168.2.144/dingfang/public/admin/houseno/sell/",
							async:true,
							data : {
								"projectNumber" : val,
								"buildingNumber" : buildingId,
								"unitNumber" : "",
							},
							success : function(res){
								var Res =JSON.parse(res);
								console.log(Res);
								if(Res.code == "true"){
									$(".salesStatue").eq($(that).index(".salesStatue")).css({"color":"green"});
								}
							}
						});
					})
					btnClick(Num);
				},
				error:function(res){
					console.log(res)
				}
			});
		}
	
//		ajax获取对应的单元
			function btnClick( projectNum ){
				var listBtn = document.getElementsByClassName("ExpandHide");
				for(var i=0;i<listBtn.length;i++){
					listBtn[i].index = i;
					listBtn[i].onclick = function (){
						$('.ListOuter').hide(200);
						$(this).parent().next('.ListOuter').show(200);
						$(this).find("img").css({"transform":"rotate(90deg)","transition":"1s"});
						$(this).parent().parent().siblings(".outerList").find(".outerListNav").find(".ExpandHide").find("img").css({"transform":"rotate(0deg)","transition":"1s"})
						var that = this;
						var num = document.getElementsByClassName("num");
						var value = num[this.index].innerHTML;
						$.ajax({
							type:"post",
							url:"http://192.168.2.144/dingfang/public/admin/houseno/",
							data:{
								"projectNumber":val,
								"buildingNumber":value,
							},
							success:function(res){
								var Res = eval('(' + res + ')');
								console.log(Res);
								var str = "";
								if(Res.code == "true"){
									var unit = Res.data;
									for(var i=0;i<unit.length;i++){
										str+='<div class="unitList"><div class="unitListTop"><h3><span class="unitN">'+unit[i].unitId+'</span><span>单元</span></h3><div class="unitRevise"><span yesOrNo = "0">✔</span>全选</div></div><table border="1" class="listContent content_3">'
										var account = unit[i].level;
										
										for(j in account){
											var houseId = account[j].houseId;
											var levelId = account[j].levelId;
											str+='<tr>'
											var Length = account[j].houseId.length;
											var arr = [];
											arr.push(Length);
											var max= arr[0];
											for(var n=0;n<arr.length;n++){
												if(max<arr[n]){
													max = arr[n];
												}
											}
										
											for(var k=0;k<houseId.length;k++){
											
												str+='<td class="houseNum"><span>'+houseId[k].name+'</span><br/><span class= "homeId" style="display: none;">'+houseId[k].id+'</span><span class="priceRevise">'+houseId[k].price+'万</span></td>'
							
											}
											str+='</tr>'
											
											
										}
										str+='</table><div class="unitListBottom"></div></div>'
									}
								
									$(".ListOuter").eq(that.index).html(str);
									for(var i=0;i<$(".ListOuter").eq(that.index).find(".houseNum").length;i++){
										if($(".ListOuter").eq(that.index).find(".houseNum").eq(i).children(".priceRevise").html() !== "万" && $(".ListOuter").eq(that.index).find(".houseNum").eq(i).children(".priceRevise").html() !== null+"万"){
											$(".priceRevise").show();
											$(".ListOuter").eq(that.index).find(".houseNum").eq(i).css({"background":"orange","color":"#FFF","line-height":"14px","font-size":"11px","max-width":"50px"});
										}
									}
//									点击选择单元，背景颜色改变yesOrNo
									$(".unitRevise").click(function(){
										if($(this).children("span").attr("yesOrNo") == "0"){
											$(this).children("span").css("background","orange");
											$(this).children("span").attr("yesOrNo","1");
										}else if($(this).children("span").attr("yesOrNo") == "1"){
											$(this).children("span").css("background","#DEDEDE");
											$(this).children("span").attr("yesOrNo","0");
										}
									})
//									点击户号编辑金额

									$(".houseNum").click(function(){
										if($(this).children("div").length == 0){
											$(this).append('<div><div></div><input type="text" placeholder="请输入金额" />万元</div>');
											$(this).siblings("td").children("div").remove("div");
											$(this).parent().siblings("tr").children("td").children("div").remove("div");
											if($(this).index() == $(this).parent().children("td").length-1){
												$(this).children("div").css({"left":"-50px"});
												$(this).children("div").children("div").css({"left":"70px"})
											}
											if($(this).index() == 0){
												$(this).children("div").css({"left":"0px"});
												$(this).children("div").children("div").css({"left":"20px"})
											}
											if($(this).parent("tr").index() == $(this).parent("tr").parent().children("tr").length-1){
												$(this).children("div").css({"top":"-40px"});
												$(this).children("div").children("div").css({"left":"30px","top":"35px","border-bottom":"8px solid transparent","border-top":"8px solid #006666"})
											}
											if($(this).parent("tr").index() == $(this).parent("tr").parent().children("tr").length-1 && $(this).index() == $(this).parent().children("td").length-1){
												$(this).children("div").css({"left":"-50px","top":"-40px"});
												$(this).children("div").children("div").css({"left":"70px","top":"35px","border-bottom":"8px solid transparent","border-top":"8px solid #006666"})
											}
											if($(this).parent("tr").index() == $(this).parent("tr").parent().children("tr").length-1 && $(this).index() == 0){
												$(this).children("div").css({"top":"-40px"});
												$(this).children("div").children("div").css({"left":"20px","top":"35px","border-bottom":"8px solid transparent","border-top":"8px solid #006666"})
											}
											
										}
										var inPutText = $(this).find("input")
										
										$(inPutText).focus()
										$(inPutText).focus(function( houseId ){
											var that = this;
											$(document).keypress(function(){
												if(event.keyCode == "13"){
													var houseId = $(that).parent().parent().children(".homeId").html();
													var price = $(that).val();
													if(price !== ""){
														$.ajax({
															type:"post",
															url:"http://192.168.2.144/dingfang/public/admin/houseno/setPrice",
															async:true,
															data : {
	 															"houseNumber" : houseId,//户号的id
	 															"price" : price,//输入的价格
															},
															success : function(res){
																var Res =JSON.parse(res);
																console.log(Res);
																if(Res.code == "true"){
																	$(that).parent().parent().css({"background":"orange","color":"#FFF","line-height":"14px","font-size":"11px"});
																	$(that).parent().parent().children(".priceRevise").html(inPutText.val()+'万');
																	$(that).parent().remove();
																}
															}
														});	
													}else{
														$(that).parent().remove();
													}
													
													
												}
											})
											$(inPutText).blur(function(){
												var houseId = $(that).parent().parent().children(".homeId").html();
												var price = $(that).val();
												if(price !== ""){
													$.ajax({
														type:"post",
														url:"http://192.168.2.144/dingfang/public/admin/houseno/setPrice",
														async:true,
														data : {
															"houseNumber" : houseId,//户号的id
															"price" : price,//输入的价格
														},
														success : function(res){
															var Res =JSON.parse(res);
															console.log(Res);
															if(Res.code == "true"){
																$(that).parent().parent().css({"background":"orange","color":"#FFF","line-height":"14px","font-size":"11px"});
																$(that).parent().parent().children(".priceRevise").html(inPutText.val()+'万');
																$(that).parent().remove();
															}
														}
													});	
												}else{
													$(that).parent().remove();
												}
											})
										})
										

									})
//右边小滚动条 右边小滚动条 	右边小滚动条
									scroll();
									function scroll(){
										$(".listContent").mCustomScrollbar({
							
											scrollInertia:600,
										
											autoDraggerLength:false	
										});
										//横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动 横向滚动
										$(".ListOuter").mCustomScrollbar({
										
											horizontalScroll:true,
										
											scrollButtons:{
										
												enable:true
										
											},
										
											theme:"dark-thin"
										
										});								
									}
											
									
											//点击绑定户型弹出窗口选择界面
											var project = val;//楼盘号码
//											console.log(project)
											var building = value;//楼号
//											console.log(building)
		//									删除点x击户的户号			
								}								
								
							},
							error:function(){
								alert("error");
							}
						});
					}
				}
			}