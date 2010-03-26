/*
 * jDialog v 0.3
 * Jason Lee <huacnlee@gmail.com> Since 2008-03-26
 */
var jDialog = {

  /**
   * 窗口的所有者，窗口显示出来的位置会以这个所有者为基础
   */
  owner : undefined,
  
  /**
   * 鼠标处于区域
   */
  hovered : false,
  
  /**
   * 参数设置
   */
  settings : {
      
      /**
       * 窗口最外面个框的ID
       */
      idName : "paneljDialog",
      /**
       * 窗口标题
       */
      title : "提示",
      /**
       * 提示内容
       */
      content : "",
      
      width : 250
  },   
  
  /**
   * 显示jDialog
   */
  show : function(settings){        
    var pos = jDialog.getPos();
    $.extend(jDialog.settings,settings);
    
    //关闭之前的窗口
    jDialog.close();
    
    //创建HTML对象
    var dialog = $("#"+jDialog.settings.idName);
        
    if(dialog.size() == 0){
      var cssArrow = "contextual_arrow_rev";
      var posTop =  pos.top + pos.height + 2;
      var posLeft = pos.left + 1;
      var browserHalfSize = jDialog.getBrowserHafeSize();

      if(posLeft > browserHalfSize.width){
          posLeft =  pos.left;
          cssArrow = "contextual_arrow";
      }
      
      var cssPosition = 'top:'+ posTop + 'px;left:'+ posLeft +'px;';
      
      var html = '';
      html += '<div id="'+jDialog.settings.idName+'" class="jdialog_outterbox" style="position:absolute;display:none;'+ cssPosition+ '">';
      html += '   <div class="jdialog_dialog_popup" style="width:'+ jDialog.settings.width +'px">';
      html += '       <div class="'+ cssArrow +'"></div>';
      html += '       <div class="contextual_dialog_shadow">'
      html += '           <div class="contextual_dialog_content">';
      html += '               <h2><span>'+jDialog.settings.title+'</span></h2>';
      html += '               <div class="jdialog_close" onclick="jDialog.close();" title="关闭"></div>';
      html += '               <div class="dialog_content">';
      html += '                   <div class="dialog_body clearfix">';
      html += '                       '+jDialog.settings.content;
      html += '                   </div>';
      html += '               </div>';
      html += '           </div>';
      html += '       </div>';
      html += '   </div>';
      html += '</div>';
      
      $("body").append($(html));
      
      dialog = $("#"+jDialog.settings.idName);
      dialog.hover(function(){ jDialog.hovered = true; },function(){ jDialog.hovered = false; });
    }
    dialog.show();
  },
  
  /**
   * 更新窗口里面的内容
   */
  update : function(content){
    $("#"+ jDialog.settings.idName +" .dialog_body").html(content);      
  },
  
  /**
   * 关闭jDialog
   */
  close : function(){
    var dialog = $("#"+jDialog.settings.idName);
    dialog.hide();
    dialog.remove();
  },
  
  /**
   * 取得浏览器的高度和宽度的一半
   */
  getBrowserHafeSize : function(){        
		var browserWidth = window.innerWidth || document.documentElement.clientWidth ||
			document.body.clientWidth;
		var browserHeight = window.innerHeight || document.documentElement.clientHeight ||
			document.body.clientHeight;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		return {width: ( browserWidth / 2) - 150 + scrollX,height: ( browserHeight / 2) - 100 + scrollY};
  },
  
  /**
   * 取得owner 在页面上的坐标和它的高度和宽度
   */
  getPos : function(){    
    if(jDialog.owner == undefined){
      return {top : 0, left:0 , width : 0, height : 0};
    }
    
    var e = jDialog.owner;
    var oTop = e.offsetTop; 
    var oLeft = e.offsetLeft; 
    var oWidth = e.offsetWidth; 
    var oHeight = e.offsetHeight; 
    while(e = e.offsetParent) 
    { 
	    oTop += e.offsetTop; 
	    oLeft += e.offsetLeft; 
    }
    
    return {
      top : oTop,
      left : oLeft,
      width : oWidth,
      height : oHeight
    }
  }
    
};

jQuery.fn.jDialog = function(settings){   
  jDialog.owner = this[0]; 
  jDialog.show(settings);
}

jQuery.fn.jDialog.close = function(){
  jDialog.close();
}

jQuery.fn.jDialog.update = function(content){
  jDialog.update(content);
}