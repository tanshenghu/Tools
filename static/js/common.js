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
(function($, win){
	var tsh   = {},
		fnTsh = {};
	/*
		针对客户端信息捕获
	*/
	tsh.clientWidth = function(){return document.documentElement.clientWidth;};
	tsh.clientHeight = function(){return document.documentElement.clientHeight;};
	tsh.scrollHeight = function(){return document.documentElement.scrollHeight || document.body.scrollHeight;};
	tsh.scrollWidth = function(){return document.documentElement.scrollWidth || document.body.scrollWidth;};
	tsh.scrollTop = function(){return document.documentElement.scrollTop || document.body.scrollTop;};
	tsh.scrollLeft = function(){return document.documentElement.scrollLeft || document.body.scrollLeft;};
	tsh.screenWH = function( Options ){																	/* 捕获客户端分辨率 参数说明：传入x捕获宽，传入y捕获高，否则捕获宽×高 */
		var X = win.screen.width,Y = win.screen.height;
		return Options=='x' ? X : Options=='y' ? Y : X+'×'+Y;
	};
	tsh.browserMsg = win.navigator.userAgent;
	tsh.browserAppName = navigator.appName; // 返回浏览器的代码名
	tsh.browserAppVersion  = navigator.appVersion; // 浏览器版本号
	//tsh.isIE = (!+[1,]); // 不能用这个做ie的判断条件了，因为ie8以后已经修复这个问题了
	tsh.isIE = /msie/img.test( tsh.browserMsg );
	tsh.IEDocMode = document.documentMode;
	tsh.useBrowser = tsh.browserMsg.match(/msie 6./img) ? 'IE6' : tsh.browserMsg.match(/msie 7./img) ? 'IE7': tsh.browserMsg.match(/msie 8./img) ? 'IE8' : tsh.browserMsg.match(/msie 9./img) ? 'IE9' : tsh.browserMsg.match(/msie 10./img) ? 'IE10' : tsh.browserMsg.match(/msie 11./img) ? 'IE11' : tsh.browserMsg.match(/firefox/img) ? 'firefox' : 'webkit';
	tsh.setCookies = function(key, val){
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
	tsh.getCookies = function( key ){
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
	tsh.delCookies = function( key ){
		var keyVal = '',saveDay;
		saveDay = new Date('1970/01/05');
		saveDay.setDate(saveDay.getDate());
		document.cookie = key+'='+keyVal+'; expires='+saveDay.toGMTString()+'; path=/';
	};

	/*
		 log 方法
		 style : 输出的样式
		 str : 输出的字符或对象
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
		
		tsh.remark.key = key;
		
		$('#tsh_js_demo').remove();
		var script = document.createElement('script');
		script.id = 'tsh_js_demo';
		script.setAttribute('onerror', 'alert("api加载失败，请联系作者-TanShenghu")');
		//script.src = 'http://git.oschina.net/tanshenghu/myweb/raw/master/static/js/common_demo.js?rand=js'+new Date().getTime();
		script.src = 'myGit/oschina/myweb/static/js/common_demo.js?rand=js'+new Date().getTime();
		document.body.appendChild( script );
		
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
	tsh.getFormField = function( param ){
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
	tsh.getFormField.getCheckboxVal = function(form, checkName){
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
	// 全选 操作
	tsh.checkAll = function(hand, checkbox){
		
		hand = $(hand),
		checkbox = $(checkbox);
		
		var elesort = hand.prop('nodeName') && hand.prop('nodeName').toLowerCase();
		
		var evt = ( elesort == 'input' ) ? 'change' : 'click';

		hand.on(evt, function(){
			
			if ( elesort == 'input' ){
				
				if ( hand.prop('checked') ){
					checkbox.prop('checked', true);
				}else{
					checkbox.prop('checked', false);
				}
				
			}else{
				
				if ( hand.text()=='\u5168\u9009' ){
					checkbox.prop('checked', true);
					hand.text('\u4E0D\u5168\u9009')
				}else{
					checkbox.prop('checked', false);
					hand.text('\u5168\u9009')
				}
				
				
			}
			
		});
		
	};
	
	/*
		防止采编人员上传过大图片倒置页面变形
		不考虑ie6的话，用css定义max-width是最好的。
	*/
	tsh.copyerPic = function( wrap, width ){
		wrap = $(wrap);
		wrap.find('img').each(function(){
			if ($(this).width()>=width){$(this).width(width);}
		});
		
	};
	// 统一高度
	tsh.allHeight = function( eles, repeat ){
		eles = $( eles );
		var setHval = arguments[2],maxH=0;
		if ( !setHval )
		{
			eles.each(function(i, ele){

				if ( repeat ){$(ele).css('height','auto');}/* 初始化高度之后有利于重新第再次计算 */
				if ($(ele).height()>maxH)
				{
					maxH = $(ele).height();
				}
		
			});
			eles.height(maxH);
		}else{
			setHval = parseFloat(setHval);
			eles.height(setHval);
		}
	};
	// 获取 文件后缀名
	tsh.getFileType = function( file ){
		if ( typeof file !== 'string' ){return;};
		return file.match(/\..+$/g)[0];
	};
	// 视频播放器
	tsh.videoPlay = function( param ){
		  var playbox  = $(param.box),
		  	  swf 	   = param.swf,
		  	  file 	   = param.file,
		  	  width    = param.width || 250,
		  	  height   = param.height || 200,
		  	  playStr  = '',
		  	  fileType = this.getFileType( file );
		  	  
		  if (fileType=='.wmv')
		  {
			  playStr = '<embed width="'+parseFloat(width)+'" height="'+parseFloat(height)+'" autostart="1" loop="false" type="video/x-ms-wmv" src="'+file+'">';
		  }
		  else if (fileType=='.flv')
		  {
				if (!swf || !file){
					playStr = 'fail! File not found...';
				}else{
					playStr = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+parseFloat(width)+'" height="'+parseFloat(height)+'"><param name="movie" value="'+swf+'" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><param name="allowFullScreen" value="true" /><param name="FlashVars" value="vcastr_file='+file+'" /><embed src="'+swf+'" allowfullscreen="true" flashvars="vcastr_file='+file+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+parseFloat(width)+'" height="'+parseFloat(height)+'"></embed></object>';
				}
		  }
		  else
		  {
			  playStr = '<b style="color:red">\u89C6\u9891\u672A\u80FD\u6B63\u5E38\u64AD\u653E\uFF0C\u8BF7\u68C0\u67E5\u89C6\u9891\u683C\u5F0F\u7C7B\u578B\uFF0C\u4EE5\u53CA\u8C03\u7528\u8BE5\u65B9\u6CD5\u7684API</b>';
		  }
		  playbox.html( playStr );
	};
	// 低版本的ie placeholder属性
	tsh.placeholder = function(){
		var isie = ~~$.tsh.usebrowser.replace('IE','');
		if( isie>0 && ( $.tsh.IEDocMode<10 || $.tsh.IEDocMode==='undefined' ) ){
			$(':text[placeholder],textarea[placeholder]').each(function(ele, i){
				var thisObj = $(ele),
				// label 这块的样式由于扩展与优先级的问题没有写死，用placeholder样式自定义吧...
					label = $('<label class="placeholder" style="position:absolute;">'+thisObj.attr('placeholder')+'</label>');
				
				thisObj.parent().css('position','relative')
				thisObj.after( label );
				
				label.on('click', function(){
					$(this).hide().prev(':text,textarea').focus();
				});
				thisObj.on('focus', function(){
					if( $(this).next('label:visible') ){
						label.hide();
					}
					
				}).on('blur', function(){
					if( !$(this).val().trim() ){
						label.show();
					}
				});
				
			});
		}
		
	};
	
	// 导航选中状态
	tsh.currentMenu = function( nav, index ){
		
		index = ( typeof index != 'number' ) ? parseInt( index ) : index;
		if ( typeof index != 'number' ) return false;
		
		$(nav).eq( index ).addClass('current').siblings(nav).removeClass('current');
	
	};
	
	// 字段清空
	tsh.emptyEle = function( box ){
		
		var Box   = $(box),
		deEle = arguments[1] || '.jq-empty';

		Box.find( deEle ).each(function(i, ele){
			var curEle = $(ele);
			if( curEle.prop('nodeName').toLowerCase()==='input' || curEle.prop('nodeName').toLowerCase()==='textarea' ){
				curEle.val('');
			}else if( curEle.prop('nodeName').toLowerCase()==='select' ){
				curEle.find(':selected').prop('selected', false);
			}else{
				curEle.html('');
			};

		});
		
	};
	// 下拉框
	tsh.dropDown = function( dropdownbox ){
		dropdownbox = dropdownbox ? $(dropdownbox) : $('.dropdownbox');
		
		dropdownbox.on('mousedown', function( ev ){
			var ev = ev || event,
				thisObj = $(this);
			dropdownbox.not( thisObj ).find('.downcontent').hide();
			
			if ( !thisObj.find('.downcontent a').length ){
				return;
			}
			
			thisObj.find('.downcontent').slideDown('fast');
			
			
			ev.stopPropagation();
		}).find('.downcontent').on('click','a',function( ev ){
			var thisObj = $(this);
			
			thisObj.closest(dropdownbox).children(':text').eq(0).val( thisObj.text() ).attr('key', thisObj.attr('key') || '' );
			thisObj.parent().slideUp('fast');
			
		}).prevAll(':text').prop('readonly', true);
		
		$(document).on('mousedown', function(){
			dropdownbox.find('.downcontent').hide();
		});
		
		//return thisdropDown;
		
	};
	
	// 弹出 浮层
	tsh.popupBox = function( param ){
		var hand= $( param.hand ),
			box = $( param.box ),
			zIndex = param.zindex || 1000,
			CW  = 0,
			CH  = 0,
			boxW= parseInt( param.width ),
			boxH= parseInt( param.height ),
			sclT= 0,
			sclL=0,
			callback = param.callback;

		if ( !box.length ){
			this.log( 'color:red', "error:not "+param.box );
			return;
		}
		// 是否外层判断并处理
		if ( box.parent().prop('nodeName').toLowerCase()!='body' ){
			$('body').append( box );
		}

		if ( !(param.width) ){
			box.css('display','inline');
			boxW = box.width();
			
		}if ( !(param.height) ){
			box.css('display','inline');
			boxH = box.height();
		}

		var bgDiv = $('#coverPop').length ? $('#coverPop') : $('<div id="coverPop"></div>');

		var posFn = function(){
			CW  = document.documentElement.clientWidth;
			CH  = document.documentElement.clientHeight;
			sclT= $(document).scrollTop() || 0;
			sclL= $(document).scrollLeft() || 0;
		
			var left = ( ( CW - boxW )*0.5 < 0 ) ? 0 : ( ( CW - boxW )*0.5 > (CW-boxW) ) ? CW-boxW : ( CW - boxW )*0.5;
			var top = ( ( CH - boxH )*0.5 < 0 ) ? 0 : ( ( CH - boxH )*0.5 > (CH-boxH) ) ? CH-boxH : ( CH - boxH )*0.5;

			var css = {
				"position":"absolute",
				"z-index":zIndex,
				"display":"none",
				"left":left+sclL,
				"background-color":"white",
				"top":top+sclT
			};

			var DH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
			bgDiv.css({"position":"absolute","z-index":zIndex-1,"left":"0","top":"0","width":"100%","display":"none","background":"black","opacity":"0.5","height":DH});

			return css;
		};

		var css = posFn();

		if ( param.width ){
			css.width = param.width;
		}else{
			css.width = 'auto';
		}
		if ( param.height ){
			css.height = param.height;
		}else{
			css.height = 'auto';
		}

		box.css( css ).before( bgDiv );

		hand.on('click', function(){
			var DH    = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
			box.css( posFn() );
			bgDiv.height( DH ).fadeIn();
			box.fadeIn();
			if ( typeof callback === 'function' ){
				callback.apply(this, [box]);
			}
		});

		box.find('.closeMe').on('click', function(){
			bgDiv.fadeOut('fast');
			box.fadeOut('fast');
		});
	};
	
	// 获取 url 参数   想了一下还是最终返回一个对象比较好。把全部集合返回出去让开发自己挑
	tsh.getUrlParam = function(){
		var result = {},
			searchstr = arguments[0] ? arguments[0]+''.substring(arguments[0]+''.indexOf('?')) : document.location.search;
		searchstr = searchstr.ltrim();
		
		var arr = searchstr.split('&');
		for(var i=0,l=arr.length; i<l; i++){
			var itemarr = arr[i].split('=');
			result[itemarr[0]] = itemarr[1];
		}
		return result;
	};
	
	// tab切换
	tsh.checkTab = function( param ){
		var hand = param.hand,
			box  = param.box,
			evt  = param.evt || 'click',
			callback = param.callback;
		$(hand).on(evt, function(){
			var thisObj = $(this),
				Index 	= thisObj.index(hand);
			thisObj.addClass('current').siblings(hand).removeClass('current');	
			$(box).eq(Index).show().siblings(box).hide();
			if( typeof callback === 'function' ){
				callback.apply(this,[]);
			};	
		});
	};
	// 接口 绑定至jquery下面
	$.tsh = tsh;
	
	fnTsh.common = {};
	/*
		对一些原生方法的扩展
	*/
	if( !''.trim ){
		String.prototype.trim = function(){
			return this.replace(/^\s+|\s+$/mg,'');
		}
	};
	
	String.prototype.rtrim = function( delStr ){
		// 没有想到很好的正则，先分开写得土了点
		var resultStr = '';
		if ( delStr ){
			var I = this.lastIndexOf( delStr );
			resultStr = this.substring(0, I <0 ? this.length : I) + (I <0 ? '' : this.substring( I+1 ));
		}else{
			resultStr = this.replace(/.$/mg,'');
		}
		
		return resultStr;
		
	};
	String.prototype.ltrim = function( delStr ){
		var resultStr = '';
		if ( delStr ){
			var I = this.indexOf( delStr );
			resultStr = this.substring(0, I <0 ? this.length : I) + (I <0 ? '' : this.substring( I+1 ));
		}else{
			resultStr = this.replace(/^./mg,'');
		}
		
		return resultStr;
	};
	// 删除数组某个值，第二个参数决定是否重复删除。例如要删除的值在数组多次出现，是否只删除第一个还是所有的
	Array.prototype.delVal = function( val, repeat ){
		var one = false;
		for(var i in this){
			if ( this[i]===val && !one ){
				this.splice(i, 1);
				if ( !repeat ){
					one = true;
				}
			}
		}
		return this;
	};
	
	Array.prototype.clearRepeat = function(){
		var item = {}, result = [];
		for(var i=0,l=this.length; i<l; i++){
			var m = (typeof this[i])+this[i];
			if ( item[m] === undefined ){
				result.push( this[i] );
				item[m] = 'yes';
			}
		}
		
		return result;
	};
	
	
	// 真，伪数组互转
	Array.prototype.toObject = function(){
		var obj = {}, 
			push = Array.prototype.push; 
			push.apply(obj, this ); 
			return obj;
	};
	fnTsh.common.ObjectToArray = function(){
		var slice = Array.prototype.slice;
			// 为防止报错，检查对象是否有length属性
			if ( this.length === undefined ){return false;}
			return slice.call(this,0); 
	};
	
	Date.prototype.format = function(format)
	{
		var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter
			"S" : this.getMilliseconds() //millisecond
		}
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
		(this.getFullYear()+"").substr(4 - RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
		format = format.replace(RegExp.$1,
		RegExp.$1.length==1 ? o[k] :
		("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
	
	// 获取css属性值
	if ( !win.getComputedStyle || (typeof win.getComputedStyle) !== 'function' ){
		// This.currentStyle ? This.currentStyle[curCN] : getComputedStyle(This,null)[curCN];
		
		win.getComputedStyle = function( ele ){
			var This = ele.nodeName ? ele : ele.get(0);
			return This.currentStyle ? This.currentStyle : getComputedStyle(This,null);
		};
	}
	/*
		对象挂接
	*/
	win.common = fnTsh;
	
})(jQuery, window);


//});