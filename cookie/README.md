## `cookie` By TanShenghu

<br>

**自己以前写的一套cookie设置、获取、删除方法**

<br>



## javascript


```javascript
seajs.use(['$','cookie'], function($, cookie) {
	
	
	cookie.setCookie(key, value, expires); // 前两个必选参，第三个可选参number类型(注：以过期天数为单位)
	
	cookie.getCookie( key );
	
	cookie.delCookie( key );
	
});
```


### 完     The End