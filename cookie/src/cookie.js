define({
	setCookie: function(key, val){
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
	},
	getCookie: function( key ){
		var CookStr = document.cookie;
		CookArr = CookStr.split('; ');
		for(var i in CookArr)
		{
			if (CookArr[i].split('=')[0]==key)
			{
				return unescape(CookArr[i].split('=')[1]);
			}
		}
	},
	delCookie: function( key ){
		var keyVal = '',saveDay;
		saveDay = new Date('1970/01/05');
		saveDay.setDate(saveDay.getDate());
		document.cookie = key+'='+keyVal+'; expires='+saveDay.toGMTString()+'; path=/';
	}
});