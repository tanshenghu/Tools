# formRequest by tanshenghu  TSH


---

> **该方法是在支付宝做外包时，写出来的。当时项目采用seajs模块化开发。spm build打包代码。
> **有时候后端要改一个json提交接收的字段名，这时改脚本，改完之后又要重新压缩打包，显得特别麻烦。
> **所以写了此方法我们把后端需要接收的字段名写进文本域的name属性中就行了

-----



## API

```
 formRequest({
     form    : 'myform', // 必选参数，指向form但不限定form，div也行，下面其它参数均可选。
     selector: '[name="remark"]',
     way     : true,
     Encode  : escape
 });

```