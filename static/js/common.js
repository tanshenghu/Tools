//define(function(require, exports, module){
/*
JS Document
◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
◎ *@Description: javascript Obj 基类
◎ *@Author: 谭生虎       TanShenghu	TSH    
◎ *@Update: 2013-05-14
◎ *@Contact: ☎：13588428548		Email: tanshenghu@163.com	QQ：511568692
◎ *@AuthorNote: 请不要随便篡改文件内容。尊重他人劳动成果！谢谢...     谭生虎 注
◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
*/
(function($){
	var tsh   = {},
		fnTsh = {};
	/*
		针对客户端信息捕获
	*/
	tsh.clientWidth = function(){return document.documentElement.clientWidth;};
	tsh.clientHeight = function(){return document.documentElement.clientHeight;};
	tsh.offsetHeight = function(){return document.documentElement.scrollHeight || document.body.scrollHeight;};
	tsh.offsetWidth = function(){return document.documentElement.scrollWidth || document.body.scrollWidth;};
	tsh.scrollHeight = function(){return document.documentElement.scrollTop || document.body.scrollTop;};
	tsh.scrollWidth = function(){return document.documentElement.scrollLeft || document.body.scrollLeft;};
	tsh.Resolution = function( Options ){																	/* 捕获客户端分辨率 参数说明：传入x捕获宽，传入y捕获高，否则捕获宽×高 */
		var X = window.screen.width,Y = window.screen.height;
		return Options=='x' ? X : Options=='y' ? Y : X+'×'+Y;
	};
	tsh.checkIE = (!+[1,]);
	tsh.browserMsg = window.navigator.userAgent.toLowerCase();
	tsh.IEDocMode = document.documentMode;
	tsh.usebrowser = tsh.browserMsg.match(/msie 6./img) ? 'IE6' : tsh.browserMsg.match(/msie 7./img) ? 'IE7': tsh.browserMsg.match(/msie 8./img) ? 'IE8' : tsh.browserMsg.match(/msie 9./img) ? 'IE9' : tsh.browserMsg.match(/msie 10./img) ? 'IE10' : tsh.browserMsg.match(/firefox/img) ? 'firefox' : 'webkit';
	tsh.setcookies = function(key, val){
		var saveCookieStr='',setOutTime=arguments[2],saveDay;
		saveCookieStr = key+'='+escape(val);
		if (setOutTime!=undefined)
		{
			setOutTime = parseFloat(setOutTime);
			saveDay = new Date();
			saveDay.setDate(saveDay.getDate()+setOutTime);
			saveCookieStr = saveCookieStr + '; expires='+saveDay.toGMTString();
		}
		document.cookie = saveCookieStr+'; path=/';
	};
	tsh.getcookies = function( key ){
		var CookStr = document.cookie;
		CookArr = CookStr.split('; ');
		for(var i in CookArr)
		{
			if (CookArr[i].split('=')[0]==key)
			{
				return unescape(CookArr[i].split('=')[1]);
			}
		}
	};
	tsh.delcookies = function( key ){
		var keyVal = '',saveDay;
		saveDay = new Date('1970/01/05');
		saveDay.setDate(saveDay.getDate());
		document.cookie = key+'='+keyVal+'; expires='+saveDay.toGMTString()+'; path=/';
	};

	/*
		 log 方法
	*/
	tsh.log = function( style, str ){
		if ( !str ){
			str = style;
			style = undefined;
		}
		if ( console && console.log )
			console.log( "%c%s", (style||''), str );
	};
	/* 
		所有方法的备注说明，将更好的让开发者熟练运用所有方法
	*/
	tsh.remark = function( key ){
		
		var key = key ? eval('this.'+key) : this;
		var result = '',
			length = 0,
			fnlen  = 0;
		
		key || this.log( '该对象不存在！' );
		for(var i in key){
			
			length++;
			if( typeof key[i] === 'function' ){
				fnlen++;
				this.log( 'color:red', 'function => ' + i );
			}else if( isNaN( key[i] ) ){
				this.log( 'color:green', 'number => ' + i );
			}else{
				this.log( typeof key[i] + ' => ' + i );
			}
			
		}
		
		this.log( '共查找到 '+length+' 个对象，其中方法对象 '+fnlen+' 个' );
		
	};
	/*
		方法参数调用 示例
	*/
	tsh.remark.demo = function( key ){
		if ( !key ) return;

		$.getJSON('http://www.tanshenghu.com/code/tsh_js.php?callback=?', 'key='+key, function(data){
			data = data.toString();
			tsh.log( data );
		});
		
	};
	/*
		图片数字
	*/
	tsh.picNum = function(num, path){
		var picStr = '';
		if ( num && path && !isNaN(num) ){
			num = num+'';
			var NumArr = num.split('');
			for(var i in NumArr)
			{
				picStr+='<img src="'+path+NumArr[i]+'.gif" class="middle" />';
			}
		}
		return picStr;
	};

	/*  获取form表单字段 提交至后端 parameter
	
		参数格式{form:"#form", selector:".myInput", way:true, Encode:escape}
		说明：form是大的容器可是以form,div任意非输入框元素
			  selector特殊筛选元素，可选或者反选都可以
			  way是配合selector特殊筛选的参数，布尔值默认为true
			  Encode是编码方法。可传入常用的三种编码中的任意一种都行
	*/
	tsh.Get_form_param = function( param ){
		if ( !(param instanceof Object) ) this.log( 'parameter '+param+' error' );

			var form = checkJqObject( param.form ),
				selectEle = param.selector ? checkJqObject( param.selector ) : false,
				way = 'way' in param ? param.way : true;

			var	selector = null,
				resultParam = {};

			function checkJqObject( obj ){
				var newObj = obj;
				if ( !(obj instanceof jQuery) ){
					newObj = $(newObj);
				}
				return newObj;
			};
			var FormatHtml = function( val ){
				return $('<div/>').text( val ).html();
			};
			var Encode  = function( value ){

				if ( param.Encode ){
					value = param.Encode( value );
				}
				return value;
			};

			if ( selectEle && way ){
				selector = form.find( selectEle );
			}else if ( selectEle && (!way) ){
				selector = form.find('input[name],textarea[name]').not( selectEle );
			}else{
				selector = form.find('input[name],textarea[name],select[name]');
			}

			selector.each(function(eid, ele){
				var thisObj = $(ele),
					iName   = thisObj.attr('name'),
					type    = thisObj.attr('type') && thisObj.attr('type').toLowerCase();
		
				if ( iName && type && type==='radio' ){

					if ( thisObj.prop('checked') ){
						resultParam[iName] = FormatHtml( Encode( thisObj.val() ) );
					}

				}else if( iName && type && type==='checkbox' ){
					
					if ( thisObj.prop('checked') ){
						
						if ( resultParam[iName] ){
							resultParam[iName].push( FormatHtml( Encode( thisObj.val() ) ) );
						}else{
							var itemArr = [ FormatHtml( Encode( thisObj.val() ) ) ];
							resultParam[iName] = itemArr;
						}
						
					}

				}else if ( iName ){
				
					resultParam[iName] = FormatHtml( Encode( thisObj.val() ) );
					
				}

			});

			if( param.split ){
				for(var i in resultParam){
					if( resultParam[i] instanceof Array ){
						resultParam[i] = resultParam[i].join( param.split );
					}
				}
			};


			return resultParam;
		
	};
	/*
		 考虑到 如：兴趣、爱好之类 checkbox同name属性，最终需要组合成数组对象
	*/
	tsh.Get_form_param.Get_checkbox = function(form, checkName){
			var resultObj = {},
				getVal    = [],
				decoll    = arguments[2];

			form = $( form );

			form.find('[name="'+checkName+'"]').each(function(i, ele){
				var thisObj = $(ele),
					type    = thisObj.attr('type') && thisObj.attr('type').toLowerCase();

				if ( type && (type === 'radio' || type === 'checkbox') ){
					if ( thisObj.prop('checked') ){
						getVal.push( $(ele).val() );
					}		
				}else{
					if ( thisObj.val() ){
						getVal.push( $(ele).val() );
					}				
				}
			});

			if ( decoll ){
				resultObj[checkName] = getVal.join( decoll );
			}else{
				resultObj[checkName] = getVal;
			}
			
			return resultObj;
	};
	/*
		在jq中dom对象下挂接
	*/
	/*
		节点操作
	*/
	fnTsh.getComputedStyle = function( curCN ){
		var This = this.get(0);
		return This.currentStyle ? This.currentStyle[curCN] : getComputedStyle(This,null)[curCN];
	};
	/*
		防止采编人员上传过大图片倒置页面变形
		不考虑ie6的话，用css定义max-width是最好的。
	*/
	fnTsh.copyerPic = function( width ){
		
		this.find('img').each(function(){
			if ($(this).width()>=width){$(this).width(width);}
		});
		
	};
	fnTsh.allHeight = function( repeat ){
		var setHval = arguments[1],maxH=0;
		if ( !setHval )
		{
			this.each(function(i, ele){

				if ( repeat ){$(ele).css('height','auto');}/* 初始化高度之后有利于重新第再次计算 */
				if ($(ele).height()>maxH)
				{
					maxH = $(ele).height();
				}
		
			});
			this.height(maxH);
		}else{
			setHval = parseFloat(setHval);
			$(arrayObj.join(',')).height(setHval);
		}
	};
	fnTsh.videoPlay = function( param ){
		  var PlaySort = param.PlaySort,
		  	  swf 	   = param.swf,
		  	  file 	   = param.file,
		  	  width    = param.width,
		  	  height   = param.height,
		  	  playStr  = '';
		  	  
		  if (PlaySort=='wmv')
		  {
			  playStr = '<embed width="'+parseInt(width)+'" height="'+parseInt(height)+'" autostart="1" loop="false" type="video/x-ms-wmv" src="'+file+'" name="video">';
		  }
		  else if (PlaySort=='flv')
		  {
				if (!swf || !file){
					playStr = 'fail! File not found...';
				}else{
					playStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+parseInt(width)+'" height="'+parseInt(height)+'"><param name="movie" value="'+swf+'.swf" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="allowFullScreen" value="true" /><param name="FlashVars" value="vcastr_file='+file+'" /><embed src="'+swf+'.swf" allowfullscreen="true" flashvars="vcastr_file='+file+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+parseInt(width)+'" height="'+parseInt(height)+'"></embed></object>';
				}
		  }
		  else
		  {
			  playStr = '<b style="color:red">\u89C6\u9891\u672A\u80FD\u6B63\u5E38\u64AD\u653E\uFF0C\u8BF7\u68C0\u67E5\u89C6\u9891\u683C\u5F0F\u7C7B\u578B\uFF0C\u4EE5\u53CA\u8C03\u7528\u8BE5\u65B9\u6CD5\u7684API</b>';
		  }
		  this.html( playStr );
	};
	fnTsh.placeholder = function(){
		
		var ie = tsh.usebrowser;
		if ( ie=='IE6' || ie=='IE7' || ie=='IE8' ){
			this.each(function(){
				
			});
		}
		
	};
	// 接口 绑定至jquery下面
	$.fn.tsh = fnTsh;
	$.tsh = tsh;
	
})(jQuery)


//});