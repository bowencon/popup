/**弹窗控件 
   author bowencon
   popup(w,h,title,url);
   配合popup.css使用
   API调用示例:
   <input type="button" class="btn" value="点击弹窗" onclick="popup(500, 250, '提示', 'index.html');"/>
   <a href="javascript:popup('500','250','标题','index.html');void(0);">点击弹窗</a>
**/

/*--动态加载css函数--*/
var DynamicLoad = {
    css: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        	link.href = path;
        	link.rel = 'stylesheet';
        	link.type = 'text/css';
        head.appendChild(link);
    },
    js: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        	script.src = path;
        	script.type = 'text/javascript';
        	script.charset='utf-8';
        head.appendChild(script);
    }
}
DynamicLoad.css("popup/popup.css");//动态加载 CSS 文件
//DynamicLoad.js("js/popup.js");

	
/*-弹出提示控件*/
var popup = function(w,h,title,url){
	var html_b ='<div class="shadow_bg">' + '</div>';
	var html_c ='<div class="popup_box">' +
					    '<div class="popup_top">' + 
							  
							  '<a href="javascript:;" onclick="closed()" class="popup_closed" title="关闭">' + '<i class="i_closed">' + '</i>' + '</a>' +  
					    '</div>' +
						
				  '</div>';		   
	var popup_title = title
	var popup_link = url;
	$("body").append(html_b);
	$("body").prepend(html_c);

    var div_h4 = '<h4 class="popup_title">' + popup_title + '</h4>';
    var div_iframe = 	'<iframe src=\"' + popup_link +'\" scrolling="auto" frameborder="0" id="iframe_popup" name="iframe_popup" class="popup_iframe" allowtransparency="true">' + '</iframe>' ;
    $(".popup_top").prepend(div_h4);
    $(".popup_box").append(div_iframe);

    var winW = $(window).width(),
		winH = $(window).height();
	var anyW = (winW - w)/2 ;
	var anyH =  (winH - h)/2 ;
	var titH = $(".popup_top").height();
	$(".popup_box").css({"width":w, "height":h}); 
	$("iframe.popup_iframe").css({"height":h - titH +"px"});

    Setpopup(anyW,anyH,w,h);

    $(".shadow_bg").fadeIn();
	$(".popup_box").show(200); //slideDown()
    return false; 
}

function Setpopup(anyW,anyH,w,h){
	$(".popup_box").css({"left":50 +"%", "top":50 +"%", "margin-left":-w/2+"px", "margin-top":-h/2+"px"}); 	
}

$(function(){	
	//缩动浏览器窗口控制	 
    $(window).on('resize',function(){
           setTimeout(function(){
	          var winW = $(this).width(),
				  winH = $(this).height();
			  var w = $(".popup_box").width(),
				  h = $(".popup_box").height();
			  var anyW = (winW - w)/2 , 
				  anyH =  (winH - h) /3 ;
	          Setpopup(anyW,anyH);
              
          }, 400);
          return false;
    });

});

//关闭弹窗
function closed(){
      $(".shadow_bg").fadeOut().remove();
	  $(".popup_box").hide(50); //slideUp() 
	  setTimeout(function(){
	  	 $(".popup_box").remove();
	  	 $("iframe.popup_iframe").remove(); //解决IE下iframe冲突	
	  }, 500);
	    
	  return false; 
}

//点击弹窗外区域关闭弹窗
/*$(document).on("click",function(e){
   e.stopPropagation(); 
   var Darea = $(".popup_box");//设置目标区域  
   if(!Darea.is(e.target) && Darea.has(e.target).length === 0){
       closed();        
   }             
});*/