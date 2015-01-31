## `gridSort` By TanShenghu

<br>

**gridSort方法用于前端列表排序，主要用于分页列表等排序功能，要注意需要排序的字段要是数字、日期、金额(可带千分位)，非数字前端不好去排。其实排序功能一般后端来做的，无聊时周末在家写了个例子...**

<br>

---

> - 该方法是我在信息平台做财资系统，PD开需求评审会议时提到列表要有排序功能，会议过后我便开始想...

---


## html


````html
	<h2>列表排序</h2>
	<table border="1" width="100%">
		<thead>
			<tr>
				<th>名称</th>
				<th>时间<a href="javascript:;" class="desc">↑</a> <a href="javascript:;" class="asc">↓</a></th>
				<th>价格<a href="javascript:;" class="desc">↑</a> <a href="javascript:;" class="asc">↓</a></th>
				<th>重量<a href="javascript:;" class="desc">↑</a> <a href="javascript:;" class="asc">↓</a></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1被子</td>
				<td>2012-03-12</td>
				<td>50.75</td>
				<td>5</td>
			</tr>
			<tr>
				<td>2冰箱</td>
				<td>2008-09-20</td>
				<td>3,000.00</td>
				<td>520</td>
			</tr>
			<tr>
				<td>3宝马</td>
				<td>2015-01-01</td>
				<td>1,200,000.00</td>
				<td>100</td>
			</tr>
			<tr>
				<td>4鱼缸</td>
				<td>2010-10-19</td>
				<td>30.00</td>
				<td>3</td>
			</tr>
			<tr>
				<td>5高压锅</td>
				<td>2014-11-11</td>
				<td>230.50</td>
				<td>2000</td>
			</tr>
			<tr>
				<td>6空调</td>
				<td>2011-11-11</td>
				<td>5,999.90</td>
				<td>1900</td>
			</tr>
			<tr>
				<td>7电烤炉</td>
				<td>2015-01-01</td>
				<td>980.00</td>
				<td>2</td>
			</tr>
			<tr>
				<td>8三星手机</td>
				<td>2014-03-08</td>
				<td>1,700.00</td>
				<td>0.3</td>
			</tr>
			<tr>
				<td>9观赏鱼</td>
				<td>2014-12-23</td>
				<td>100.00</td>
				<td>20</td>
			</tr>
			<tr>
				<td>10联想笔记本电脑</td>
				<td>2008-11-25</td>
				<td>3,200.00</td>
				<td>6</td>
			</tr>
			<tr>
				<td>11观赏鱼</td>
				<td>2014-12-23</td>
				<td>100.00</td>
				<td>20</td>
			</tr>
		</tbody>
	</table>
````


## json数据


```javascript
{
	"content":
	{
		"username":"tanshenghu",
		"sex":"男",
		"remark":"程序猿 - 前端攻城狮！",
		"tblname":[
			{"company":"炎黄新星","nature":"民营公司","people":"1000人"},
			{"company":"中软国际","nature":"外包公司","people":"10000人"},
			{"company":"文思海辉","nature":"外包公司","people":"10000人"}
		]
	},
	"hasError":false
}
```


## javascript


```javascript
seajs.use(['$','gridSort'], function($, gridSort) {
	
	
	$('thead a').on('click', function(){
		// desc  asc
		var idx = $( this ).parent().index(),
			S = $(this).prop('className');
			
		gridSort.sort( 'tbody', idx, S );
		
	});
	
	
	/* 
		参数就这么三个，也比较简单，不做赘诉
	*/
	
});
```


### 完     The End