define("tanshenghu/formFill/1.0.0/formFill-debug", [ "$-debug" ], function(require, exports, module) {
    var jQuery = require("$-debug"), $ = jQuery;
    var formFill = {
        init: function(o) {
            this.url = o.url;
            this.param = o.param;
            this.form = $(o.form);
            this.cite = o.cite || "content";
            this.callback = o.callback;
            this.getData();
        },
        getData: function() {
            var This = this, O = $.extend({
                rnd: new Date().getTime()
            }, this.param), cite = "data." + this.cite;
            $.getJSON(this.url, O, function(data) {
                This.fillVal(eval(cite));
            });
        },
        fillVal: function(data) {
            var elesort = function(obj) {
                var tagname = obj.prop("nodeName").toLowerCase(), type = obj.attr("type"), result;
                if (tagname === "input") {
                    result = type;
                } else {
                    result = tagname;
                }
                return result;
            }, iscomplete = true;
            for (var i in data) {
                var dataval = data[i], ele = this.form.find('[name="' + i + '"]');
                if (typeof dataval === "string") {
                    switch (elesort(ele)) {
                      case "text":
                        ele.val(dataval);
                        break;

                      case "textarea":
                        ele.val(dataval);
                        break;

                      case "checkbox":
                        ele.val(dataval);
                        break;

                      case "radio":
                        ele.not('[value!="' + dataval + '"]').prop("checked", true);
                        break;

                      case "select":
                        var option = ele.find('[value="' + dataval + '"]').length ? ele.find('[value="' + dataval + '"]') : ele.find(":contains(" + dataval + ")");
                        option.prop("selected", true);
                        break;

                      default:
                        ele.val(dataval);
                        break;
                    }
                } else if (dataval instanceof Array && typeof dataval[0] === "object") {
                    // 到这一步，考虑到表格列表行数据，第一个td或许有checkbox最后一个td或许有操作等不定的因素。所以这块目前考虑回调，自己定义方法处理
                    //for(var j=0,l=iarr.length; j<l; j++){...}
                    // 不知道模板格式样子，在此处留了一个后台勾子，开发自定义去写吧，注意fillter返回标签代码string类型
                    var trs = typeof this.filltr === "function" ? this.filltr(dataval) : "";
                    ele.find("tbody").first().html(trs);
                } else {
                    iscomplete = false;
                    if (console && console.log) {
                        console.log("error: json layout!");
                    }
                    return false;
                }
            }
            typeof this.callback === "function" && iscomplete && this.callback.apply(this.form);
        }
    };
    module.exports = formFill;
});
