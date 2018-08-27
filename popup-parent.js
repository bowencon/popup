/**弹窗控件 popup-parent.js
   author bowencon
   popup(w,h,title,url);
   配合popup.css使用
   API调用示例:
   <input type="button" class="btn" value="点击弹窗" onclick="popup(500, 250, '提示', 'index.html');"/>
   <a href="javascript:popup('500','250','标题','index.html');void(0);">点击弹窗</a>
**/

/*-弹出提示控件*/
var popup = function(w,h,title,url){
	var html_b ='<div class="shadow_bg">' + '</div>';
	var html_c ='<div class="popup_box">' +
					    '<div class="popup_top">' + 
							  '<a href="javascript:closed();void(0);" class="popup_closed" title="关闭"></a>' +  
					    '</div>' +
						
				  '</div>';		   
	var popup_title = title; 
	var popup_link = url;
	$(window.parent.document).find("body").append(html_b);
	$(window.parent.document).find("body").prepend(html_c);

    var div_h4 = '<h4 class="popup_title">' + popup_title + '</h4>';
    var div_iframe = '<iframe src=\"' + popup_link +'\" scrolling="auto" frameborder="0" id="iframe_popup" name="iframe_popup" class="popup_iframe" allowtransparency="true">' + '</iframe>' ;
    $(window.parent.document).find(".popup_top").prepend(div_h4);
    $(window.parent.document).find(".popup_box").append(div_iframe);

    var winW = $(window.parent.document).width(),
		winH = $(window.parent.document).height(); 
	var titH = $(window.parent.document).find(".popup_top").height();
	$(window.parent.document).find(".popup_box").css({width:w, height:h}); 
	$(window.parent.document).find("iframe.popup_iframe").css({height:h - titH -1 +"px"});

    Setpopup(w,h);

    $(window.parent.document).find(".shadow_bg").fadeIn();
	$(window.parent.document).find(".popup_box").show(200); //slideDown()

    return false; 
}


function Setpopup(w,h){
	$(window.parent.document).find(".popup_box").css({"left":50 +"%", "top":50 +"%", "margin-left":-w/2+"px", "margin-top":-h/2+"px"}); 	
}

$(function(){	
	//缩动浏览器窗口控制	 
	var resizeTimer = null;
    $(window).on('resize',function(){
          if (resizeTimer) {
              clearTimeout(resizeTimer)
          }
          resizeTimer = setTimeout(function(){
	          var winW = $(window.parent.document).width(),
				  winH = $(window.parent.document).height();
			  var w = $(window.parent.document).find(".popup_box").width(),
				  h = $(window.parent.document).find(".popup_box").height();
	          Setpopup(w,h);
              
          }, 400);
          return false;
    });
});
