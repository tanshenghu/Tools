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
	tsh.IEDocMode = document.documentMode;
	tsh.useBrowser = tsh.browserMsg.match(/msie 6./img) ? 'IE6' : tsh.browserMsg.match(/msie 7./img) ? 'IE7': tsh.browserMsg.match(/msie 8./img) ? 'IE8' : tsh.browserMsg.match(/msie 9./img) ? 'IE9' : tsh.browserMsg.match(/msie 10./img) ? 'IE10' : tsh.browserMsg.match(/msie 11./img) ? 'IE11' : tsh.browserMsg.match(/firefox/img) ? 'firefox' : 'webkit';
	tsh.ltIE8 = (!+[1,]); // 不能用这个做ie的判断条件了，因为ie8以后已经修复这个问题了
	// 低于ie8的浏览器包括ie的文档模式
	tsh.isIE8 = ~~tsh.useBrowser.replace(/IE/i,'')>0 && ~~tsh.useBrowser.replace(/IE/i,'')<9 && (tsh.IEDocMode<9 || !tsh.IEDocMode);
	tsh.isIE9 = ~~tsh.useBrowser.replace(/IE/i,'')>0 && ~~tsh.useBrowser.replace(/IE/i,'')<10 && (tsh.IEDocMode<10 || !tsh.IEDocMode);
	tsh.isIE = /msie/img.test( tsh.browserMsg );
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
		script.src = 'http://git.oschina.net/tanshenghu/myweb/raw/master/static/js/common_demo.js?rand=js'+new Date().getTime();
		//script.src = 'myGit/oschina/myweb/static/js/common_demo.js?rand=js'+new Date().getTime();
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
	tsh.formRequest = function( param ){
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
	tsh.formRequest.getCheckboxVal = function(form, checkName){
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
	// 对form表单获取数据的扩展，主要是对tr行获取数据的扩展
	tsh.formRequest.getLineVals = function( trs ){
		trs = $( trs );
		var result = [];
		trs.each(function(){
			var iObj = {};

			$(this).find('[name]').each(function(i, ele){
				var elent = $(ele),
				    nodeName = elent.prop('nodeName').toLowerCase();
				if ( nodeName == 'input' || nodeName == 'textarea' || nodeName == 'select' ){
					iObj[ elent.attr('name') ] = elent.val();
				}else{
					iObj[ elent.attr('name') ] = elent.text();
				}
			});
			
			result.push( iObj );
			
		});
		
		return result;
		
	};
	// 请求后端json,根据后端的json把数字全部fill到表单的每一个输入框中，对号入座
	tsh.formFill = {
		
		init: function( o ){
			this.url      = o.url;
			this.param    = o.param;
			this.form     = $(o.form);
			this.callback = o.callback;
			
			this.getData();
		},
		getData: function(){
			var This = this;
			$.getJSON(this.url, this.param, function(data){
				This.fillVal( data.content );
				//alert( This.form.find('[name="interest"]').eq(3).val() )
			});
		},
		fillVal: function( data ){
			// 判断 标签类型
			var elesort = function( obj ){
				var tagname = obj.prop('nodeName').toLowerCase(), type = obj.attr('type'), result;
				if( tagname === 'input' ){
					result = type;
				}else{
					result = tagname;
				}
				return result;
			};
			
			for(var i in data){
				var dataval = data[i], ele = this.form.find('[name="'+i+'"]');
				if( typeof D === 'string' ){
					
					switch( elesort(ele) ){
						case 'text': ele.val( dataval ); break;
						case 'textarea': ele.val( dataval ); break;
						case 'checkbox': ele.val( dataval ); break;
						case 'radio': ele.not('[value!="'+dataval+'"]').prop('checked', true); break;
						case 'select': 
							var option = ele.find('[value="'+dataval+'"]').length ? ele.find('[value="'+dataval+'"]') : ele.find(':contains('+dataval+')');
								option.prop('selected', true);
						break;
						default : ele.val( dataval ); break;
					}
					
				}else if( (dataval instanceof Array) && (typeof dataval[0]==='object') ){
					// 到这一步，考虑到表格列表行数据，第一个td或许有checkbox最后一个td或许有操作等不定的因素。所以这块目前考虑回调，自己定义方法处理
					//for(var j=0,l=iarr.length; j<l; j++){...}
					// 不知道模板格式样子，在此处留了一个后台勾子，开发自定义去写
					var trs = this.fillVal.filltr( dataval );
					ele.find('tbody').first().html( trs );
				}
				
				
			}
			
			typeof this.callback === 'function' && this.callback.apply( this.form );
			
		}
		
		
	};
	// 删除tr行数据
	tsh.removeLine = function( This ){
		This = $( This );
		var pobj = This.closest('tr');
		pobj.remove();
	};
	// 添加行数据
	tsh.addNewLine = function( tplTab, tarTab ){
		tplTab = $( tplTab );
		tarTab = $( tarTab );
		var lastTr;
		if ( tplTab.prop('nodeName').toLowerCase()==='script' ){
			lastTr = $( tplTab.html() );
		}else{
			lastTr = tplTab.find('tbody tr').last();
		}
		var newTr = lastTr.clone( true );
		newTr = newTr.not('.noEmpty');
		newTr.find(':text,textarea').val('');
		newTr.find('.cival').empty();
		tarTab.find('tbody').append( newTr );
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
		if( this.isIE9 ){
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
	// 自定义 radio,checkbox框
	tsh.customCheckbox = function(){
		if( this.isIE9 ){
			$('body').on('change','.custom-checkbox', function(){
				var thisObj = $(this), type = thisObj.attr('type').toLowerCase(), name = thisObj.attr('name');
					if ( type==='checkbox' ){
						if ( thisObj.prop('checked') ){
							thisObj.parent().addClass('checked');
						}else{
							thisObj.parent().removeClass('checked');
						}
					}else if( type==='radio' ){
						if ( name ){
							$(':radio[name="'+name+'"]').parent().removeClass('checked');
						}
						thisObj.parent().addClass('checked');
					}
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
			var thisObj = $(this),
				dropdownbox = thisObj.closest('.dropdownbox'),
				cinput = dropdownbox.children('.cinput');
			
			var callfn = dropdownbox.data( 'dropdown' );
			
			if ( cinput.prop('nodeName').toLowerCase() === 'input' ){
				cinput.val( thisObj.html() ).attr('key', thisObj.attr('key') || '' );
			}else{
				cinput.text( thisObj.html() ).attr('key', thisObj.attr('key') || '' );
			}
			thisObj.parent().slideUp('fast');
			
			if ( callfn && callfn.callback && typeof callfn.callback == 'function' ){
				callfn.callback.apply( this,[] );
			}
			
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
			cover = param.cover,
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

		box.css( css );
		cover = ( typeof cover == 'undefined' ) ? true : cover;
		if ( cover ){
			box.before( bgDiv );
		}

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
			if ( cover ){
				bgDiv.fadeOut('fast');
			}
			box.fadeOut('fast');
		});
	};
	
	// 获取 url 参数   想了一下还是最终返回一个对象比较好。把全部集合返回出去让开发自己挑
	tsh.getRequest = function(){
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
	
	//   这种方法ie内存溢出了，行不通，明天改一下，然后明天还要把货币千位符加上去
	tsh.inputSort = function(){
		var This = this,
			input_sort = {
				number : function(obj){
					var _input = obj, val = _input.val();
					_input.val( val.replace(/\D/img,'') );
				},
				char : function(obj){
					var _input = obj, val = _input.val();
					_input.val( val.replace(/[^A-Za-z]/img,'') );
				},
				chinese : function(obj){
					var _input = obj, val = _input.val();
					_input.val( val.replace(/[^\u4e00-\u9fa5]/img,'') );
				},
				maxlength : function(obj){
					// ie9以后就开始支持maxlength属性
					if ( !( ~~This.useBrowser.replace('IE','')>9 || ~~This.useBrowser.replace('IE','')<1 ) ){
						return;
					}
					var _input = obj, val = _input.val(), maxlen = _input.attr('maxlength');
					if ( val.length > maxlen ){
						_input.val( val.substring(0, maxlen) );
					}
				}
		};
		$('input[isort],textarea[isort]').each(function(Iele, ele){
			//var _event = $.browser.msie ? this.onpropertychange : this.oninput;  在这里IE浏览器堆栈溢出,需想办法解决
			ele = $(ele);
			var sortchange = function(){
					var _input = ele, _sort = _input.attr('isort');
					switch(_sort){
						case 'number': input_sort.number(_input); break;
						case 'char': input_sort.char(_input); break;
						case 'chinese': input_sort.chinese(_input); break;
						case 'maxlength': input_sort.maxlength(_input); break;
					}
				
			};

			if( This.ltIE8 ){
				$(ele).on('keyup', function(){
					sortchange();
				}).on('blur', function(){
					sortchange();
				});
			}else{
				// ie9 开始支持oninput方法
				ele.on('input', function(){
					sortchange();
				});
				
			}

		});
	};
	// 接口 绑定至jquery下面
	$.tsh = tsh;
	
	/*
	  2014-12-21 编写此前端列表排序的方法。
	  写此方法是因为做财资系统项目可能需要这个排序功能，但这个功能最好是后端来做排序比较准确。
	  前端来做的优点是减少数据请求减小服务器压力
	*/
	fnTsh.gridsort = {
		
		sort : function( tbody, idx, srt ){
			this.srt = srt || 'desc';
			this.idx = parseInt( idx );
			this.tbody = $( tbody );
			
			this.contrast();
		},
		// 每行数据的比较
		contrast : function(){
			var This = this,
				trArr   = [],
				NumArr = [];
				
			this.tbody.find('tr').each(function(i, ele){
				trArr.push( ele );
				
				var curTd = $(ele).children().eq( This.idx );
				NumArr.push( curTd.text() );
				
			});
			
			NumArr.sort(function(a, b){
				a = parseFloat( This.filter(a) );
				b = parseFloat( This.filter(b) );
				if ( This.srt === 'asc' ){
					if ( a < b ){
						return -1;
					}else{
						return 1;
					}
				}else{
					if ( a > b ){
						return -1;
					}else{
						return 1;
					}
				}
				
			});
			
			// 伪数组
			var newTrObj = This.newsortobj( trArr, NumArr );
			This.tbody.empty();
			for( var i=0, l=newTrObj.length; i<l; i++ ){
				This.tbody.append( newTrObj[i] );
			}
			
		},
		// 用于字符过滤操作，把日期、千分位等里面的特殊符号过滤掉再比较大小
		filter: function( val ){
			return val.replace(/-|\/|:|\s|,/g,'');
		},
		// 根据大小条件 组装json
		newsortobj : function( trs, nums ){
			var This = this,
				resultObj = {"length":0};
			for(var i=0,l=nums.length; i<l; i++){
				
				var cnum = nums[i];
				for(var j=0,k=trs.length; j<k; j++){
					if ( $( trs[j] ).children().eq( This.idx ).text() == cnum ){
						resultObj[ resultObj.length ] = $( trs[j] );
						resultObj.length += 1;
					}
				}
				
			}
			
			return resultObj;
			
		}
		
	};
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
	fnTsh.ObjectToArray = function( obj ){
		var slice = Array.prototype.slice;
			// 为防止报错，检查对象是否有length属性
			if ( this.length === undefined ){return false;}
			return slice.call(obj, 0); 
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
	// 这个方法是以前支付宝海外转运项目里拿下来的代码。一行一行解读一下代码吧...
	fnTsh.milliFormat = function(s, decimal){
		
		// 首先转string类型，保证下面的replace,test等方法执行
        s = s + '';
        // 发现input的keyup事件时，有bug需要过虑逗号
        s = s.replace(/,/g, '');
        // s字符串只能出现数字与.这两种字符，否则return 无效的value中止下面的操作
        if(/[^0-9\.]/.test(s)) {
            //return "invalid value";
            return s;
        }
        
        // 这三句慢慢点看，它的操作就是在金额后面添加一个.00的操作，并且最终把.00换成,00
        s = s.replace(/^(\d*)$/,"$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".",",");
        
        // 下面的是一个while循环，虽然不怎么喜欢用while，但是在类似的这种场景下while有很大的优势。细看正则与不断的循环就不难了解了！这也是整个过程最重要的环节所在
        var re = /(\d)(\d{3},)/;
        while(re.test(s)){
            s = s.replace(re,"$1,$2");
        }
        
        // 是否保留两位有效小数
        if( decimal===true ){
            // 上面循环完成之后，再将最后的,00换回.00
            s = s.replace(/,(\d\d)$/, ".$1");
        }else{
        	s = s.replace(/,(\d\d)$/, "");
        }
        
        // 如果用户输入.开头的字符，将替换成0.  觉得作者把代码写得比较的完善...考虑比较全
        return s.replace(/^\./, "0.");
    };
    // 如果是input输入框取光标位置
	fnTsh.milliFormat.selectionStart = function( input ){
		 
        var cursurPosition = -1;

        if(input.selectionStart != undefined){
            cursurPosition = input.selectionStart;
        }else{
            var range = document.selection.createRange();
            range.moveStart("character", -input.value.length);
            cursurPosition= range.text.length;
        }

        return cursurPosition;
	};
	fnTsh.milliFormat.setSelectionRange = function( input, pos ){
			
			var cursurPosition = -1;

            if(input.selectionStart != undefined){
                input.setSelectionRange(pos,pos);
            }
            else{
                var range = input.createTextRange();
                range.move("character", pos);
                range.select();
            }
	};
    fnTsh.validate = {
		/* Author: TanShenghu  TSH
		   Update: 15-01-14
		   表单验证不怎么好用，哎，还是自己动手写个吧！代码有时间再做优化
		
			写扩展：
			window.fnTsh.rules.tsh = function(ele,curRules){
				var value = $(ele).val();
				var result = /tanshenghu/.test( value );
				this( result, ele, curRules );
				return result;
			}
		
		*/

		init: function( form ){
			this.form = $( form );
			this.blur();
			return this.getrules() && this.form.find('.formTip').length===0;
		},
		getele: function(){
			return this.form.find('[data-need]');
		},
		getrules: function(){
			var This = this, eles = this.getele(), result = true;
			eles.each(function(i, ele){
				result = This.verify( ele );
			});
			
			return result;
		},
		verify: function( ele ){
			var need = $(ele).data('need'), result = true;
				if( need ){
					var arr = need.split(',');
					for(var i=0,l=arr.length; i<l; i++){
						// 第一个参数是规则，当前验证节点，当前验证到N个规则
						result = this.exeRules( arr[i], ele, i );
						if( result===false ){
							break;
						}
					}
				}
				
			return result;
				
		},
		exeRules: function( rls, ele, curRules ){
			
			if ( typeof this.rules[ rls ] === 'function' ){
				var result = this.rules[ rls ].apply( win, [ele] );
				// 把验证结果 抛给showmsg方法去处理,  下次抽时间把msg这块的信息尽量配置在js中
				this.showmsg( result, ele, curRules );
				return result;
			}else{
				$.tsh.log(rls+' erroneous rules');
			}
			
		},
		rules: {
			'required': function( ele ){
				var value = $(ele).val().trim();
				var result = value.length==0?false:true;
				return result;
			},
			'email': function( ele ){
				var result = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test( $(ele).val() );
				return result;
			},
			'url': function( ele ){
				var result = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/.test( $(ele).val() );
				return result;
			},
			'number': function( ele ){
				//var result = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( $(ele).val() );
				var result = !isNaN( $(ele).val() );
				return result;
			},
			'decimals': function( ele ){
				var result = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test( $(ele).val() );
				return result;
			},
			'phone': function( ele ){
				var result = /^1[3|5|7|8|][0-9]{9}$/.test( $(ele).val() );
				return result;
			},
			'tel': function( ele ){
				var result = /^(0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$/.test( $(ele).val() );
				return result;
			},
			'QQ': function( ele ){
				var result = /^[1-9]\d{5,10}$/.test( $(ele).val() );
				return result;
			},
			'Hanzi': function( ele ){
				var result = /^[\u4e00-\u9fa5]+$/.test( $(ele).val() );
				return result;
			},
			'zipcode': function( ele ){
				var result = /^[1-9]\d{5}$/.test( $(ele).val() );
				return result;
			},
			'ID': function( ele ){
				var result = /^[1-9]\d{16}(\d|X)$/.test( $(ele).val() );
				return result;
			},
			'IP': function( ele ){
				var result = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test( $(ele).val() );
				return result;
			},
			'port': function( ele ){
				var value = $(ele).val();
				var result = (value>0 && value<65536);
				return result;
			},
			'equalTo': function( ele ){
				var thisObj = $(ele), eqto = $( thisObj.attr('eqto') );
				var result = thisObj.val()===eqto.val();
				return result;
			},
			'money': function( ele ){
				var result = /^[0-9|,|\.]+$|^$/.test( $(ele).val() );
				return result;
			},
			'date': function( ele ){
				var result = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test( $(ele).val() );
				return result;
			}
		},
		showmsg: function( bool, ele, curRules ){
			ele = $( ele );
			var fbox     = ele.closest('td,.formfield'),
				messages = ele.data('msg') ? ele.data('msg').split('|') : [];
			
			if( bool===false ){
				if( fbox.find('.formTip').length ){
					fbox.find('.formTip').first().html( '<i class="kuma-icon kuma-icon-error"></i>'+messages[ curRules ] ).attr('inputname', ele.attr('name'));
				}else{
					fbox.append( $('<p class="formTip"><i class="kuma-icon kuma-icon-error"></i>'+ messages[ curRules ] +'</p>').attr('inputname', ele.attr('name')) );
				}
			}else{
				
				if ( fbox.find('.formTip').attr('inputname')==ele.attr('name') ){
					fbox.find('.formTip').remove();
				}
				
			}
		},
		blurIdx : 0,
		blur: function(){
			
			if( this.blurIdx<1 ){
				var This = this, eles = this.getele();
				eles.each(function(){
					var thisObj = $(this), iname = thisObj.prop('nodeName').toLowerCase(), o={text:'blur',textarea:'blur',select:'select',checkbox:'change',radio:'change'}, cur;
					if( iname==='input' ){
						cur = thisObj.attr('type');
					}else{
						cur = iname;
					}
					// 
					$('body').on(o[cur], 'form [data-need]', function(){
						
						This.verify( this );
						
					});
					
				});
				//=========fuck 阿里下拉框组件。为此验证还得另外写代码做付出===========
				
			}
			
			
			this.blurIdx++;
		}
		
};
	/*
		对象挂接
	*/
	win.fnTsh = fnTsh;
	
	/*
		自执行函数
	*/
	$(function(){
		
		// ie10以下textarea的maxlength属性
		$.tsh.inputSort();
		// ie10以下输入框的placeholder属性
		$.tsh.placeholder();
		// 个性化的checkbox,radio
		$.tsh.customCheckbox();
		
	});
	
	
})(jQuery, window);


//});