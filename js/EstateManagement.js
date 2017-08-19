//	楼盘动态内容
var projectNumber = sessionStorage.getItem("MarketChoice");//楼盘的id
	if(sessionStorage.getItem("testShow")){
		$(".right_navTwoSmallBoxEst")[sessionStorage.getItem("testShow")].style.cssText = "color: #000;background: #FFF;";
		$(".navTwo_info").eq(sessionStorage.getItem("testShow")).show()
		$(".navTwo_info").eq(sessionStorage.getItem("testShow")).siblings().hide()
	}else{
		$(".right_navTwoSmallBoxEst")[0].style.cssText = "color: #000;background: #FFF;";
		$(".navTwo_info").eq(0).show()
	}
	$(".right_navTwoSmallBoxEst").click(function(){
		$(this).css({"color":"#000","background":"#FFF"});
		$(this).siblings().css({"color":"#FFF","background":"#78909c"});
		$(".navTwo_info").eq($(this).index()).show();
		$(".navTwo_info").eq($(this).index()).siblings().hide();
	})
	floorNews( projectNumber );
	function floorNews( pro ){
		$.ajax({
			type:"post",
			url:"http://192.168.2.144/dingfang/public/admin/project/projectNews",
			async:true,
			data : {
				"projectNumber" :pro,
			},
			success : function(res){
			var Res = JSON.parse(res);
			console.log(Res)
				var str = "";
				for(var i=0;i<Res.data.length;i++){
					str +='<li class="navTwo_infoLi01">'
								+'<img src="http://192.168.2.144/dingfang/common/img/biaoti.jpg" class="imgPeople"/>'
								+'<span class="tittle">'+Res.data[i].title+'</span>'
								+'<span class="name"></span>'
								+'<span class="date">'+Res.data[i].create_time+'</span>'
								+'<div class="edit">'
									+'<img src="http://192.168.2.144/dingfang/common/img/edit_L.jpg" class="modifyImg"/>'
									+'<img src="http://192.168.2.144/dingfang/common/img/edit_C.jpg" class="revise" />'
									+'<img src="http://192.168.2.144/dingfang/common/img/edit_R.jpg" class="delete" />'
								+'<div>'
						+'</li>';
				}
				$(".navTwo_infoList").append(str);
				for(var i=0;i<Res.data.length;i++){ //给元素附带隐藏数据
					$(".navTwo_infoLi01").eq(i).data("ID",Res.data[i].id);
					$(".navTwo_infoLi01").eq(i).data("delete_time",Res.data[i].delete_time);
					$(".navTwo_infoLi01").eq(i).data("status",Res.data[i].status);
				}
				$(".navTwo_infoLi").insertBefore($(".navTwo_add"));
			},
		}).done(function(res){
			$(".modifyImg").click(function(){//		复制
				alert(1)
			})
			$(".revise").click(function(){//		修改
				alert(2)
			})
			$(".delete").click(function(){//		删除
				var newsId = $(".navTwo_infoLi01").eq($(this).index(".delete")).data("ID");
				var that = this;
				var str = '<div class="delWindow"><div class="delWindow_content"><p>是否删除该栋楼?</p><span class="yesDel">是</span><span class="noDel">否</span></div></div>';
				$("body").append(str);
				$(".yesDel").click(function(){
					var That = this;
					$.ajax({
						type:"post",
						url:"http://192.168.2.144/dingfang/public/admin/project/delNews",
						data:{
							"newsNumber" : newsId,
						},
						success:function(res){
							var Res = JSON.parse(res);
							console.log(Res)
							if(Res.code == "true"){
								$(That).parent().parent().remove();
	//							$(that).parent().parent().remove();
								window.location.reload();
							}
						},
					});	
				})
				$(".noDel").click(function(){
					$(this).parent().parent().remove();
				})
			})
		})
	}
//评论管理内容
comment( projectNumber );
function comment( pro ){
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/project/projectComment",
		data : {
			"projectNumber" : pro,
		},
		success : function(res){
			var Res = JSON.parse(res);
			console.log(Res)
			var str = "";
			for(var i=0;i<Res.data.length;i++){
				str +='<li class="navTwo_infoLi02">'
							+'<img src="'+Res.data[i].head_pic+'" class="imgPeople_Comment"/>'
							+'<span class="tittle_Comment">'+Res.data[i].nick+'</span>'
							+'<span class="name_Comment">'+Res.data[i].content+'</span>'
							+'<span class="date_Comment">'+Res.data[i].create_at+'</span>'
							+'<div class="edit_Comment">'
								+'<img src="http://192.168.2.144/dingfang/common/img/edit_L.jpg" class="modifyImg02"/>'
								+'<img src="http://192.168.2.144/dingfang/common/img/edit_C.jpg" class="revise02" />'
								+'<img src="http://192.168.2.144/dingfang/common/img/edit_R.jpg" class="delete02" />'
							+'<div>'
					+'</li>';
			}
			$(".comment_info").append(str);
			for(var i=0;i<Res.data.length;i++){//元素附带隐藏的数据
				$(".navTwo_infoLi02").eq(i).data("ID",Res.data[i].id);
				$(".navTwo_infoLi02").eq(i).data("delete_time",Res.data[i].delete_time);
				$(".navTwo_infoLi02").eq(i).data("status",Res.data[i].status);
			}
		},
	}).done(function(){
		$(".modifyImg02").click(function(){//		复制
			alert(1)
		})
		$(".revise02").click(function(){//		修改
			alert(2)
		})
		$(".delete02").click(function(){//		删除
			var commentId = $(".navTwo_infoLi02").eq($(this).index(".delete02")).data("ID");
			var that = this;
			var str = '<div class="delWindow"><div class="delWindow_content"><p>是否删除该栋楼?</p><span class="yesDel">是</span><span class="noDel">否</span></div></div>';
			$("body").append(str);
			$(".yesDel").click(function(){
				var That = this;
				$.ajax({
					type:"post",
					url:"http://192.168.2.144/dingfang/public/admin/project/delComment",
					data:{
						"commentNumber" : commentId,
					},
					success:function(res){
						var Res = JSON.parse(res);
						console.log(Res);
						if(Res.code == "true"){
							$(That).parent().parent().remove();
//							$(that).parent().parent().remove();
							window.location.reload();
						}
					},
				});	
			})
			$(".noDel").click(function(){
				$(this).parent().parent().remove();
			})
		})	
	})
}
//业主公告
ownerNews( projectNumber );
function ownerNews( pro ){
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/project/ownerNews",
		async:true,
		data : {
			"projectNumber" : pro,
		},
		success : function(res){
			var Res = JSON.parse(res);
			console.log(Res)
			var str = "";
			for(var i=0;i<Res.data.length;i++){
				str +='<li class="OwnersNotice_infoLi">'
							+'<img src="" class="imgPeople_OwnersNotice"/>'
							+'<span class="tittle_OwnersNotice">'+Res.data[i].title+'</span>'
							+'<span class="name_OwnersNotice"></span>'
							+'<span class="date_OwnersNotice">'+Res.data[i].create_time+'</span>'
							+'<div class="edit_OwnersNotice">'
								+'<img src="http://192.168.2.144/dingfang/common/img/edit_L.jpg" class="modifyImg03"/>'
								+'<img src="http://192.168.2.144/dingfang/common/img/edit_C.jpg" class="revise03" />'
								+'<img src="http://192.168.2.144/dingfang/common/img/edit_R.jpg" class="delete03" />'
							+'<div>'
					+'</li>';
			}
			for(var i=0;i<Res.length;i++){//隐藏传值
				$(".OwnersNotice_infoLi").eq(i).data("ID",Res.data[i].id);
				$(".OwnersNotice_infoLi").eq(i).data("delete_time",Res.data[i].delete_time);
				$(".OwnersNotice_infoLi").eq(i).data("status",Res.data[i].status);
			}
			$(".OwnersNotice").append(str);
			$(".OwnersNotice_infoLi").insertBefore($(".OwnersNotice_add"));
		},
	}).done(function(){
		$(".modifyImg03").click(function(){//		复制
			alert(1)
		})
		$(".revise03").click(function(){//		修改
			alert(2)
		})
		$(".delete03").click(function(){//		删除
			var ownerNewsId = $(".navTwo_infoLi03").eq($(this).index(".delete03")).data("ID");
			var that = this;
			var str = '<div class="delWindow"><div class="delWindow_content"><p>是否删除该栋楼?</p><span class="yesDel">是</span><span class="noDel">否</span></div></div>';
			$("body").append(str);
			$(".yesDel").click(function(){
				var That = this;
				$.ajax({
					type:"post",
					url:"http://192.168.2.144/dingfang/public/admin/project/delOwnerNews",
					data:{
						"ownerNewsNumber" : ownerNewsId,
					},
					success:function(res){
						var Res = JSON.parse(res);
						console.log(Res)
						if(Res.code == "true"){
							$(That).parent().parent().remove();
//							$(that).parent().parent().remove();
							window.location.reload();
						}
					},
				});	
			})
			$(".noDel").click(function(){
				$(this).parent().parent().remove();
			})
		})
	})
}
//楼盘资料
projectInfo( projectNumber );
function projectInfo( pro ){
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/project/projectInfo",
		async:true,
		data : {
			"projectNumber" : pro,
		},
		success : function(res){
			var Res = JSON.parse(res);
			console.log(Res);
			$("#bulidName").val(Res.data[0].pj_name);
			$("#bulidIntr").val("");//楼盘标签词0.0
			$(".averagePrice").val(Res.data[0].avg_price);//销售均价
			$(".bulidAddress").val(Res.data[0].addr);//项目地址
			$(".buildingArea").val("");//建筑面积0.0
			$(".househoulds").val(Res.data[0].house_hold);//户数
			$(".plotRatio").val(Res.data[0].plot_ratio);//容积率
			$(".carNumber").val(Res.data[0].parking_ratio);//车位数0.0
			$(".Property").val(Res.data[0].property_type);//物业类型
			$("").val("");//产品年限0.0
			$(".endTime").val(Res.data[0].lead_time);//交付日期
			$(".buildingType").val(Res.data[0].building_type);//建筑类别
			$(".propertyCompany").val(Res.data[0].property_name);//物业公司
			$(".projectDesc").val(Res.data[0].pj_desc);//项目简介
			$(".hotTel").val(Res.data[0].hot_tel);//销售热线
			$(".salesOffices").val(Res.data[0].sales_offices);//售楼处地址
			$(".salesState").val(Res.data[0].decoration_type);//销售状况0.0.
			
		}
	}).done(function(){
		
	})
}
//项目图库
projectImages( projectNumber );
function projectImages( pro ){
	$(".navTwo_infoNav li").click(function(){
		var objId = $(this).index(".navTwo_infoNav li");
		imagesAdd( pro,objId )
	})
	$(".navTwo_infoNav li").eq(0).css({"color":"orange","font-size":"15px"});
	imagesAdd( pro,0 )
	function imagesAdd( pro,objId ){
		$.ajax({
			type:"post",
			url:"http://192.168.2.144/dingfang/public/admin/project/Images",
			async:true,
			data : {
				"projectNumber" : pro,
				"switchNumber" : objId,
			},
			success : function(res){
				$(".navTwo_infoNav li").css({"color":"#000","font-size":"14px"});
				$(".navTwo_infoNav li").eq(objId).css({"color":"orange","font-size":"15px"});
				var Res = JSON.parse(res);
				console.log(Res);
				var str = '';
				for(var i=0;i<Res.data.length;i++){
					str += '<li class="beforeImages"><img src = "'+Res.data[i].pic_url+'" /></li>'
				}
				str += '<label class="AddProjectPic">'
					+'<li>'
						+'<div>'
							+'<p>添加图片</p>'
							+'<div>+</div>'
						+'</div>'
						+'<input type="file" id="projectPhoto" style="display: none;"/>'
					+'</li>'
					+'</label>'
					+'<img id="img" / style="display: none;">';
				$(".navTwo_infoNavCont").html(str);
			}
		}).done(function(){
			$("#projectPhoto").change(function(){
				var strsrc=getObjectURL(this.files[0]);
				$(".AddProjectPic").before('<li><img src="'+strsrc+'" /></li>');
				var formData = new FormData();
				formData.append('file', $(this)[0].files[0]);
				var ajax01 = $.ajax({
				    url: 'http://106.14.248.127:8080/api/v1/upload',
				    type: 'POST',
				    async:true,
				    cache: false,
				    data: formData,
				    processData: false,
				    contentType: false,
				    beforeSend : function(){
				    	var Str = '<div class="plaseWriteing">正在上传...</div>'//上传前的befordSend 正在上传
				    	$(".AddProjectPic").prev("li").append(Str);
				    	$(".AddProjectPic").prev("li").data("data",1);
				    },
				    success : function(){
				    	for(var i=0;i<$(".navTwo_infoNavCont li").length;i++){
				    		if($(".navTwo_infoNavCont li").eq(i).data("data") == 1){
				    			$(".navTwo_infoNavCont li").eq(i).children(".plaseWriteing").remove();//完成后移除 正在上传
				    		}
				    	}
				    	
				    },
				}).done(function(res){
						if(res.code==0){
				    		var picUrl = res.access_url;
				    		console.log(pro);
				    		console.log(objId);
				    		console.log(picUrl);
				    		$.ajax({
						    	type:"post",
						    	url:"http://192.168.2.144/dingfang/public/admin/project/addImages",
						    	async:true,
						    	data : {
						    		"projectNumber" : pro,
									"imgType" : objId,
									"imgUrl" : picUrl,
						    	},
						    	success : function(res){
						    		var Res = JSON.parse(res);
						    		console.log(Res)
						    	}
						    });
				    	}
				    })
			   
			    
			})
		});
	}
}

//图片上传获取地址
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
//合作伙伴
partner( projectNumber );
function partner( pro ){
	$.ajax({
		type:"post",
		url:"http://192.168.2.144/dingfang/public/admin/project/partner",
		async:true,
		data : {
			"projectNumber" : pro,
		},
		success : function(res){
			var Res = JSON.parse(res);
			console.log(Res);
			var str = '';
			for(var i=0;i<Res.data.length;i++){
				str += '<li class="beforePartnerAdd"><img src = "'+Res.data[i].partnerPic+'"><p>'+Res.data[i].partnerType+'</p></li>'
			}
			str += '<label class="AddImg">'
						+'<li>'
							+'<div>'
								+'<p>添加图片</p>'
								+'<div>+</div>'
							+'</div>'
							+'<input type="file" id="partnerAdd" style="display: none;"/>'
						+'</li>'
					+'</label>';
			$(".partner").html(str);
		}
	}).done(function(){
		$("#partnerAdd").change(function(){
			var strsrc=getObjectURL(this.files[0]);
		    $(".AddImg").before('<li class="beforePartnerAdd"><img src="'+strsrc+'" /></li>');
		    var formData = new FormData();
		    formData.append("file",$(this)[0].files[0])
		    $.ajax({
		    	type:"post",
		    	url:"http://106.14.248.127:8080/api/v1/upload",
		    	async:true,
		    	cache: false,
			    data: formData,
			    processData: false,
			    contentType: false,
		    	data : formData,
		    	beforeSend : function(res){
		    		var Str = '<div class="plaseWriteing">正在上传...</div>'//上传前的befordSend 正在上传
			    	$(".AddImg").prev("li").append(Str);
			    	$(".AddImg").prev("li").data("data",1);
		    	},
		    	success : function(res){
			    	for(var i=0;i<$(".beforePartnerAdd").length;i++){
			    		if($(".beforePartnerAdd").eq(i).data("data") == 1){
			    			$(".beforePartnerAdd").eq(i).children(".plaseWriteing").remove();//完成后移除 正在上传
			    		}
			    	}
		    	},
		    	error : function(res){
		    		console.log(res);
		    	}
		    }).done(function(res){
		    	if(res.code==0){
		    		var picUrl = res.access_url;
		    		console.log(pro);
		    		console.log(picUrl);
//		    		$.ajax({
//				    	type:"post",
//				    	url:"http://192.168.2.144/dingfang/public/admin/project/addImages",
//				    	async:true,
//				    	data : {
//				    		"projectNumber" : pro,
//							"imgType" : objId,
//							"imgUrl" : picUrl,
//				    	},
//				    	success : function(res){
//				    		var Res = JSON.parse(res);
//				    		console.log(Res)
//				    	}
//				    });
		    	}
		    })
		})
	})
	
}

//质量纵贯线
//右边点击背景变色
$(".qualityNav span").click(function(){
	$(this).css("background","orange");
	$(this).siblings().css("background","#FFF");
})
$(".qualityList li").data("num",0)//获取数据后判断是否为1或0
$(".qualityList li").click(function(){
	if($(this).data("num") == 0){
		$(this).children("span").css("background","orange")
		$(this).data("num",1);
	}else{
		$(this).children("span").css("background","gainsboro")
		$(this).data("num",0);
	}
	
})
		


	    
			


		