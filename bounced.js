/**弹窗控件 
   author bowencon     
   配合popup.css使用
   API调用示例:
   $(".btn").bounced({
		width:360,
		height:236,
		title:'标题1',
		url:'iframe.html'
	}); 
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
//DynamicLoad.js("js/popup/popup.js");//加载js文件
	
/*-弹出提示控件*/
;(function($){
	$.fn.bounced = function(options){
		var defaults = {
			width:450,
			height:288,
			title:'标题',
			url:'iframe.html'
		};
		var settings = $.extend(defaults, options);//如果settings为空，就取defaults的值
		console.debug(JSON.stringify(options));
	
		function popup(w,h,t,u){		
				var html_b ='<div class="shadow_bg">' + '</div>';
				var html_c ='<div class="popup_box">' +
									'<div class="popup_top">' + 
										  
										  '<a href="javascript:;" onclick="closed()" class="popup_closed" title="关闭">' + '<i class="i_closed">' + '</i>' + '</a>' +  
									'</div>' +
									
							  '</div>';		   
				var popup_title = t
				var popup_link = u;
				$("body").append(html_b);
				$("body").prepend(html_c);
			
				var div_h4 = '<h4 class="popup_title">' + popup_title + '</h4>';
				var div_iframe = 	'<iframe src=\"' + popup_link +'\" scrolling="auto" frameborder="0" id="iframe_popup" name="iframe_popup" class="popup_iframe" allowtransparency="true">' + '</iframe>' ;
				$(".popup_top").prepend(div_h4);
				$(".popup_box").append(div_iframe);
			
				var winW = $(window).width(),
					winH = $(window).height();
				var titH = $(".popup_top").height();
				$(".popup_box").css({width:w, height:h}); 
				$("iframe.popup_iframe").css({height:h - titH +"px"});

				Setpopup(w,h);
				
				$(".shadow_bg").fadeIn();
				$(".popup_box").slideDown();//show(200)
				return false; 			
		}

		function Setpopup(w,h){
			$(".popup_box").css({"left":50 +"%", "top":50 +"%", "margin-left":-w/2 +"px", "margin-top":-h/2 +"px"}); 	
		}
		
		$(function(){	
			//缩动浏览器窗口控制	 
			var resizeTimer = null;
			$(window).on('resize',function(){
				  if (resizeTimer) {
					  clearTimeout(resizeTimer)
				  }
				  resizeTimer = setTimeout(function(){
					  var winW = $(this).width(),
						  winH = $(this).height();
					  var w = $(".popup_box").width(),
						  h = $(".popup_box").height();
					  Setpopup(w,h);
					  
				  }, 400);
				  return false;
			});	
		});
		
		//初始化
		var init = function(_this){
		     var $this=_this;
		     $this.click(function(){ //console.debug($this.val());
					popup(settings.width, settings.height, settings.title, settings.url);
			 });	
		}
		init($(this));
        return this;
	}	
})(jQuery);

//关闭弹窗
function closed(){ 
	  $(".shadow_bg").fadeOut().remove();
	  $(".popup_box").slideUp();//hide()
	  setTimeout(function(){
	  	$(".popup_box").remove();
	  	$("iframe.popup_iframe").remove(); //解决IE下iframe冲突
	  },500);  
	  return false; 
}
		