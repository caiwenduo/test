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
		$(".newAdd").show();
		if(document.getElementsByClassName("ChildAccounAddBack")[0]){
			$(".ChildAccounAddBack").remove();
		}
		if(document.getElementsByClassName("newAddBox")){
			$(".newAddBox").remove();
			$(".ChildAccoun").show();
		}
		oLi[0].innerHTML = "公司子账号";
	}
}
$(".ownerNumber").click(function(){
	$(".newAdd").hide();
})
//公司子账号ajax获取数据
$.ajax({
	type:"get",
	url:"../json/json.js",
	success : function(res){
		var Res = eval(res);
		var str = "";
		for(var i=0;i<Res.length;i++){
			str +='<li class="main">\
						<img src="'+Res[i].url+'" class="imgPeople"/>\
						<h3 class="userName">闻一多</h3>\
						<p class="userPhone">13155806725</p>\
						<span class="userFaclity">设计账号</span>\
						<span class="companyName">设计公司名称</span>\
						<span class="remark">备注信息</span>\
						<span class="athorityDesign">权限设置</span>\
						<div class="ModifyDelete">\
							<span><img src="http://192.168.2.144/dingfang/common/img/hold_C.jpg" class="modifyImg"/></span>\
							<span><img src="http://192.168.2.144/dingfang/common/img/hold_R.jpg" class="delete" /></span>\
						<div>\
				</li>';
		}
		$(".accountCompany").html(str);
	}
});
//置业顾问ajax获取数据
$.ajax({
	type:"get",
	url:"../json/json.js",
	success : function(res){
		var Res = eval(res);
		var str = "";
		for(var i=0;i<Res.length;i++){
			str +='<li class="main">\
						<img src="'+Res[i].url+'" class="imgPeople"/>\
						<h3 class="userName">闻一多</h3>\
						<p class="userPhone">13155806725</p>\
						<span class="userFaclity">设计账号</span>\
						<span class="companyName">设计公司名称</span>\
						<span class="remark">备注信息</span>\
						<div class="ModifyDelete">\
							<span><img src="http://192.168.2.144/dingfang/common/img/hold_C.jpg" class="modifyImg"/></span>\
							<span><img src="http://192.168.2.144/dingfang/common/img/hold_R.jpg" class="delete" /></span>\
						<div>\
				</li>';
		}
		$(".propertyConsultant").html(str);
		athorityDesign();//点击权限设置
	}
});
//点击新增方案1111111111111111111111111
function newAdd(){
	var Str = '<div class="newAddBox">\
				<ul class="newAddContent">\
					<li>\
						<span>\
							账号姓名:\
						</span>\
						<span>\
							<input type="text" name="newHouseNamber" id="homeName" placeholder="请输入账号姓名" />\
						</span>\
						<span>\
						</span>\
					</li>\
					<li>\
						<span>\
							账号身份:\
						</span>\
						<span>\
							<select id="houseName" name="">\
								<option value="" style="display: none;">请选择身份角色</option>\
								<option value="21">项目经理</option>\
								<option value="22">设计人员</option>\
								<option value="23">材料商</option>\
							</select>\
						</span>\
						<span>\
							项目经理账号,设计账号,材料账号\
						</span>\
					</li>\
					<li>\
						<span>\
							所属公司:\
						</span>\
						<span>\
							<input type="text" name="newFloor" id="homeKeyCode" placeholder="请填写公司名称" />\
						</span>\
						<span>\
						</span>\
					</li>\
					<li>\
						<span>\
							登录账号:\
						</span>\
						<span>\
							<input type="text" name="newFloor" id="description" placeholder="请输入用户手机号码" />\
						</span>\
						<span>\
						</span>\
					</li>\
					<li>\
						<span>\
							 备注信息:\
						</span>\
						<span>\
							<textarea type="text" style="" id="Remark" placeholder="请填写备注信息"></textarea>\
						</span>\
						<span></span>\
					</li>\
					<li>\
						<span>\
							 权限设置:\
						</span>\
						<span>\
							<div class="anyPermissionsBox">\
								<div class="anyPermissions">✔</div> 所有权限\
							</div>\
							<div class="permissions">权限设置</div>\
						</span>\
						<span></span>\
					</li>\
					<li>\
						<span>\
						</span>\
						<span>\
							<div class="newAddConserve">\
								<p onclick="newAddConserve()">保存</p>\
								<p>继续添加</p>\
							</div>\
						</span>\
						<span>\
						</span>\
					</li>\
				</ul>\
				</div>';
				var str = '<img class="ChildAccounAddBack" style="width: 50px;height: 60px;float: right;margin-top: -10px;cursor: pointer;" src="http://192.168.2.144/dingfang/common/img/back.jpg" />'
	$('.ChildAccounAdd').append(Str);
	$('.HouseholdNav').append(str);
	$('.newAdd').hide();
	$(".ChildAccoun").hide();
	$('.ChildAccounAddBack').click(function(){
		$(this).remove();
		$(".newAddBox").remove();
		$('.newAdd').show();
		$(".ChildAccoun").show();
	})
	var num = 0;
	$(".anyPermissionsBox").click(function(){
		if(num == 0){
			$(this).find(".anyPermissions").css("background","orange");
			num = 1;
		}else{
			$(this).find(".anyPermissions").css("background","#CCC");
			num = 0;
		}
	})
var Str2 = '<div class="newAddBox">\
				<ul class="newAddContent">\
					<li>\
						<span>\
							账号姓名:\
						</span>\
						<span>\
							<input type="text" name="newHouseNamber" id="homeName" placeholder="请输入账号姓名" />\
						</span>\
						<span>\
						</span>\
					</li>\
					<li>\
						<span>\
							登录账号:\
						</span>\
						<span>\
							<input type="text" name="newFloor" id="homeKeyCode" placeholder="请输入手机号码" />\
						</span>\
						<span>\
						</span>\
					</li>\
					<li>\
						<span>\
							初始密码:\
						</span>\
						<span>\
							<input type="password" name="newFloor" id="description" placeholder="请输入初始密码" />\
						</span>\
						<span>\
						</span>\
					</li>\
					<li>\
						<span>\
							 备注信息:\
						</span>\
						<span>\
							<textarea type="text" style="" id="Remark" placeholder="请填写备注信息"></textarea>\
						</span>\
						<span></span>\
					</li>\
					<li>\
						<span>\
						</span>\
						<span>\
							<div class="newAddConserve">\
								<p onclick="newAddConserve()">保存</p>\
								<p>继续添加</p>\
							</div>\
						</span>\
						<span>\
						</span>\
					</li>\
				</ul>\
				</div>';
				var str2 = '<img class="ChildAccounAddBack" style="width: 50px;height: 60px;float: right;margin-top: -10px;cursor: pointer;" src="http://192.168.2.144/dingfang/common/img/back.jpg" />'
				$('.PropertyConOuter').append(Str2);
				$('.newAdd').hide();
				$(".ChildAccoun").hide();
				$('.ChildAccounAddBack').click(function(){
					$(this).remove();
					$(".newAddBox").remove();
					$('.newAdd').show();
					$(".ChildAccoun").show();
				})
				var num = 0;
				$(".anyPermissionsBox").click(function(){
					if(num == 0){
						$(this).find(".anyPermissions").css("background","orange");
						num = 1;
					}else{
						$(this).find(".anyPermissions").css("background","#CCC");
						num = 0;
					}
				})
			}
//点击公司子账号的权限设置
function athorityDesign(){
	$(".athorityDesign").click(function(){
		var Str = '<div class="newAddBox">\
					<ul class="newAddContent">\
						<li>\
							<span>\
								按楼号/单元:\
							</span>\
							<span>\
								<select id="houseName" class="HoverBg" name="">\
									<option value="" style="display: none;">所有楼号/单元</option>\
									<option value="21">项目经理</option>\
									<option value="22">设计人员</option>\
									<option value="23">材料商</option>\
								</select>\
							</span>\
							<span>\
							</span>\
						</li>\
						<li>\
							<span>\
								按户型:\
							</span>\
							<span>\
								<select id="houseName" class="HoverBg" name="">\
									<option value="" style="display: none;">所有户型</option>\
									<option value="21">项目经理</option>\
									<option value="22">设计人员</option>\
									<option value="23">材料商</option>\
								</select>\
							</span>\
							<span>\
								项目经理账号,设计账号,材料账号\
							</span>\
						</li>\
						<li>\
							<span>\
								按装修方案:\
							</span>\
							<span>\
								<select id="houseName" class="HoverBg" name="">\
									<option value="" style="display: none;">所有装修方案</option>\
									<option value="21">项目经理</option>\
									<option value="22">设计人员</option>\
									<option value="23">材料商</option>\
								</select>\
							</span>\
							<span>\
							</span>\
						</li>\
						<li style="height: 60px;">\
							<span>\
								常用工具:\
							</span>\
							<span style="width: auto;max-width: 600px;height: 30px;">\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
							</span>\
							<span>\
							</span>\
						</li>\
						<li style="height: 100px;">\
							<span>\
								 访问栏目:\
							</span>\
							<span style="width: auto;max-width: 600px;height: 30px;">\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
								<div class="Tools">\
									<em><p>✔</p>规范查询</em>\
								</div>\
							</span>\
							<span></span>\
						</li>\
						<li>\
							<span>\
							</span>\
							<span>\
								<div class="newAddConserve" style="margin-top: 50px;">\
									<p onclick="newAddConserve()">保存</p>\
									<p>继续添加</p>\
								</div>\
							</span>\
							<span>\
							</span>\
						</li>\
					</ul>\
					</div>';
					var str = '<img class="ChildAccounAddBack" style="width: 50px;height: 60px;float: right;margin-top: -10px;cursor: pointer;" src="http://192.168.2.144/dingfang/common/img/back.jpg" />'
		$('.ChildAccounAdd').append(Str);
		$('.HouseholdNav').append(str);
		$('.newAdd').hide();
		$(".ChildAccoun").hide();
		oLi[0].innerHTML = "权限设置";
		$('.ChildAccounAddBack').click(function(){
			$(this).remove();
			$(".newAddBox").remove();
			$('.newAdd').show();
			$(".ChildAccoun").show();
			oLi[0].innerHTML = "公司子账号";
		})
		var num = 0;
		$(".anyPermissionsBox").click(function(){
			if(num == 0){
				$(this).find(".anyPermissions").css("background","orange");
				num = 1;
			}else{
				$(this).find(".anyPermissions").css("background","#CCC");
				num = 0;
			}
		})
		$(".HoverBg").click(function(){
			$(this).css("background","rgba(247,238,214,0.5)");
		})
//		常用工具选择
		$(".Tools").find("em").data("num","0");
		$(".Tools").find("em").click(function(){
			if($(this).data("num") == "0"){
				$(this).css("color","rgba(0,0,0,0.7");
				$(this).find("p").css("background","rgba(0,0,0,0.7)");
				$(this).data("num","1");
			}else{
				$(this).css("color","rgba(0,0,0,0.3)");
				$(this).find("p").css("background","rgba(0,0,0,0.3)");
				$(this).data("num","0");
			}
		})
	})
};