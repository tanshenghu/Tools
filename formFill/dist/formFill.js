define("tanshenghu/formFill/1.0.0/formFill",["$"],function(a,b,c){var d=jQuery=a("$"),e={init:function(a){this.url=a.url,this.param=a.param,this.form=d(a.form),this.callback=a.callback,this.getData()},getData:function(){var a=this;d.getJSON(this.url,this.param,function(b){a.fillVal(b.content)})},fillVal:function(a){var b=function(a){var b,c=a.prop("nodeName").toLowerCase(),d=a.attr("type");return b="input"===c?d:c};for(var c in a){var d=a[c],e=this.form.find('[name="'+c+'"]');if("string"==typeof D)switch(b(e)){case"text":e.val(d);break;case"textarea":e.val(d);break;case"checkbox":e.val(d);break;case"radio":e.not('[value!="'+d+'"]').prop("checked",!0);break;case"select":var f=e.find('[value="'+d+'"]').length?e.find('[value="'+d+'"]'):e.find(":contains("+d+")");f.prop("selected",!0);break;default:e.val(d)}else if(d instanceof Array&&"object"==typeof d[0]){var g="function"==typeof this.filltr?this.filltr(d):"";e.find("tbody").first().html(g)}}"function"==typeof this.callback&&this.callback.apply(this.form)}};c.exports=e});
