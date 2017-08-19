
//	首页内容
//	首页切换
	for(var i=0;i<$(".right_navTwoSmallBoxInd").length;i++){
		$(".right_navTwoSmallBoxInd")[i].index = i;
		$(".right_navTwoSmallBoxInd")[0].style.cssText = "color: #000;background: #FFF;";
		$(".right_navTwoSmallBoxInd")[i].onclick = function(){
			for(var j=0;j<$(".right_navTwoSmallBoxInd").length;j++){
				$(".right_navTwoSmallBoxInd")[j].style.cssText = "color: #FFF;background: #78909c;"
			}
			this.style.cssText = "color: #000;background: #FFF;";
			for(var i=0;i<$(".navTwo_info").length;i++){
				$(".navTwo_info")[i].id = "" ;
			}
			$(".navTwo_info")[this.index].id = "navTwo_info" ;
		}
	}

//	楼盘管理内容
	for(var i=0;i<$(".right_navTwoSmallBoxEst").length;i++){
		$(".right_navTwoSmallBoxEst")[i].index = i;
		$(".right_navTwoSmallBoxEst")[0].style.cssText = "color: #000;background: #FFF;";
		$(".right_navTwoSmallBoxEst")[i].onclick = function(){
			for(var j=0;j<$(".right_navTwoSmallBoxEst").length;j++){
				$(".right_navTwoSmallBoxEst")[j].style.cssText = "color: #FFF;background: #78909c;";
			}
			this.style.cssText = "color: #000;background: #FFF;";
			for(var i=0;i<$(".navTwo_info").length;i++){
				$(".navTwo_info")[i].id = "" ;
			}
			$(".navTwo_info")[this.index].id = "navTwo_info" ;
			var Exp = parent.document.getElementsByClassName("Exp2");
			for(var i=0;i<Exp.length;i++){
				Exp[i].style.cssText = "color: #b8bdc1;";
			}
			Exp[this.index].style.cssText = "color: #caa815;";
		}
	}
	
	//点击三点显示编辑,删除,置顶 
	var rightImg = document.getElementsByClassName("infoLi_rightImg");
	for(var i=0;i<rightImg.length;i++){
		rightImg[i].index = i;
		rightImg[i].onmouseover = function(){
			$(".NotificationClickBox")[this.index].style.cssText = "display:block";
		}
		rightImg[i].onmouseout = function(){
			$(".NotificationClickBox")[this.index].style.cssText = "display:none";
		}
		$(".NotificationClickBox")[i].onmouseover = function(){
			this.style.cssText = "display:block";
		}
		$(".NotificationClickBox")[i].onmouseout = function(){
			this.style.cssText = "display:none";
		}
	}
//	点击添加 展现页面（公司动态）
	var AddImg = document.getElementsByClassName("Add_Img")[0];
	function add(){
		$(".createContentBox")[0].style.cssText = "display: block;";
	}
//	点击展现页面隐藏（公司动态）
	function btn_left(){
		
		$.ajaxFileUpload({
            url:'http://192.168.0.13:8080/api/v1/upload',//用于文件上传的服务器端请求地址
            secureuri:false ,//一般设置为false
            fileElementId:'files',//文件上传控件的id属性  <input type="file" id="upload" name="upload" />
            dataType: 'text',//返回值类型 一般设置为json
            success: function (message)  //服务器成功响应处理函数
            {
               alert("成功");
              	
            },
            error: function ()//服务器响应失败处理函数
            {
              alert("失败");
            }
        });
    return false;
	}
	function btn_right(){
		$(".createContentBox")[0].style.cssText = "display: none;";
	}
	//	点击展现页面隐藏(楼盘案例)
	function Add_IMG(){
		$(".createContentBox")[1].style.cssText = "display: block;";
	}
	//	点击展现页面隐藏(楼盘案例)
	function btn_leftAnli(){
		
		$.ajaxFileUpload({
            url:'http://106.14.248.127:8080/api/v1/upload',//用于文件上传的服务器端请求地址
            secureuri:false ,//一般设置为false
            fileElementId:'file-up03',//文件上传控件的id属性  <input type="file" id="upload" name="upload" />
            dataType: 'text',//返回值类型 一般设置为json
            success: function (message)  //服务器成功响应处理函数
            {
                alert("成功");
                console.log(message);
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert("失败");
            }
        });
    return false;
	}
	function btn_rightAnli(){
		$(".createContentBox")[1].style.cssText = "display: none;"; 
	}

//	首页上传头像
	function file1(){
		var oFile1 = document.getElementById("file1");
		console.log(getObjectURL(this.files[0]));
//		var f = getObjectURL(oFile1.files[0]);
//		console.log(f)
//		var oImg = document.getElementsByClassName("headImg")[0];
//		if(f == ""){
//			alert("请重新选择照片")
//		}else{
//			oImg.src = f;
//		}
	}
//	点击添加图片
	function getPath(obj,fileQuery,transImg) {
		 
		  var imgSrc = '', imgArr = [], strSrc = '' ;
		 
		  if(window.navigator.userAgent.indexOf("MSIE")>=1){ // IE浏览器判断
		  if(obj.select){
		   obj.select();
		   var path=document.selection.createRange().text;
		   alert(path) ;
		   obj.removeAttribute("src");
		   imgSrc = fileQuery.value ;
		   imgArr = imgSrc.split('.') ;
		   strSrc = imgArr[imgArr.length - 1].toLowerCase();
		   if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
		   obj.setAttribute("src",transImg);
		   obj.style.filter=
		    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path+"', sizingMethod='scale');"; // IE通过滤镜的方式实现图片显示
		   }else{
		   //try{
		   throw new Error('File type Error! please image file upload..'); 
		   //}catch(e){
		   // alert('name: ' + e.name + 'message: ' + e.message) ;
		   //}
		   }
		  }else{
		   // alert(fileQuery.value) ;
		   imgSrc = fileQuery.value ;
		   imgArr = imgSrc.split('.') ;
		   strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
		   if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
		   obj.src = fileQuery.value ;
		   }else{
		   //try{
		   throw new Error('File type Error! please image file upload..') ;
		   //}catch(e){
		   // alert('name: ' + e.name + 'message: ' + e.message) ;
		   //}
		   }
		 
		  }
		 
		  } else{
		  var file =fileQuery.files[0];
		  var reader = new FileReader();
		  reader.onload = function(e){
		 
		   imgSrc = fileQuery.value ;
		   imgArr = imgSrc.split('.') ;
		   strSrc = imgArr[imgArr.length - 1].toLowerCase() ;
		   if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0){
		   obj.setAttribute("src", e.target.result) ;

		   }else{
		   //try{
		   //		   添加图片外框及img标签
		    var oLi = document.createElement("li");
			var oBox = document.getElementsByClassName("navTwo_infoNavCont")[0];
			var AddOut = document.getElementsByClassName("AddOuter")[0];
			oBox.appendChild(oLi)
			oBox.insertBefore(oLi,AddOut);
			var oImage = document.createElement("img");
			oImage.src = e.target.result;
			oLi.appendChild(oImage);
		   //}catch(e){
		   // alert('name: ' + e.name + 'message: ' + e.message) ;
		   //}
		   }
		    
		 
		   // alert(e.target.result); 
		  }
		  reader.readAsDataURL(file);
		  }
		 
		 }
		 
		 function show(){
		  //以下即为完整客户端路径
		  var file_img=document.getElementById("img"),
		  iptfileupload = document.getElementById('iptfileupload') ;
		  getPath(file_img,iptfileupload,file_img) ;
	  
}		

		


	    
			


		