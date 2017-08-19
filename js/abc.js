//		ajax获取对应楼号的单元
			
			function btnClick(){
				var listBtn = document.getElementsByClassName("ExpandHide");
				for(var i=0;i<listBtn.length;i++){
					listBtn[i].index = i;
					listBtn[i].onclick = function (){
						$('.ListOuter').css("display","none");
						$(this).parent().next('.ListOuter').css("display","block");
						$(this).find("img").css("transform","rotate(90deg)");
						$(this).parent().parent().siblings(".outerList").find(".outerListNav").find(".ExpandHide").find("img").css("transform","rotate(0deg)")
						var that = this;
						var num = document.getElementsByClassName("num");
						var value = num[this.index].innerHTML;
						$.ajax({
							type:"post",
							url:"http://192.168.0.83/dingfang/public/admin/houseno/",
							data:{
								"projectNumber":BuildName.value,
								"buildingNumber":value,
							},
							success:function(res){
								var Res = eval('(' + res + ')');
								var str = "";
								if(Res.code == "true"){
									var unit = Res.data;
									for(var i=0;i<unit.length;i++){
										str+='<div class="unitList"><div class="unitListTop"><h3 class="unitN">'+unit[i].unitId+'</h3><div class="unitRevise"><img src="http://localhost/dingfang/common/img/edit_C.jpg"><img src="http://localhost/dingfang/common/img/edit_R.jpg"></div></div><table border="1" class="listContent content_3">'
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
											
												str+='<td>'+houseId[k].name+'</td>'
							
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
									//			右边小滚动条
									$(".listContent").mCustomScrollbar({
						
										scrollInertia:600,
									
										autoDraggerLength:false	
									});
											//点击绑定户型弹出窗口选择界面
											var project = BuildName.value;//楼盘号码
//											console.log(project)
											var building = value;//楼号
//											console.log(building)
											//单元号
										$(".unitList").click(function(){	
											var Unit = $(".unitN")[$(this).index()].innerHTML;
//											console.log($(".unitN")[$(this).index()].innerHTML)
											UnitAdd(Unit);
										})
										function UnitAdd(Unit){
											BindingUnit( project,building,Unit )	
										}
									
								}
								
							},
							error:function(){
								alert("error");
							}
						});
					}
				}			
			}