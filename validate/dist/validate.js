define("tanshenghu/validate/1.0.0/validate",["$","./validate.extend","./validate.messages"],function(a,b,c){var d=a("$"),e=d,f={init:function(a){return this.form=e(a),this.rules.This=this.form,this.blur(),this.verify()&&0===this.form.find(".formTip").length},getele:function(){return this.form.find("[data-needverify]")},verify:function(){var a=this,b=this.getele(),c=!0;return b.each(function(b,d){c=a.getrules(d)}),c},getrules:function(a){var b=e(a).data("needverify"),c=!0;if(b)for(var d=b.split(","),f=0,g=d.length;g>f&&(c=this.exeRules({rls:d[f],ele:a,curRules:f}),c!==!1);f++);return c},exeRules:function(a){var b=a.rls,c=a.ele,d=a.curRules;if("function"==typeof this.rules[b]){var e=this.rules[b].apply(window,[c]);return this.showmsg({result:e,ele:c,curRules:d,rls:b}),e}window.console&&console.log(b+" erroneous rules")},rules:{required:function(a){var b,a=e(a),c=a.attr("type").toLowerCase(),d=this.This;if("radio"===c||"checkbox"===c){var f=a.attr("name"),g=d.form.find('[name="'+f+'"]:checked');b=0===g.length?!1:!0}else b=0===a.val().trim().length?!1:!0;return b},email:function(a){var b=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e(a).val());return b},url:function(a){var b=/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/.test(e(a).val());return b},number:function(a){var b=!isNaN(e(a).val());return b}},verifymsg:{required:"必填",email:"邮箱格式错误",url:"url格式错误",number:"请输入数字类型"},showmsg:function(a){var b=a.result,c=e(a.ele),d=a.curRules,f=a.rls,g=c.closest("td,.formfield"),h=c.data("verifymsg")?c.data("verifymsg").split("|"):[],i=h[d]||this.verifymsg[f]||"错误";b===!1?g.find(".formTip").length?g.find(".formTip").first().html(i).attr("inputname",c.attr("name")):g.append(e('<p class="formTip">'+i+"</p>").attr("inputname",c.attr("name"))):g.find(".formTip").attr("inputname")==c.attr("name")&&g.find(".formTip").remove()},blurIdx:0,blur:function(){var a=this;if(this.blurIdx<1){var a=this,b=this.getele();b.each(function(){var b,c=e(this),d=c.prop("nodeName").toLowerCase(),f={text:"blur",textarea:"blur",select:"select",checkbox:"change",radio:"change"};b="input"===d?c.attr("type"):d,e("body").on(f[b],a.form.selector+" [data-needverify]",function(){a.getrules(this)})})}this.blurIdx++}},g=a("./validate.extend"),h=a("./validate.messages");f.rules=e.extend(f.rules,g),f.verifymsg=e.extend(f.verifymsg,h),c.exports=f}),define("tanshenghu/validate/1.0.0/validate.extend",[],function(){var a={};return a.decimals=function(a){var b=/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(a).val());return b},a.phone=function(a){var b=/^1[3578][0-9]{9}$|^$/.test($(a).val());return b},a.tel=function(a){var b=/^(0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$|^$/.test($(a).val());return b},a.QQ=function(a){var b=/^[1-9]\d{5,10}$|^$/.test($(a).val());return b},a.Hanzi=function(a){var b=/^[\u4e00-\u9fa5]+$|^$/.test($(a).val());return b},a.zipcode=function(a){var b=/^[1-9]\d{5}$|^$/.test($(a).val());return b},a.ID=function(a){var b=/^[1-9]\d{16}(\d|X)$|^$/.test($(a).val());return b},a.IP=function(a){var b=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$|^$/.test($(a).val());return b},a.port=function(a){var b=$(a).val(),c=b>0&&65536>b;return c},a.equalTo=function(a){var b=$(a),c=$(b.attr("eqto")),d=b.val()===c.val();return d},a.date=function(a){var b=/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test($(a).val());return b},a}),define("tanshenghu/validate/1.0.0/validate.messages",[],function(){var a={};return a.phone="请输入正确的手机号码",a.tel="请输入正确的电话号码",a.QQ="请输入正确的QQ号码",a.Hanzi="只能输入中文汉字",a.zipcode="请输入正确的邮编",a.ID="请输入正确的身份证号码",a.IP="请输入正确的IP网段",a.port="请输入正确的端口号",a.equalTo="两次输入的内容不一致",a.date="请输入正确的日期格式",a});
