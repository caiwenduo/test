//点击左边列表更新右边内容
//我的工作台、
var oLiOuter = document.getElementsByClassName("list_left")[0];
var oLi = oLiOuter.getElementsByTagName("li");
$("#content_rightMain")[0].setAttribute("src","indexContent.html");
	$(".list_outer")[0].style.color = "#caa815";
	oLi[0].style.background = "rgba(153,153,153,0.3)";
oLi[0].onclick = function (){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[0].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","indexContent.html");
}

//楼盘信息
oLi[1].onclick = function houseInformation(){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[1].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","EstateManagement.html");
}

//户号管理
oLi[2].onclick = function houseHold(){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[2].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","HouseholdManagement.html");
}

//户型管理
oLi[3].onclick = function houseType(){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[3].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","HouseTypeManagement.html");
}

//方案管理
oLi[4].onclick = function housePlan(){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[4].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","planManagement.html");
}
//金装方案管理
oLi[5].onclick = function goldMaterial(){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[5].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","GoldMaterialManagement.html");
}

//软装搭配管理
oLi[6].onclick = function housePlan(){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[6].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","SoftMaterialManagement.html");
}
//账号管理
oLi[7].onclick = function goldMaterial(){
	for(var i=0;i<$(".list_outer").length;i++){
		$(".list_outer")[i].style.color = "#000";
	}
	for(var j=0;j<oLi.length;j++){
		oLi[j].style.background = "#FFF";
	}
	this.style.background = "rgba(153,153,153,0.3)";
	$(".list_outer")[7].style.color = "#caa815";
	$("#content_rightMain")[0].setAttribute("src","accountManagement.html");
}
var oMarketChoice = document.getElementsByClassName("MarketChoice")[0];
//切换select把value值存放在sessionStorange中
//楼盘切换功能

var selectedIndexx = sessionStorage.getItem("MarketChoice");
oMarketChoice.value = selectedIndexx;

oMarketChoice.onchange = function(){
	sessionStorage.setItem("MarketChoice",oMarketChoice.value);
	window.location.reload()	
}
//点击x关闭绑定户型窗口
function closeWindows(){
	document.getElementsByClassName("windows")[0].style.cssText = "display: none;"
}
		$(".BindingUnitList").hover(function(){
			$(".confirm").eq($(this).index()).css("background","orange");
		},function(){
			$(".confirm").eq($(this).index()).css("background","#aaa");
		})
	
		$(".BindingUnitList").click(function(){
			alert($(this).index());
		})


