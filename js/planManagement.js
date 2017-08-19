function page(data){
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
		AssociationhouseType(data);//关联房号
		delList(data);//删除方案
		planRevise(data);//点击修改按妞
		return false;
	}
	
};
//编辑器(左,右)
function Editor(input, preview) {
    function Editor(input, preview) {
        this.update = function () {
          preview.innerHTML = markdown.toHTML(input.value);
        };
        input.editor = this;
        this.update();
      }
      var X = function (id) { return document.getElementById(id); };
      new Editor(X("text-input"), X("preview"));
}
var X = function (id) { return document.getElementById(id); };
new Editor(X("text-input"), X("preview"));
//获取每个方案List
var val = sessionStorage.getItem("MarketChoice");
$.ajax({
	type:"post",
	url:"http://192.168.2.144/dingfang/public/admin/scheme",
	async:true,
	success:function(res){
		var Res = JSON.parse(res);
		console.log(Res)
		var data = Res.data;
		if(Res.code == "true"){
			var str = '';
			for(var i=0;i<data.length;i++){
				str+='<li class="planList result" house_id="'+data[i].house_id+'" houseId="'+data[i].id+'">\
						<div class="houseListBox">\
							<img class="houseList_img" src="'+data[i].pic_url+'"/>\
							<div class="houseCognate">\
								<span class="associationHouseNumber">关联户型</span>\
							</div>\
							<div class="houseContent">\
								<h4>'+data[i].name+''+data[i].vaules+'</h4>\
								<p>'+data[i].design_idea+'</p>\
								<p>设计师 : '+data[i].designer+'</p>\
							</div>\
							<div class="houseRevise">\
								<img class="reviseList" src="http://192.168.2.144/dingfang/common/img/revise.jpg"/>\
								<img class="delList" src="http://192.168.2.144/dingfang/common/img/del.jpg"/>\
							</div>\
						</div>\
					</li>'
			}
			$("#hiddenresult").html(str);
			for(var i=0;i<$(".planList").length;i++){
				if(data[i].delete_time!==null){
					$(".houseList_img")[i].style.cssText = "-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);-ms-filter:grayscale(100%);-o-filter: grayscale(100%);filter: grayscale(100%);filter: gray; ";
				}
			}
			page(data);//分页显示
		}
	},
	error:function(res){
		
	}
});
function mouse(){
	var List = $(".houseImgList")[0].getElementsByClassName("planList");
	for(var i=0;i<List.length;i++){
		List[i].index= i;
		List[i].onmouseover = function(){
			$(".houseCognate")[this.index].style.cssText = "display:block;";
		}
		List[i].onmouseout = function(){
			$(".houseCognate")[this.index].style.cssText = "display:none;";
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
//新增户型里的保存
function newAddConserve(){
	var newAddOne = $("#homeName")[0];
	var newAddTwo = $("#houseKeyWord")[0];
	var newAddFive = $("#text-input")[0];
	var Formdata = new FormData();
	var that = this;
	Formdata.append('file', $('#coverImageUp')[0].files[0]);
	var formData = new FormData();
	var that = this;
	formData.append('file', $('#PanoramaUp')[0].files[0]);
	var arr = new Array();
	$.when($.ajax({
	    url: 'http://106.14.248.127:8080/api/v1/upload',
	    type: 'POST',
	    cache: false,
	    data: Formdata,
	    processData: false,
	    contentType: false,
	    success : function(res){
	    	console.log(res);
	    	if(res.code==0){
	    		var imageOne = res.access_url;
	    		arr.push(imageOne);
	    	}
	    },
	    error : function(res){
	    	console.log(res);
	    }
	}), $.ajax({
	    url: 'http://106.14.248.127:8080/api/v1/upload',
	    type: 'POST',
	    cache: false,
	    data: formData,
	    processData: false,
	    contentType: false,
	    success : function(res){
	    	console.log(res);
	    	if(res.code==0){
	    		var imageTwo = res.access_url;
	    		arr.push(imageTwo);
	    	}
	    },
	    error : function(res){
	    	console.log(res);
	    }
	})).then(function(){
	    $.ajax({
	    	type:"post",
	    	url:"http://192.168.2.144/dingfang/public/admin/scheme/add",
	    	data : {
	    		"projectNumber" : val,//楼盘ID
	    		"schemeName" : schemeName.value,//方案名称
	    		"keyWord" : keyWord.value,//关键词
	    		"schemeDesc" : schemeDesc.value,//方案描述
	    		"schemePic" : imgOne,//封面图
	    		"schemePhoto" : imgTwo,//全景图
	    	},
	    	success : function(res){
	    		var Res = JSON.parse(res);
	    		console.log(Res)
	    		if(Res.code == "true"){
	    			$(".newAddOuter").hide(50);
	    			window.location.reload();
	    		}
	    	},
	    	error : function(res){
	    		console.log(res)
	    	}
	    });
	})
}
//两张上传的大图 点击显示路径
$("#coverImageUp").change(function(){
	$(".coverImageBox label").html($(this).val())
})
$("#PanoramaUp").change(function(){
	$(".PanoramaBox label").html($(this).val())
})
//点击预览功能
//封面图片预览
$(".coverImageLook").click(function(){
	if($('#coverImageUp')[0].files[0]){
		var str = '<div class="coverImageOuter imageOuter"><img src=""/><div>X</div></div>'
		$("body").append(str);
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
		    var strsrc=getObjectURL($('#coverImageUp')[0].files[0]);
		    $(".coverImageOuter img").attr("src",strsrc);
		    $(".coverImageOuter div").click(function(){
		    	$(this).parent().remove();
		    })
	}else{
		alert("请选点击择封面图片后再预览");
	}
})
//全景图片预览
$(".PanoramaLook").click(function(){
	if($('#PanoramaUp')[0].files[0]){
		var str = '<div class="PanoramaOuter imageOuter"><img src=""/><div>X</div></div>'
		$("body").append(str);
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
		    var strsrc=getObjectURL($('#PanoramaUp')[0].files[0]);
		    $(".PanoramaOuter img").attr("src",strsrc);
		    $(".PanoramaOuter div").click(function(){
		    	$(this).parent().remove();
		    })
	}else{
		alert("请选点击择全景图片后再预览");
	}
})
//点击输入框预览显示
$("#text-input").click(function(){
	$("#preview").show(1000);
})
//关联户型
function AssociationhouseType(Data){
	$(".associationHouseNumber").on("click",function(){
		var houseNumber = Data[$(this).index(".associationHouseNumber")].house_id;//户型id
		var schemeNumber = Data[$(this).index(".associationHouseNumber")].id;//方案id
		console.log(val);
		console.log(houseNumber);
		console.log(schemeNumber);
		$.ajax({
			type:"post",
			url:"http://192.168.2.144/dingfang/public/admin/scheme/showHouse",
			async:true,
			data:{
				"projectNumber" : val,
				"schemeNumber" : schemeNumber,
			},
			success:function(res){
				var Res = JSON.parse( res );
				console.log(Res);
				var data = Res.data;
				if(Res.code == "true"){
					var Str = '<div class="windows" id="windows"><div class="BindingUnitBox"><ul>';
					for(var i=0;i<data.length;i++){
						Str += '<li class="BindingUnitList TypeList" style="height: 290px;" data-id="'+data[i].id+'" >\
												<dl style="height: 232px;width: 170px;">\
													<dt style="height: 165px;width: 170px;"><img style="height: 170px;width: 170px;" src="'+data[i].pic_url+'" /></dt>\
													<dd style="width: 170px;color: #222;">\
														<div style="height: 55px;">\
															<p style="height: 20px;font-size: 14px;color: #000;">'+data[i].name+' '+data[i].vaules+'</p>\
															<p style="height: 35px;">'+data[i].desc+'</p>\
														</div>\
														<p style="height: 17px;">面积: '+data[i].area+'</p>\
														<span style="height: 20px;">设计师 : '+data[i].designer+'</span>\
													</dd>\
												</dl>\
												<div class="confirm" style="margin-right: 10px;">✔<span class="conf" style="display: none;">'+data[i].schemeid+'</span></div>\
											</li>';
					}
					Str += '</ul><div class="closeWindows">×</div></div></div>';
					$('.content', window.parent.document).append(Str);
					var Conf = parent.document.getElementsByClassName("conf");
					var ConFirm  = parent.document.getElementsByClassName("confirm");					
					for(var i=0;i<Conf.length;i++){
						if(Conf[i].innerHTML == schemeNumber){
							Conf[i].parentNode.style.background = "orange";
							$(".confirm",window.parent.document).eq(i).attr("great",1);
						}else{
							Conf[i].parentNode.style.background = "#aaa";
							$(".confirm",window.parent.document).eq(i).attr("great",0);
						}
					}
					$(".TypeList",window.parent.document).click(function(){
						if($(".confirm",window.parent.document).eq($(this).index()).attr("great") == 1){
							$(".confirm",window.parent.document).each(function(){
								$(this).css("background","#aaa");
								$(this).attr("great","0");
							});
							$(".confirm",window.parent.document).eq($(this).index()).css("background","#aaa");
							$(".confirm",window.parent.document).eq($(this).index()).attr("great","0");

						}else if($(".confirm",window.parent.document).eq($(this).index()).attr("great") == 0){
							$(".confirm",window.parent.document).each(function(){
								$(this).css("background","#aaa");
								$(this).attr("great","0");
							});
							$(".confirm",window.parent.document).eq($(this).index()).css("background","orange");
							$(".confirm",window.parent.document).eq($(this).index()).attr("great","1");
						}
					})
					$('.windows', window.parent.document).css("display","block");
					$(".closeWindows",window.parent.document).click(function(){
						var that = this;
						var dataId = 0;
						for(var j = 0; j<$(".confirm",window.parent.document).length;j++){
							if($(".confirm",window.parent.document)[j].getAttribute("great") == 1){
								dataId = $(".TypeList",window.parent.document)[j].getAttribute("data-id");
							}
						}
						console.log(dataId)
						console.log(schemeNumber)
						$.ajax({
							type:"post",
							url:"http://192.168.2.144/dingfang/public/admin/scheme/relHouse",
							data:{
								"houseNumber" : dataId,
								"schemeNumber" : schemeNumber,
							},
							async:true,
							success:function(res){
								var Res = JSON.parse(res);
								console.log(Res)
								if(Res.code=="true"){
									$('.windows', window.parent.document).hide(100);
									$(that).parent().parent().remove();
									window.location.reload();
								}else if(Res.message=="所选方案已被别的户型绑定"){
									alert("所选方案已被别的户型绑定");
									$('.windows', window.parent.document).remove();
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
//点击删除按钮
function delList(Data){
	for(var i =0;i<Data.length;i++){
		$(".delList")[i].index = i;
		$(".delList")[i].onclick = function(){
			console.log(Data[this.index].id);
			var schemeNumber = Data[this.index].id;
			var str = '<div class="delWindow"><div class="delWindow_content"><p>是否删除该方案?</p><span class="yesDel">是</span><span class="noDel">否</span></div></div>';
			$("body").append(str);
			$(".yesDel").click(function(){
				var that = this;
				$.ajax({
					type:"post",
					url:"http://192.168.2.144/dingfang/public/admin/scheme/delete",
					data:{
						"schemeNumber" : schemeNumber,
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
//点击修改按钮
function planRevise(Data){
		$(".reviseList").click(function(){
			var schemeNumber = Data[$(this).index(".reviseList")].id;
			$.ajax({
				type:"post",
				url:"http://192.168.2.144/dingfang/public/admin/scheme/showScheme",
				async:true,
				data : {
					"schemeNumber" : schemeNumber
				},
				success : function(res){
					var Res = JSON.parse(res);
 					console.log(Res);
//					console.log(Res.data.dataOverall[0].pic_url);
//					console.log(Res.data.dataPic[0].pic_url);
//					console.log(Res.data.dataScheme[0].name);
//					console.log(Res.data.dataScheme[0].desc);
					$(".newAddOuter").show(100);
					if(Res.data.dataScheme.length == 0){
						$("#homeName").val("");
					}else if(Res.data.dataScheme.length == 1){
						$("#homeName").val(Res.data.dataScheme[0].name);
					}
					if(Res.data.dataScheme.length == 0){
						$("#text-input").val("");
					}else if(Res.data.dataScheme.length == 1){
						$("#text-input").val(Res.data.dataScheme[0].desc);
					}
					if(Res.data.dataPic.length == 0){
						$(".coverImageBox label").html("");
						var picId = "";
					}else if(Res.data.dataPic.length == 1){
						$(".coverImageBox label").html(Res.data.dataPic[0].pic_url);
						var picId = Res.data.dataPic[0].id;
					}
					if(Res.data.dataOverall.length == 0){
						$(".PanoramaBox label").html("");
						var overallId = "";
					}else if(Res.data.dataOverall.length == 1){
						$(".PanoramaBox label").html(Res.data.dataOverall[0].pic_url);
						var overallId = Res.data.dataOverall[0].id;
					}
					$(".newConserver").removeAttr("onclick");

//					点击保存按钮
					$(".newConserver").click(function(){
						var Formdata = new FormData();
						Formdata.append('file', $('#coverImageUp')[0].files[0]);
						var ajax01 = $.ajax({
						    url: 'http://106.14.248.127:8080/api/v1/upload',
						    type: 'POST',
						    async:false,
						    cache: false,
						    data: Formdata,
						    processData: false,
						    contentType: false,
						    success : function(res){
						    	console.log(res);
						    	if(res.code==0){
						    		var images01 = res.access_url;
						    		console.log(images01);
						    		sessionStorage.setItem("images01",images01);
						    	}
						    },
						    error : function(res){
						    	console.log(res);
						    	sessionStorage.setItem("images01","");
						    }
						})
						var formData = new FormData();
						formData.append('file', $('#PanoramaUp')[0].files[0]);
						var ajax02 = $.ajax({
						    url: 'http://106.14.248.127:8080/api/v1/upload',
						    type: 'POST',
						    async:false,
						    cache: false,
						    data: formData,
						    processData: false,
						    contentType: false,
						    success : function(res){
						    	console.log(res);
						    	if(res.code==0){
						    		var images02 = res.access_url;
						    		console.log(images02);
						    		sessionStorage.setItem("images02",images02);
						    	}
						    },
						    error : function(res){
						    	console.log(res);
						    	sessionStorage.setItem("images02","");
						    },
						})
						Up();
						function Up(){
							var schemeName = $("#homeName")[0];//方案名称
							var keyWord = $("#houseKeyWord")[0];//关键词
							var schemeDesc = $("#text-input")[0];//方案描述
							if(sessionStorage.getItem("images01")==null){
								var imgOne = "";
							}else{
								var imgOne = sessionStorage.getItem("images01");//封面图
							}
							if(sessionStorage.getItem("images02")==null){
								var imgTwo = "";
							}else{
								var imgTwo = sessionStorage.getItem("images02");//全景图
							}
						    console.log(JSON.stringify(schemeName.value));
						    console.log(JSON.stringify(keyWord.value));
						    console.log(JSON.stringify(schemeDesc.value));
						    console.log(JSON.stringify(imgOne));//更改的封面图
						    console.log(JSON.stringify(imgTwo));//更改的全景图
						  	console.log(JSON.stringify(picId));//原封面图id
						    console.log(JSON.stringify(overallId));//原全景图id
							$.ajax({
								type:"post",
								url:"http://192.168.2.144/dingfang/public/admin/scheme/editScheme",
								async:true,
								data : {
									"schemeName" : JSON.stringify(schemeName.value),//方案名称
									"keyWord" : JSON.stringify(keyWord.value),//关键词
									"schemeDesc" : JSON.stringify(schemeDesc.value),//方案描述
									"schemePic" : JSON.stringify(imgOne),//方案封面图
									"schemePhoto" : JSON.stringify(imgTwo),//方案全景图
									"picId" : JSON.stringify(picId),//之前方案封面图id
									"overallId" : JSON.stringify(overallId),//之前方案全景图id
								},
								success : function(res){
//								移除sessionStorage里面的图片路径数据
									sessionStorage.removeItem("images01");
									sessionStorage.removeItem("images02");
									window.location.reload();
									$(".newAddOuter").hide(100);
									var Res = JSON.parse(res);
									console.log(Res);
								},
								error : function(res){
									
								}
							});	
						}
						
					});
				},
				error : function(res){
					console.log(res);
				}
			});
		})
}

