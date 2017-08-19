window.alert = function(txt){
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.right = "0px";
    shield.style.bottom = "0px";
    shield.style.width = "100%";
    shield.style.height = "100%";
    shield.style.background = "#333";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=75)"; //IE  取值从 0 到 100
    shield.style.opacity = "0.75"; //css3 取值从 0 到 1

    var my_alert = document.createElement("DIV");
    my_alert.id = "my-alert";
    my_alert.setAttribute('tabindex',"-1");
    my_alert.style.display = "block";
    my_alert.style.width = "270px";
    my_alert.style.position = "fixed";
    my_alert.style.zIndex = "11100";
    my_alert.style.left = "50%";
    my_alert.style.marginLeft = "-135px";
    my_alert.style.marginTop = "0";
    my_alert.style.top = "50%";
    my_alert.style.textAlign = "center";

    var strHtml='';
    strHtml += " <div style=\"background: #f8f8f8;\">\n";
    strHtml += " <div style=\"border-bottom: 1px solid #dedede;border-radius: 2px 2px 0 0;padding: 15px 10px;text-align: center;\">"+txt+"</div>\n";
    strHtml += " <div style=\"border-collapse: collapse;display: table;height: 44px;overflow: hidden;width: 100%;\"><span  id=\"doOk\" style=\"box-sizing: border-box !important;color: #0e90d2;cursor: pointer;display: table-cell !important;height: 44px;line-height: 44px;overflow: hidden;padding: 0 5px;text-align: center;text-overflow: ellipsis;white-space: nowrap;word-wrap: normal;\">确定</span><span>关闭网页</span></div>\n";
    strHtml += "</div>\n";

    my_alert.innerHTML = strHtml;
    document.body.appendChild(my_alert);
    document.body.appendChild(shield);
    var c = 0;
    this.doAlpha = function(){
        if (c++ > 20){clearInterval(ad);return 0;}
        my_alert.style.filter = "alpha(opacity="+c+");";
    }
    var ad = setInterval("doAlpha()",5);
    $('body').on('click', '#doOk', function () {
        my_alert.parentNode.removeChild(my_alert);
        shield.parentNode.removeChild(shield);
    })
}