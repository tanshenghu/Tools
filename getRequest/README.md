## `getRequest` By TanShenghu

<br>

**getRequest方法用于获取url中的参数，最终返回object对象**

<br>

---

> - 该方法最初是在炎黄新星所写
> - 该方法主要获取url中某个参数，调用方法如下：

---


## javascript


```javascript
seajs.use(['$','getRequest'], function($, getRequest) {
	
	// 无参数的情况，指向当前url
	var param = getRequest();
	var value = param.id;
	
	// 指定url的情况
	var param = getRequest( 'http://www.xxx.com/index.php?id=10&name="tsh"' );
	var value = param.id; // 10
	var name  = param.name; // tsh
	
});
```


### 完 End