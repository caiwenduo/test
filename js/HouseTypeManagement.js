function page(Data){
	//这是一个非常简单的demo实例，让列表元素分页显示
	//回调函数的作用是显示对应分页的列表项内容
	//回调函数在用户每次点击分页链接的时候执行
	//参数page_index{int整型}表示当前的索引页
	var initPagination = function() {
		var num_entries = $("#hiddenresult li.result").length;
		// 创建分页
		$("#Pagination").pagination(num_entries, {
			num_edge_entries: 1, //边缘页数
			num_display_entries: 4, //主体页数
			callback: pageselectCallback,
			items_per_page:10 //每页显示1项
		});
	 }();
	 
	function pageselectCallback(page_index, jq){
		console.log('page_index' + page_index)
		$("#Searchresult").empty();
		for(var i = 0;i < 10;i ++){
			var j = page_index * 10 + i
			var str = $("#hiddenresult li.result").eq(j).clone()
			$("#Searchresult").append(str);
			console.log($("#hiddenresult li.result").length)
		}
		delList(Data);//删除户型
		reviseList(Data);//修改户型
		AssociationScheme(Data);//关联方案
		AssociationHouseNumber(Data);//关联房号
		return false;
	}
	
};
var val = sessionStorage.getItem("MarketChoice");
loading(val);
function loading(val){
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/house",
		dataType:"json",
		data:{
			"projectNumber" : val,
			
		},
		success : function(res){
//			var Res = JSON.parse(res)
//			var Res = eval('(' + res + ')');
			if(res.code=="true"){
				var Data = res.data;
				var str = '';
				for(var i=0;i<Data.length;i++){
					str+='<li class="result"><div class="houseListBox">\
								<img src="'+Data[i].pic_url+'"/>\
								<div class="houseCognate">\
									<span class="associationHouseNumber">关联房号</span>\
									<span class="associationScheme">关联方案</span>\
								</div>\
								<div class="houseContent">\
									<h4>'+Data[i].name+''+Data[i].vaules+'</h4>\
									<p>'+Data[i].desc+'</p>\
									<p>面积 : '+Data[i].area+'m²</p>\
									<p>提供 : '+Data[i].designer+'</p>\
								</div>\
								<div class="houseRevise">\
									<img class="resiveList" src="http://192.168.2.144/dingfang/common/img/revise.jpg"/>\
									<img class="delList" src="http://192.168.2.144/dingfang/common/img/del.jpg"/>\
								</div>\
							</div>\
						</li>'
				}
				$("#hiddenresult").html(str);
				page(Data);//分页显示
				
			}
			
		},
		error : function(res){
			console.log(res);
		}
		
	});
};
//点击删除按钮
function delList(Data){
	for(var i =0;i<Data.length;i++){
		$(".delList")[i].index = i;
		$(".delList")[i].onclick = function(){
			var houseNumber = Data[this.index].id;
			var str = '<div class="delWindow"><div class="delWindow_content"><p>是否删除该栋楼?</p><span class="yesDel">是</span><span class="noDel">否</span></div></div>';
			$("body").append(str);
			$(".yesDel").click(function(){
				var that = this;
				$.ajax({
					type:"post",
					url:"http://192.168.2.144/dingfang/public/admin/house/delete",
					data:{
						"houseNumber" : houseNumber,
					},
					success:function(res){
						
						var Res = JSON.parse(res);
						console.log(Res)
						if(Res.code == "true"){
							$(that).parent().parent().remove();
							window.location.reload();
						}
					},
					error:function(){
						
					}
				});	
			})
			$(".noDel").click(function(){
				$(this).parent().parent().remove();
			})
			
		}
	}
}
//点击新增户型
function newAdd(){
	$(".newAddOuter")[0].style.cssText = "display: block;";
}
//新增户号里的返回
function newAddBack(){
	$(".newAddOuter")[0].style.cssText = "display: none;";		
}
//新增户型里的图片onchange
$('#newHomeImg').on("change",function(){
	$(".newAddImgText").text($(this).val()); 
})
//新增户型里的图片预览
$(".newAddPreview").on("click",function(){
	if($('#newHomeImg')[0].files[0]){
		function getObjectURL(file) {
		    var url = null ; 
		    if (window.createObjectURL!=undefined) { // basic
		        url = window.createObjectURL(file) ;
		    } else if (window.URL!=undefined) { // mozilla(firefox)
		        url = window.URL.createObjectURL(file) ;
		    } else if (window.webkitURL!=undefined) { // webkit or chrome
		        url = window.webkitURL.createObjectURL(file) ;
		    }
		    return url ; 
		}
			var str = '<img id="show_img" src="" />';
			$(".previewPic").html(str);
		    var strsrc=getObjectURL($('#newHomeImg')[0].files[0]);
		    $("#show_img").attr("src",strsrc);
	}else{
		alert("请选择图片后再预览");
	}

})
//新增户型里的保存
	function newAddConserve(){
		var newAddOne = $("#homeName")[0];
		var newAddTwo = $("#houseName")[0];
		var newAddFour = $("#description")[0];
		var newAddThree = $("#homeKeyCode")[0];
		var newAddFive = $("#homeSize")[0];
		var Formdata = new FormData();
		Formdata.append('file', $('#newHomeImg')[0].files[0]);
		$.ajax({
		    url: 'http://106.14.248.127:8080/api/v1/upload',
		    type: 'POST',
		    cache: false,
		    data: Formdata,
		    processData: false,
		    contentType: false,
		    success : function(res){
		    	if(res.code==0){
		    		var imgSrc = res.access_url;
		    		$.ajax({
		    			type:"post",
		    			url:"http://192.168.2.144/dingfang/public/admin/house/add",
		    			data:{
		    				"projectNumber" : val,
		    				"houseName" : newAddOne.value,
		    				"houseType" : newAddTwo.value,
		    				"houseDesc" : newAddFour.value,
		    				"keyWord" : newAddThree.value,
		    				"houseArea" : newAddFive.value,
		    				"fileUrl" : imgSrc,
		    			},
		    			success:function(res){
		    				var Res = eval('('+res+')');
		    				if(Res.code=="true"){
		    					$(".newAddOuter")[0].style.cssText = "display: none;";
		    					window.location.reload()
		    				}
		    			},
		    			error:function(res){
		    				console.log(res);
		    			},
		    		});
		    	}
		    	
		    },
		    error : function(res){
		    	alert("error")
		    	console.log(res)
		    }
		});    		
	}
//					点击修改按钮
function reviseList(Data){
$(".resiveList").on("click",function(){
var houseNumber = Data[$(this).index(".resiveList")].id;
var str = '<div class="newAddHouse">\
		<div class="newAddOuter reviseOuter">\
			<div class="HouseholdNav">\
				<ul>\
					<li>修改户型</li>\
				</ul>\
				<span class="newAddBack reviseBack"><img width="55px" height="60px" src="http://192.168.2.144/dingfang/common/img/back.jpg"/></span>\
			</div>\
			<div class="newAddBox">\
				<ul class="newAddContent">\
					<li>\
						<span>户型名称:</span>\
						<span>\
							<input type="text" name="newHouseNamber" class="homeName" id="homeName" placeholder="请输入户型名称" />\
						</span>\
						<span>\
						</span>\
					</li>\
					<li>\
						<span>房型名称:</span>\
						<span>\
							<select id="houseName" class="houseName" name="">\
								<option value="" style="display: none;">切换房型</option>\
								<option value="21">4室2厅2卫</option>\
								<option value="22">2室2厅1卫</option>\
								<option value="23">3室2厅2卫</option>\
								<option value="24">3室2厅1卫</option>\
							</select>\
						</span>\
						<span>如 : 3房2厅1卫</span>\
					</li>\
					<li>\
						<span>户型关键词:</span>\
						<span><input type="text" name="newFloor" id="homeKeyCode" class="homeKeyCode" placeholder="请输入户型关键词" /></span>\
						<span>多个关键词请用“空格”隔开</span>\
					</li>\
					<li>\
						<span>\
							户型描述:\
						</span>\
						<span>\
							<input type="text" name="newFloor" class="description" placeholder="请输入户型描述" />\
						</span>\
						<span>\
							请输入户型的描述，如三面向阳，采光好，不潮湿等等。\
						</span>\
					</li>\
					<li>\
						<span>户型面积:</span>\
						<span>\
							<input type="text" name="newHomeNamber" id="homeSize" class="homeSize" placeholder="请输入户型建筑面积" />\
						</span>\
						<span>单位m²(平方米)</span>\
					</li>\
					<li>\
						<span>户型图片:</span>\
						<span>\
							<label class="newAddImg">\
								<div class="newAddImgText" id="newAddImgText">选择户型图片</div>\
								<input type="file" name="newHomeNamber" id="newHomeImg" class="newHomeImg" placeholder="提交户型图片" style="display: none;"/>\
							</label>\
						</span>\
						<span><div class="newAddPreview revisePreview">预览...</div></span>\
					</li>\
					<li>\
						<span></span>\
						<span>\
							<div class="newAddConserve">\
								<p onclick="reviseConserve('+houseNumber+')">保存</p>\
								<p>继续添加</p>\
							</div>\
						</span>\
						<span></span>\
					</li>\
				</ul>\
				<div class="previewPic"></div>\
			</div>\
		</div>\
		</div>'	
	$("body").append(str);
	$(".newAddHouse").show();
	$(".reviseOuter").show();
	$(".reviseBack").click(function(){
		$(this).parent().parent().remove();
	})
	preview($(".revisePreview"),$(".previewPic"))
	changeImg($('.newHomeImg'),$('#newAddImgText'))
})	
}
//修改户型页面的保存
function reviseConserve(houseId){
	var newAddOne = $(".homeName")[0];
	var newAddTwo = $(".houseName")[0];
	var newAddThree = $(".homeKeyCode")[0];
	var newAddFour = $(".description")[0];
	var newAddFive = $(".homeSize")[0];
	var Formdata = new FormData();
	var houseNumber = houseId;
	var that = this;
	Formdata.append('file', $('.newHomeImg')[0].files[0]);
	$.ajax({
	    url: 'http://106.14.248.127:8080/api/v1/upload',
	    type: 'POST',
	    cache: false,
	    data: Formdata,
	    processData: false,
	    contentType: false,
	    success : function(res){
	    	if(res.code==0){
	    		$.ajax({
	    			type:"post",
	    			url:"http://192.168.2.144/dingfang/public/admin/house/editHouse",
	    			data:{
	    				"houseNumber" : houseNumber,
	    				"houseName" : newAddOne.value,
	    				"houseType" : newAddTwo.value,
	    				"keyWord" : newAddThree.value,
	    				"houseDesc" : newAddFour.value,
	    				"houseArea" : newAddFive.value,
	    				"fileUrl" : imgSrc,
	    			},
	    			success:function(res){
	    				var Res = eval('('+res+')');
	    				if(Res.code=="true"){
	    					$(that).parent().parent().parent().parent().parent().parent().parent().remove();
	    					window.location.reload()
	    				}
	    			},
	    			error:function(res){
	    				console.log(res);
	    			},
	    		});
	    	}
	    },
	    error : function(res){
	    	console.log(res)
	    }
	});
}
//修改户型里的图片预览
function preview( previewBtn,previewPic ){
	previewBtn.on("click",function(){
		if($('.newHomeImg')[0].files[0]){
			function getObjectURL(file) {
			    var url = null ; 
			    if (window.createObjectURL!=undefined) { // basic
			        url = window.createObjectURL(file) ;
			    } else if (window.URL!=undefined) { // mozilla(firefox)
			        url = window.URL.createObjectURL(file) ;
			    } else if (window.webkitURL!=undefined) { // webkit or chrome
			        url = window.webkitURL.createObjectURL(file) ;
			    }
			    return url ; 
			}
				var Str = '<img class="show_img" src="" />';
				previewPic.html(Str);
			    var strsrc=getObjectURL($('.newHomeImg')[0].files[0]);
			    $(".show_img").attr("src",strsrc);
		}else{
			alert("请选择图片后再预览");
		}
	})
}
//新增户型里的图片onchange
function changeImg( filePic,fileInner ){
	filePic.on("change",function(){
		fileInner.text($(this).val()); 
	})	
}
//关联方案
function AssociationScheme(Data){
	$(".associationScheme").on("click",function(){
		var houseNumber = Data[$(this).index(".associationScheme")].id;
		$.ajax({
			type:"post",
			url:"http://192.168.2.144/dingfang/public/admin/house/showScheme",
			async:true,
			data:{
				"houseNumber" : houseNumber,
			},
			success:function(res){
				var Res = JSON.parse( res );
				console.log(Res);
				var data = Res.data;
				if(Res.code == "true"){
					var Str = '<div class="windows" id="windows"><div class="BindingUnitBox"><ul>';
					for(var i=0;i<data.length;i++){
						Str += '<li class="BindingUnitList TypeList" style="height: 222px;" data-id="'+data[i].id+'" >\
												<dl style="height: 160px;width: 170px;">\
													<dt style="height: 130px;width: 170px;"><img style="height: 130px;width: 170px;" src="'+data[i].pic_url+'" /></dt>\
													<dd style="width: 170px;color: gray;">\
														<div style="height: 30px;"><p style="height: 20px;">'+data[i].name+' '+data[i].vaules+'</p></div>\
														<span style="height: 20px;">设计师 : '+data[i].designer+'</span>\
													</dd>\
												</dl>\
												<div class="confirm" style="margin-right: 10px;">✔<span class="conf" style="display: none;">'+data[i].house_id+'</span></div>\
											</li>';			
					}
					Str += '</ul><div class="closeWindows">×</div></div></div>';
					$('.content', window.parent.document).append(Str);
					var Conf = parent.document.getElementsByClassName("conf");
					var ConFirm  = parent.document.getElementsByClassName("confirm");
					console.log(ConFirm.length)
					for(var i=0;i<Conf.length;i++){
						if(Conf[i].innerHTML !== "null"){
							Conf[i].parentNode.style.background = "orange";
							Conf[i].parentNode.parentNode.setAttribute("greeting",1);
						}else{
							Conf[i].parentNode.parentNode.setAttribute("greeting",0);
						}
					}
					$(".TypeList",window.parent.document).click(function(){
						if($(this).attr("greeting") == 0){
							$(this).find(".confirm").css("background","orange");
							$(this).attr("greeting",1);
// 							alert($(this).attr("greeting"));
						}else{
							$(this).find(".confirm").css("background","#aaa");
							$(this).attr("greeting",0);
// 							alert($(this).attr("greeting"));
						}
						
					})
					$('.windows', window.parent.document).css("display","block");
					$(".closeWindows",window.parent.document).click(function(){
						var that = this;
						var arr = new Array();
						for(var i=0;i<ConFirm.length;i++){
							console.log(i)
							if(ConFirm[i].parentNode.getAttribute("greeting") == 1){
								arr.push(ConFirm[i].parentNode.getAttribute("data-id"));
							}
						}
						console.log(arr)
						
						console.log(houseNumber)
						console.log(JSON.stringify(arr))
						$.ajax({
							type:"post",
							url:"http://192.168.2.144/dingfang/public/admin/house/relScheme",
							data:{
								"houseNumber" : houseNumber,
								"schemeNumber" : JSON.stringify(arr),
							},
							async:true,
							success:function(res){
								window.location.reload();
								var Res = JSON.parse(res);
								console.log(Res)
								if(Res.code=="true"){
									$('.windows', window.parent.document).hide();
									$(that).parent().parent().remove();
								}else if(Res.message=="所选方案已被别的户型绑定"){
									alert("所选方案已被别的户型绑定");
									$('.windows', window.parent.document).hide();
									$(that).parent().parent().remove();
								}
								
							},
							error:function(res){
								console.log(res);
							}
						});
						
					});
				}
			}
		});
		
	})
}
//关联房号
function AssociationHouseNumber(Data){
	$(".associationHouseNumber").click(function(){
		var houseTypeId = Data[$(this).index(".associationHouseNumber")].id;
		$.ajax({
			type:"post",
			url:"http://192.168.2.144/dingfang/public/admin/house/showHouseNo",
			data:{
				"projectNumber" : val,
				"houseNumber" : houseTypeId,
			},
			async:true,
			success:function(res){
				var Res = JSON.parse(res);
				console.log(Res);
				if(Res.code == "true"){
					var Data = Res.data;
					console.log(Data);
					var Str = '<div class="windows" id="windows"><div class="BindingUnitBox" style="overflow-y: auto;"><ul>';
					for(var i=0;i<Data.length;i++){
						Str += '<li class="buildingId" buildingId = '+Data[i].buildingId+' style="width: 100%;margin: 5px;list-style: none;overflow:hidden;height: auto;"><p style="background: #efefef;width: 100%;height: 30px;color: black;font-size: 14px;">'+Data[i].buildingName+'号楼</p>'
						var unitNumber = Data[i].unitNumber;
						for(var j in unitNumber){
							Str += '<table class = "unitId" unitId = "'+unitNumber[j].unitNo+'"  border="" style="width: 268px;height: 175px;float: left;margin: 2px;border: 1px solid #efefef;"><tr><th style="height: 30px;border: 1px solid #efefef;color: #333;font-weight: 500;font-size: 13px;">'+unitNumber[j].unitNo+'单元</th></tr><tr>'
							var houseNo = unitNumber[j].houseNo;
							for(var k=0;k<houseNo.length;k++){
								Str += '<td houseNo="'+houseNo[k].house+'" class="houseNo" style="width: 59px;height:50px;float: left;text-align: center;margin: 2px;cursor: pointer;background: #fbfbfb;font-size: 13px;padding-top: 10px;border: 1.5px solid #efefef;border-radius: 3px;">'+houseNo[k].house+'<br/><div class="houseChoice" isHouse = '+houseNo[k].isHouse+' style="width: 20px;height: 20px;background: gray;border-radius: 50%;text-align: center;line-height: 20px;color: #FFF;margin: 0 auto;">✔</div></td>'
							}
							Str += '</tr></table>';
						}
						Str += '</li>'
					}
					Str += '</ul><div class="closeWindows">×</div></div></div>';
					$('.content', window.parent.document).append(Str);
					$('.windows', window.parent.document).css("display","block");
					var oHouseChoice = window.parent.document.getElementsByClassName("houseChoice");
					for(var i =0;i<oHouseChoice.length;i++){
						if(oHouseChoice[i].getAttribute("isHouse")=="1"){
							oHouseChoice[i].style.background = "orange";
						}
						oHouseChoice[i].parentNode.index = i;
						oHouseChoice[i].parentNode.onclick = function(){
							if(this.getElementsByClassName("houseChoice")[0].getAttribute("isHouse") == "0"){
								this.getElementsByClassName("houseChoice")[0].style.background = "orange";
								this.getElementsByClassName("houseChoice")[0].setAttribute("isHouse","1");
							}else{
								this.getElementsByClassName("houseChoice")[0].style.background = "gray";
								this.getElementsByClassName("houseChoice")[0].setAttribute("isHouse","0");
							}
							
						}
					}
					$(".closeWindows",window.parent.document).click(function(){
						var that = this;
						var row1 = '{\
							"projectNumber":'+val+',\
   							"houseNumber": '+houseTypeId+',\
							"data": ['								        
						var arr = new Array();
						for(var i=0;i<$(".buildingId", window.parent.document).length;i++){
							row1 += '{\
								            "buildingId": '+$(".buildingId", window.parent.document)[i].getAttribute("buildingId")+',\
								            "dataUnit": ['
							arr.push($(".buildingId", window.parent.document)[i].getAttribute("buildingId"));
							var unitId = $(".buildingId", window.parent.document)[i].getElementsByClassName("unitId");
							var arrUnit = new Array();
							for(var j=0;j<unitId.length;j++){
								row1 += '{\
						                    "unitId": '+unitId[j].getAttribute("unitId")+',\
						                    "dataHouse": ['
								var houseNo = unitId[j].getElementsByClassName("houseNo");
								var arrHouse = new Array();
								for(var k=0;k<houseNo.length;k++){
									console.log(houseNo[k].getElementsByClassName("houseChoice")[0].getAttribute("isHouse"));
									if(houseNo[k].getElementsByClassName("houseChoice")[0].getAttribute("isHouse") == "1"){
										arrHouse.push(parseInt(houseNo[k].getAttribute("houseNo")));
									}
								}
								row1+='['+arrHouse+']';
								arrUnit.push(arrHouse);
								row1 += ']},'
							}
							row1=row1.substring(0,row1.length-1)
							arr.push(arrUnit);
							row1 += ']},'
						}
						 row1=row1.substring(0,row1.length-1)
							row1+=']}'
							row1  =   row1.replace(/\s/ig,'');
						console.log(row1)
//						console.log(JSON.parse(row1));
						$.ajax({
							type:"post",
							url:"http://192.168.2.144/dingfang/public/admin/house/relHouseNo",
							data:{
								"data" :row1,
							},
							async:true,
							success:function(res){
								var Res = JSON.parse(res);
								console.log(Res);
								if(Res.code=="true"){
									$('.windows', window.parent.document).hide(100);
									$(that).parent().parent().remove();
								}
							},
							error:function(res){
								console.log(res);
							}
						});
						
					});
 				}
			},
			error:function(res){
				console.log(res);
			}
		});
	})
}
