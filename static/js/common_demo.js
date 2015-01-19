//var scriptTag = document.getElementById('tsh_js_demo').src;
//var rand = scriptTag.match(/\?rand=(.+)$/,'g')[1];

var tsh_js_key = $.tsh.remark.key,
	tsh_js_demo = {
		"clientWidth" : "<label>\/\/ 获取客户端浏览器的宽度，调用此方法无需任何参数配置，直接将clientWidth返回出来。</label>",
		"clientHeight" : "<label>\/\/ 获取客户端浏览器的高度，调用此方法无需任何参数配置，直接将clientHeight返回出来。</label>",
		"scrollHeight" : "<label>\/\/ 获取web页面所有承载内容区域的高度，调用此方法无需任何参数配置，直接将scrollHeight返回出来。</label>",
		"scrollWidth" : "<label>\/\/ 获取web页面所有承载内容区域的宽度，调用此方法无需任何参数配置，直接将scrollWidth返回出来。</label>",
		"scrollTop" : "<label>\/\/ 获取浏览器纵向滚动条，已滚动多少像素距离，调用此方法无需任何参数配置，直接将scrollTop返回出来。</label>",
		"scrollLeft" : "<label>\/\/ 获取浏览器横向滚动条，已滚动多少像素距离，调用此方法无需任何参数配置，直接将scrollLeft返回出来。</label>",
		"screenWH" : "<label>\/\/ 获取客户端分辨率(准确点讲应该是获取客户端浏览器的分辨率，js还没办法去获取系统分辨率)</label><p class='fnbox'>$.tsh.screenWH();\/\/返回宽高<br>$.tsh.screenWH('x');\/\/返回宽度<br>$.tsh.screenWH('y');\/\/返回高宽</p>",
		"browserMsg" : "<label>\/\/ 获取客户端浏览器信息，返回值string类型，注意：不是方法，它是成员属性</label>",
		"browserAppName" : "<label>\/\/ 原生代码：navigator.appName，返回浏览器的代码名，返回值只读string类型，注意：不是方法，它是成员属性</label>",
		"browserAppVersion" : "<label>\/\/ 原生代码：navigator.appVersion，返回当前浏览器使用版本，返回值string类型，注意：不是方法，它是成员属性</label>",
		"IEDocMode" : "<label>\/\/ 获取IE浏览器的文档模式，返回值number类型，注意：不是方法，它是成员属性</label>",
		"useBrowser" : "<label>\/\/ 粗略的判断用户当前所用的浏览器，返回值string类型，注意：不是方法，它是成员属性</label>",
		"ltIE8" : "<label>\/\/ 判断是否ie8及以下版本的ie浏览器</label>",
		"isIE8" : "<label>\/\/ 判断是否ie8及以下版本的ie浏览器(包含ie的文档模式小于9也算)</label>",
		"isIE9" : "<label>\/\/ 判断是否ie9及以下版本的ie浏览器(包含ie的文档模式小于10也算)</label>",
		"isIE" : "<label>\/\/ 判断是否IE浏览器，返回值true or false，注意：不是方法，它是成员属性</label>",
		"setCookies" : "<label>\/\/ 设置cookies, 两个必选参数(键, 值)，最后一个可选参数(过期时间以天为单位)。</label><p class='fnbox'>$.tsh.setCookies('username','tanshenghu',30);</p>",
		"getCookies" : "<label>\/\/ 获取cookies值, 一个必选参数(键名)。</label><p class='fnbox'>$.tsh.getCookies('username');</p>",
		"delCookies" : "<label>\/\/ 删除cookies值, 一个必选参数(键名)。</label><p class='fnbox'>$.tsh.delCookies('username');</p>",
		"log" : "<label>\/\/ 对console.log做了一些扩展修改。一个必选参数(即输出打印的内容)。一个可选参数(打印的样式)</label><p class='fnbox'>$.tsh.log('color:red','log');\/\/打印出红色的log字符串</p>",
		"remark" : "<label>\/\/ 此方法是方便日后调用这里面的方法所用...该方法下面还挂着了另一个demo方法，把方法名传进demo方法中即可知道传进demo中的方法的用途</label><p class='fnbox'>$.tsh.remark();\/\/打印出所有挂接在tsh下面的属性、方法(只列出直接挂在tsh下面的，不含二级以后)<br>$.tsh.remark.demo('log');\/\/打印该方法怎么调用</p>",
		"picNum" : "<label>\/\/ 将数字转成图片数字，图片默认是.gif，两个参数(bumber, picpath)</label><p class='fnbox'>$.tsh.picNum(100, 'images/pic_');\/\/最终返回拼接好的html字符串</p>",
		"formRequest" : "<label>\/\/ 该方法的用途是将form表单里面的所有拥有name属性的input,select,textarea等的值获取过来并拼接成json格式传到后端，该方法下面还有getCheckboxVal(form, checkboxName)方法，它只用于获取checkbox组并拼接成数组或者,分隔的字符串最终返回出来，还有另外一个子方法专门取tr行数据的getLineVals('tbody tr');最终返回一个数组，数组里再包含对象。</label><p class='fnbox'>$.tsh.formRequest({form:'#myform',selector:'[name=username]',way:true,Encode:escape,split:','});\/\/共五个参数，第一个form是必选的。后面都是可选参数，第二个参数在form中所特意选择某些字段，第三个参数与第二个参数并用的，为true时只选取第二个参数所选取元素的值，为false时反选，就是除了第二个参数所选取的元素以外所有的值，第四个是传入编码方法防止中文乱码的问题，第五个是checkbox同name组合的字段以,分隔</p>",
		"formFill" : "<label>\/\/ 因为在做阿里项目时，有时候发现后端会放出json数据，然后要前端来做填充操作。所以在2015-01-16就写了该方法. 调用：$.tsh.formFill.init( {url:'datajson.json', param:{'id':'01'}, form:'form', callback:function(){...}});另外还有一个后门方法：$.tsh.formFill.fillVal.filltr= function( arr ){...}这个方法主要是针对，像以前阿里集采平台那种动态新增，删除行数据的那种</label>",
		"removeLine" : "<label>\/\/ removeLine( $(this) );该方法可删除行，即删除tr行。与之对应的是addNewLine( tplTab, tarTab );</label>",
		"addNewLine" : "<label>\/\/ addNewLine( tplTab, tarTab );添加行数据与之对应的是removeLine( $(this) );</label>",
		"checkAll" : "<label>\/\/ checkbox全选功能，checkAll(hand, checkbox)，两个必选参数</label>",
		"copyerPic" : "<label>\/\/ copyerPic(wrap, width)这个方法，是防止后台编辑人员上传过大的图片倒置页面变形的问题，如果不考虑ie6的话建议使用css:max-width来控件比较好！</label>",
		"allHeight" : "<label>\/\/ allHeight(eles, repeat, 200)，统一各块元素的高度，第一个参数必选，后两个参数可选</label>",
		"getFileType" : "<label>\/\/ getFileType(file) 该方法获取文件的扩展、后缀名</label>",
		"videoPlay" : "<label>\/\/ videoPlay({box:'.playerbox',swf:'flash/player.swf',file:'file/play.flv',width:'200',height:'200'}) 该方法的所有参数均这些</label>",
		"placeholder" : "<label>\/\/ 此方法没有参数，只需要调用它。IE10以下的浏览器都会执行页面中所有的input placeholder</label>",
		"customCheckbox" : "<label>\/\/ 自定义、个性化checkbox,radio</label> 相当于组件初始化即可没有参数控制",
		"currentMenu" : "<label>\/\/ 用于不同页面，当前导航菜单选中。这个功能最好是后端来做！</label><p class='fnbox'>$.tsh.currentMenu('nav li', 0);\/\/两个必选参数</p>",
		"emptyEle" : "<label>\/\/ 用于清空文本或者div等里面的内容</label><p class='fnbox'>$.tsh.emptyEle('.myform', '.jq-empty');\/\/第一个参数必选，第二个可选(默认需要在需要清空的元素上定义class=jq-empty)</p>",
		"dropDown" : "<label>\/\/ 个性下拉框</label><p class='fnbox'>$.tsh.dropDown('.dropdownbox');\/\/第一个可选(默认需要在下拉框外层元素上定义class=dropdownbox，然后下拉层的class预定为downcontent)，然后还提供了一个回调的方法，因为这个方法是个公用调用的方法，所以回调需要用.data('dropdown',{callback:function(){函数体内this指向当前下拉框被点击的a标签元素}})绑定至某个下拉框的标签元素上</p>",
		"popupBox" : "<label>\/\/ 简单的弹出层</label><p class='fnbox'>$.tsh.popupBox({hand:'.showpop',box:'.popbox',cover:true,zindex:1000,width:320,height:120,callback:function(box){...}});\/\/所有参数均列出，比较的简单不做详解了...回调函数的this指向原生的hand，第一个参数指向box <br>另外想要弄个关闭按钮就在按钮上加class=closeMe</p>",
		"getRequest" : "<label>\/\/ 获取url中的参数</label><p class='fnbox'>$.tsh.getRequest( url )['id'];\/\/第一个参数可选，默认是当前的url地址，注意：方法最终返回对象</p>",
		"checkTab" : "<label>\/\/ tab选项卡切换</label><p class='fnbox'>$.tsh.checkTab({hand:'ul li',box:'.tabCon .infobox',evt:'click',callback:function(){...}});\/\/所有参数均列出，比较的简单不做详解了</p>",
		"inputSort" : "<label>\/\/ 这个方法里面共有四个小的方法，分别：number，char，chinese，maxlength</label><p class='fnbox'>调用方法：在input,textarea上定义一个isort属性，值为：number，char，chinese，maxlength其中一个即可，不支持多个。</p>",
		
		"common" : "<label>\/\/ 此功能开发于2014-12-21 gridsort===>列表排序功能，这个是一个json对象下面添加了很多小函数来一起完成排序的功能 <br> $('thead th').on('click', function(){<br>// 第三个可选参数的值：desc asc<br>var idx = $( this ).index();<br>window.fnTsh.gridsort.sort( 'tbody', idx, 'asc' );<br>}), <br> ObjectToArray===>将伪数组转数组.fnTsh.ObjectToArray({'0':'a','length':1}); <br> fnTsh.milliFormat( money, true ); // 金额千分位正则替换,第一个必选参数，第二个可选(是否保留两位有效小数) <br> 2015-01-14编写验证控件，该用方法window.fnTsh.validate( 'myform' );// 验证规则、提示语都配置在页面标签中。还可以自己添加自定义规则：window.fnTsh.validate.rules.newrules = function( ele ){return /[0-9].test($(ele).val())/}，以后再优化代码，尽量做得更好吧。</label>",
		
		"other" : "<label>\/\/ 还有一些其它的方法，没有挂接在tsh下面，对原生的对象的一些扩展。如下：<br> String &lt; trim(),rtrim(','),ltrim('|') &gt; 参数都是可选，如果填写参数就是找到那个字符再删除<br> Array &lt; delVal(val, repeat),clearRepeat(),toObject()将数组转伪数组 &gt; <br> window &lt; getComputedStyle(obj)['color'] &gt; <br> Date &lt; new Date().format('yyyy年MM月dd hh:mm:ss')这个扩展方法是在网上摘抄下来的 &gt; <br> Object &lt; toArray() 将伪数组转数组 &gt;</label>"
};


var tsh_js_show_demo = function( key ){
	
	$('#tsh_js_show_demo').remove();
	
	var recordCount = 0;
	for(var i in tsh_js_demo){
		recordCount++;
	}
	
	var htmlStr = '<div id="tsh_js_show_demo">\
	<style scoped="scoped">\
	#tsh_js_show_demo{border:5px dotted red;font-size:12px;padding:20px;color:red;background-color:#FFEBD0;}\
	#tsh_js_show_demo label{color:#999;}#tsh_js_show_demo .fnbox{color:#333;font-size:14px;}\
	#tsh_js_show_demo .blue{color:blue;}#tsh_js_show_demo .green{color:green;}#tsh_js_show_demo .orange{color:orange;}\
	</style>';
	
	htmlStr += tsh_js_demo[key] || '<h2>\u6CA1\u6709\u67E5\u627E\u5230<b class="green">'+key+'</b>\uFF0C\u8BF7\u6CE8\u610F\u5927\u5C0F\u5199\u6216\u8054\u7CFB\u4F5C\u8005<a target=blank class=blue href=http://b.qq.com/webc.htm?new=0&sid=511568692&o=tanshenghu.com&q=7>TanShenghu</a></h2>';
	
	htmlStr += '<p style="color:red;margin-top:15px;">文档中共记录着'+ recordCount +'个调用方法，其中包括common,other两个特殊的</p></div>';
	$('body').children().eq(0).before( htmlStr );
	
}( tsh_js_key || 'other' );