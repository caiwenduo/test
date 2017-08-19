//小滚动条
$(".houseUnit_list").mCustomScrollbar({

	scrollInertia:600,

	autoDraggerLength:false

});

var BuildName = sessionStorage.getItem("MarketChoice");
//点击批量新增
function moreAdd(){
	$(".moreAddOuter")[0].style.cssText = "display: block;";		
}

//批量新增里的返回
function moreAddBack(){
	$(".moreAddOuter")[0].style.cssText = "display: none;";		
}
//点击新增户号
function newAdd(){
	$(".newAddOuter")[0].style.cssText = "display: block;";		
}
//新增户号里的返回
function newAddBack(){
	$(".newAddOuter")[0].style.cssText = "display: none;";		
}
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
	console.log(BuildName);
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
			"projectNumber" : BuildName,
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
			"projectNumber" : BuildName,
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
			console.log(BuildName)
		});
		MarketChoice();
		function MarketChoice(){
			var Num = BuildName;
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
						str+='<div class="outerList"><div class="outerListNav"><h3 class="FloorN">'+Data[i].name+'楼</h3><div class="ExpandHide"><span>展开</span><img class="rotateImg" src="http://localhost/dingfang/common/img/right.jpg"><i class="num">'+Data[i].id+'</i></div><div class="funct"><img class="DelBuilding" src="http://localhost/dingfang/common/img/edit_R.jpg"></div></div><div class="ListOuter"></div></div>'
					}
					$(".outerBox")[0].innerHTML = str;
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
								"projectNumber":BuildName,
								"buildingNumber":value,
							},
							success:function(res){
								var Res = eval('(' + res + ')');
								var str = "";
								if(Res.code == "true"){
									var unit = Res.data;
									for(var i=0;i<unit.length;i++){
										str+='<div class="unitList"><div class="unitListTop"><h3><span class="unitN">'+unit[i].unitId+'</span><span>单元</span></h3><div class="unitRevise"><img class="homeDelUnit" src="http://localhost/dingfang/common/img/edit_C.jpg"><img class="UnitDel" src="http://localhost/dingfang/common/img/edit_R.jpg"></div></div><table border="1" class="listContent content_3">'
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
											
												str+='<td><span>'+houseId[k].name+'</span><span class="forHomeId">x</span><span id="homeId" class= "homeId" style="display: none;">'+houseId[k].id+'</span></td>'
							
											}
											str+='</tr>'
											
											
										}
										str+='</table><div class="unitListBottom">'
										for(var m=0;m<max;m++){
											str+='<span class="BindingUnit">绑定户型</span>'
										}
										str+='</div></div>'
									}
								
									$(".ListOuter").eq(that.index).html(str);
									
									//右边小滚动条 右边小滚动条 	右边小滚动条
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
											//点击绑定户型弹出窗口选择界面
											var project = BuildName;//楼盘号码
//											console.log(project)
											var building = value;//楼号
//											console.log(building)
		//									删除点x击户的户号
											homeDelUnit($(".homeDelUnit"));
											homeDel($(".forHomeId"))
											BindingUnit( project,building );	
											DelUnit( project,building );			
								}
								
							},
							error:function(){
								alert("error");
							}
						});
					}
				}
//				点击删除该栋楼
				
				for(var i=0;i<$(".DelBuilding").length;i++){
					$(".DelBuilding")[i].index = i;
//					点击x删除楼栋号
					$(".DelBuilding")[i].onclick = function(){
						var that = this;
						var buildingNumber = $(".num")[this.index].innerHTML;
						console.log(projectNum);
						console.log(buildingNumber);
						var str = '<div class="delWindow"><div class="delWindow_content"><p>是否删除该栋楼?</p><span class="yesDel">是</span><span class="noDel">否</span></div></div>';
						$("body").append(str);
//						确定删除该栋楼号
						$(".yesDel").click(function(){
							var That = this;
							$.ajax({
								type:"post",
								url:"http://192.168.2.144/dingfang/public/admin/houseno/delBuild",
								data : {
									"projectNumber" : projectNum,//楼盘号码
									"buildingNumber" : buildingNumber,//楼号id
								},
								success : function(res){
									var Res = eval('('+res+')');
									if(Res.code == "true"){
										console.log(that.index)
										that.parentNode.parentNode.parentNode.style.display = "none";
										if(that.parentNode.parentNode.parentNode.style.display == "none"){
											$(That).parent().parent().remove();
										}
									}
								},
							});
						})
//						取消删除单元号
						$(".noDel").click(function(){
							$(this).parent().parent().remove();
						})
						
					};	
				}
			}
			//点击绑定户型弹出窗口选择界面
			function BindingUnit(project,building){
				$(".BindingUnit").click(function(){
					
					var UnitInner = $(this).parent().parent().find("h3").find(".unitN").html();
					var That = $(this).index()
					var windows = $("#windows",window.parent.document)[0];
					console.log(project)
					console.log(building)
					console.log(UnitInner)
					console.log($(this).index()+1)
					$.ajax({
						type:"post",
						url:"http://192.168.2.144/dingfang/public/admin/houseno/showHouse",
						data : {
							"projectNumber" : project,//楼盘号码
							"buildingNumber" : building,//楼号
							"unitNumber" : UnitInner,//单元号
							"columnNumber" : $(this).index()+1,//列号
						},
						success : function(res){
							var Res = eval('('+res+')');
							console.log(Res.data)
							if(Res.code == "true"){
//								windows.style.cssText = "display: block;"
								var that = this;
								var List = Res.data.dataHouse;
								var str='<div class="BindingUnitBox"><ul>';
								for(var i=0;i<List.length;i++){
									str+='<li class="BindingUnitList">\
									<dl><dt><img src="'+List[i].pic_url+'">\
									</dt><dd><h4>'+List[i].name+List[i].vaules+'</h4><p>'+List[i].desc+'</p>\
									<span>面积: '+List[i].area+'m²</span>\
									<span>提供: '+List[i].designer+'</span>\
									</dd></dl><div class="confirm">✔</div>\
									<span class="ListId" style="display: none;">'+List[i].id+'</span></li>';
								}
								str+='</ul><div class="closeWindows">×</div></div>'
								windows.innerHTML = str;
								windows.style.cssText = "display: block;";
//								鼠标点击变色
								var BindingUnitList = $(".BindingUnitList",window.parent.document);
								var confirm = $(".confirm",window.parent.document);
								var amout = "";
								for(var i=0;i<BindingUnitList.length;i++){
									BindingUnitList[i].index = i;
									console.log(parent.document.getElementsByClassName("ListId")[i].innerHTML)
									console.log(Res.data.isBind)
									if(parent.document.getElementsByClassName("ListId")[i].innerHTML == Res.data.isBind){
										confirm[i].style.background = "orange";
									}
									BindingUnitList[i].onclick = function(){
										for(var j=0;j<BindingUnitList.length;j++){
											confirm[j].style.background = "#aaa";
										}
										confirm[this.index].style.background = "orange";
										amout = parent.document.getElementsByClassName("ListId")[this.index].innerHTML;
										Amount( amout );
									}
								}
								Amount( amout );
//								点击关闭弹出窗口提交
								function Amount( amout ){
									var column = That + 1;
									var closeWindows = $(".closeWindows",window.parent.document)[0];	
									closeWindows.onclick = function(){
//										console.log(project)
//										console.log(building)
//										console.log(UnitInner)
//										console.log(column)
//										console.log(amout)
										$.ajax({
											type:"post",
											url:"http://192.168.2.144/dingfang/public/admin/houseno/bindColumn",
											data : {
												"projectNumber" : project,
												"buildingNumber" : building,
												"unitNumber" : UnitInner,
												"columnNumber" : column,
												"houseNumber" : amout,
											},
											success : function(res){
												var Res = JSON.parse(res);
												if(Res.code == "true"){
													windows.style.display = "none";
												}
											},
											error:function(res){
												console.log(res)
											}
										});
									}	
								}
								$(".BindingUnitList").click(function(){
									alert($(this).index());
								})
							}
						},
						
					});
				
				})
			}
			function DelUnit( project,building ){
				for(var i=0;i<$(".UnitDel").length;i++){
					$(".UnitDel")[i].index =i;
					$(".UnitDel")[i].onclick = function(){
						var UnitInner = $(this).parent().prev("h3").find(".unitN").html()
						var that = this;
						var str = '<div class="delWindow"><div class="delWindow_content"><p>是否删除该单元?</p><span class="yesDel">是</span><span class="noDel">否</span></div></div>';
						$("body").append(str);
//						确定删除单元号
						$(".yesDel").click(function(){
							var That = this;
							$.ajax({
								type:"post",
								url:"http://192.168.2.144/dingfang/public/admin/houseno/delUnit",
								data : {
									"projectNumber" : project,//楼盘号码
									"buildingNumber" : building,//楼号id
									"unitNumber" : UnitInner,//单元号
								},
								success : function(res){
									var Res = eval('('+res+')');
									if(Res.code == "true"){
										console.log(that.index)
										that.parentNode.parentNode.parentNode.style.display = "none";
										if(that.parentNode.parentNode.parentNode.style.display == "none"){
											$(That).parent().parent().remove();
										}
									}
								},
							});
						})
//						取消删除单元号
						$(".noDel").click(function(){
							$(this).parent().parent().remove();
						})
						
					};	
				}
				
			}
//			点击户号修改图标
			function homeDelUnit(homeDelU){
				var Color = 0;
				homeDelU.click(function(){
					//周一从此处开始
					if( Color == 0){
						$(this).parent().parent().next().find("td").find(".forHomeId").css("display","block");
						Color = 1;
					}
 					else{
 						$(this).parent().parent().next().find("td").find(".forHomeId").css("display","none")
 						Color = 0;
 					}
				})
			}
//			点击删除户号
			function homeDel(forHome){
				forHome.click(function(){
					var val = $(this).next().html();
					var that = this;
					console.log(val);
					$.ajax({
						type:"post",
						url:"http://192.168.2.144/dingfang/public/admin/houseno/delHouse",
						data : {
							"houseId" : val,
						},
						success : function(res){
							var Res = eval('('+res+')');
							if(Res.code == "true"){
								$(that).prev().html("");
							}
						}
					});	
				})
			}
						
		