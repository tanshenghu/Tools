## `formRequest` By TanShenghu



**formRequest方法主要用于ajax表单提交数据，它能将form表单下所有拥有name属性的文本域内容获取到并以json对象返回出来。


---

> **该方法是我在支付宝做外包时所写的，因支付宝项目采用的是seajs模块化开发，js需要spm build打包压缩，<br>
> **如果后端哪天需要修改提交参数接收的字段名，改js代码显得比较麻烦。有了该方法后端开发同学只需要<br>
> **在VM(视图模板)修改对应文本域name属性就行了，前端无需做任何改动！

---


## html


````html
<form id="myform">
	<div>
		<label>用户名：</label>
		<input type="text" name="username">
	</div>
	<div>
		<label>性别：</label>
		<input type="radio" name="sex" value="男">男 &nbsp; &nbsp;
		<input type="radio" name="sex" value="女">女 &nbsp; &nbsp;
	</div>
	<div>
		<label>您是否喜欢国术</label>
		<select>
			<option value="yes">yes</option>
			<option value="no">no</option>
		</select>
	</div>
	<div>
		<label>兴趣好爱：</label>
		<label><input type="checkbox" name="hobby" value="咏春拳">咏春拳</label> 
		<label><input type="checkbox" name="hobby" value="陈式太极">陈式太极</label> 
		<label><input type="checkbox" name="hobby" value="八卦掌">八卦掌</label> 
		<label><input type="checkbox" name="hobby" value="形意拳">形意拳</label> 
		<label><input type="checkbox" name="hobby" value="洪拳">洪拳</label> 
		<label><input type="checkbox" name="hobby" value="铁线拳">铁线拳</label> 
		<label><input type="checkbox" name="hobby" value="蔡李佛">蔡李佛</label> 
		<label><input type="checkbox" name="hobby" value="自然门">自然门</label> 
		<label><input type="checkbox" name="hobby" value="截拳道">截拳道</label> 
	</div>
	<div>
		<label>备注：</label>
		<textarea name="remark"></textarea>
	</div>
	<p align="center"><input type="button" value="提 交"></p>
</form>
````


## javascript


```javascript
seajs.use(['$','formRequest'], function($, formRequest) {
	
	$(':button').on('click', function(){
		
		var param = formRequest({
			form: '#myform'
		});
		
	});
	
});
```

## Api

formRequest({ <br>
	form: '#myform', // 必选参数，指定form表单节点，并非只能form标签，div也行。下面其它参数可选 <br>
	selector: '[name="remark"]', <br>
	way: true, <br>
	Encode: escape <br>
});
