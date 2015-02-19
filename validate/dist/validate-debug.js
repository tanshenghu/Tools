define("tanshenghu/validate/1.0.0/validate-debug", [ "$-debug", "./validate.extend-debug", "./validate.messages-debug" ], function(require, exports, module) {
    var jQuery = require("$-debug"), $ = jQuery, validate = {
        // 验证 初始化，最终返回布尔值 true/false
        init: function(form) {
            this.form = $(form);
            this.rules.This = this.form;
            this.blur();
            return this.verify() && this.form.find(".formTip").length === 0;
        },
        // 在表单下面捕获所有需要验证的节点元素
        getele: function() {
            return this.form.find("[data-needverify]");
        },
        // 遍历所有需要验证的节点元素，并逐个去验证
        verify: function() {
            var This = this, eles = this.getele(), result = true;
            eles.each(function(i, ele) {
                result = This.getrules(ele);
            });
            return result;
        },
        // 查找需要验证节点元素上面所有验证规则种类，即 必填|地址
        getrules: function(ele) {
            var need = $(ele).data("needverify"), result = true;
            if (need) {
                var arr = need.split(",");
                for (var i = 0, l = arr.length; i < l; i++) {
                    // 第一个参数是规则，当前验证节点，当前验证到N个规则
                    result = this.exeRules({
                        rls: arr[i],
                        ele: ele,
                        curRules: i
                    });
                    if (result === false) {
                        break;
                    }
                }
            }
            return result;
        },
        // 调用 验证规则方法
        exeRules: function(param) {
            var rls = param.rls, ele = param.ele, curRules = param.curRules;
            if (typeof this.rules[rls] === "function") {
                var result = this.rules[rls].apply(window, [ ele ]);
                // 把验证结果 抛给showmsg方法去处理,  下次抽时间把msg这块的信息尽量配置在js中
                this.showmsg({
                    result: result,
                    ele: ele,
                    curRules: curRules,
                    rls: rls
                });
                return result;
            } else {
                window.console && console.log(rls + " erroneous rules");
            }
        },
        // 校验 规则 只列部分。为减小文件体积将规则写进扩展文件里面
        rules: {
            required: function(ele) {
                var ele = $(ele), type = ele.attr("type").toLowerCase(), This = this.This, lenVal;
                if (type === "radio" || type === "checkbox") {
                    var name = ele.attr("name");
                    var checked = This.form.find('[name="' + name + '"]:checked');
                    lenVal = checked.length === 0 ? false : true;
                } else {
                    lenVal = ele.val().trim().length === 0 ? false : true;
                }
                return lenVal;
            },
            email: function(ele) {
                var result = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test($(ele).val());
                return result;
            },
            url: function(ele) {
                var result = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/.test($(ele).val());
                return result;
            },
            number: function(ele) {
                var result = !isNaN($(ele).val());
                return result;
            }
        },
        // 校验提示信息 这块代码是后来添加的，如果标签上没有配置data-verifymsg，这里就会起效
        verifymsg: {
            required: "必填",
            email: "邮箱格式错误",
            url: "url格式错误",
            number: "请输入数字类型"
        },
        // 验证结果处理 显示错误信息/移除错误节点标签
        showmsg: function(param) {
            var result = param.result, ele = $(param.ele), curRules = param.curRules, rls = param.rls;
            var fbox = ele.closest("td,.formfield"), messages = ele.data("verifymsg") ? ele.data("verifymsg").split("|") : [];
            var msgTip = messages[curRules] || this.verifymsg[rls] || "错误";
            if (result === false) {
                if (fbox.find(".formTip").length) {
                    fbox.find(".formTip").first().html(msgTip).attr("inputname", ele.attr("name"));
                } else {
                    fbox.append($('<p class="formTip">' + msgTip + "</p>").attr("inputname", ele.attr("name")));
                }
            } else {
                if (fbox.find(".formTip").attr("inputname") == ele.attr("name")) {
                    fbox.find(".formTip").remove();
                }
            }
        },
        // 这里是属性值，给需要验证的节点添加blur事件。这里的属性是防止事件重复绑定
        blurIdx: 0,
        blur: function() {
            var This = this;
            if (this.blurIdx < 1) {
                var This = this, eles = this.getele();
                eles.each(function() {
                    var thisObj = $(this), iname = thisObj.prop("nodeName").toLowerCase(), o = {
                        text: "blur",
                        textarea: "blur",
                        select: "select",
                        checkbox: "change",
                        radio: "change"
                    }, cur;
                    if (iname === "input") {
                        cur = thisObj.attr("type");
                    } else {
                        cur = iname;
                    }
                    // 失焦事件
                    $("body").on(o[cur], This.form.selector + " [data-needverify]", function() {
                        This.getrules(this);
                    });
                });
            }
            this.blurIdx++;
        }
    };
    var rules = require("./validate.extend-debug"), verifymsg = require("./validate.messages-debug");
    validate.rules = $.extend(validate.rules, rules);
    validate.verifymsg = $.extend(validate.verifymsg, verifymsg);
    module.exports = validate;
});

define("tanshenghu/validate/1.0.0/validate.extend-debug", [], function(require, exports, module) {
    var validate_rules = {};
    // 小数
    validate_rules.decimals = function(ele) {
        var result = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(ele).val());
        return result;
    };
    // 手机号码
    validate_rules.phone = function(ele) {
        var result = /^1[3578][0-9]{9}$|^$/.test($(ele).val());
        return result;
    };
    // 电话/传真
    validate_rules.tel = function(ele) {
        var result = /^(0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$|^$/.test($(ele).val());
        return result;
    };
    // QQ号码
    validate_rules.QQ = function(ele) {
        var result = /^[1-9]\d{5,10}$|^$/.test($(ele).val());
        return result;
    };
    // 中文汉字
    validate_rules.Hanzi = function(ele) {
        var result = /^[\u4e00-\u9fa5]+$|^$/.test($(ele).val());
        return result;
    };
    // 邮编
    validate_rules.zipcode = function(ele) {
        var result = /^[1-9]\d{5}$|^$/.test($(ele).val());
        return result;
    };
    // 身份证
    validate_rules.ID = function(ele) {
        var result = /^[1-9]\d{16}(\d|X)$|^$/.test($(ele).val());
        return result;
    };
    // ip
    validate_rules.IP = function(ele) {
        var result = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$|^$/.test($(ele).val());
        return result;
    };
    // 端口号
    validate_rules.port = function(ele) {
        var value = $(ele).val();
        var result = value > 0 && value < 65536;
        return result;
    };
    // 比较两个文本域的内容是否一致
    validate_rules.equalTo = function(ele) {
        var thisObj = $(ele), eqto = $(thisObj.attr("eqto"));
        var result = thisObj.val() === eqto.val();
        return result;
    };
    // 日历类型 yyyy-mm-dd
    validate_rules.date = function(ele) {
        var result = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test($(ele).val());
        return result;
    };
    return validate_rules;
});

define("tanshenghu/validate/1.0.0/validate.messages-debug", [], function(require, exports, module) {
    var verifymsg = {};
    verifymsg.phone = "请输入正确的手机号码";
    verifymsg.tel = "请输入正确的电话号码";
    verifymsg.QQ = "请输入正确的QQ号码";
    verifymsg.Hanzi = "只能输入中文汉字";
    verifymsg.zipcode = "请输入正确的邮编";
    verifymsg.ID = "请输入正确的身份证号码";
    verifymsg.IP = "请输入正确的IP网段";
    verifymsg.port = "请输入正确的端口号";
    verifymsg.equalTo = "两次输入的内容不一致";
    verifymsg.date = "请输入正确的日期格式";
    return verifymsg;
});
