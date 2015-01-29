define("tanshenghu/formRequest/1.0.0/formRequest-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = jQuery = require("$-debug");
    var formRequest = function(param) {
        if (!(param instanceof Object)) {
            return "parameter " + param + " error";
        }
        var form = checkJqObject(param.form), selectEle = param.selector ? checkJqObject(param.selector) : false, way = "way" in param ? param.way : true;
        var selector = null, resultParam = {};
        function checkJqObject(obj) {
            var newObj = obj;
            if (!(obj instanceof jQuery)) {
                newObj = $(newObj);
            }
            return newObj;
        }
        var FormatHtml = function(val) {
            return $("<div/>").text(val).html();
        };
        var Encode = function(value) {
            if (param.Encode) {
                value = param.Encode(value);
            }
            return value;
        };
        if (selectEle && way) {
            selector = form.find(selectEle);
        } else if (selectEle && !way) {
            selector = form.find("input[name],textarea[name]").not(selectEle);
        } else {
            selector = form.find("input[name],textarea[name],select[name]");
        }
        selector.each(function(eid, ele) {
            var thisObj = $(ele), iName = thisObj.attr("name"), type = thisObj.attr("type") && thisObj.attr("type").toLowerCase();
            if (iName && type && type === "radio") {
                if (thisObj.prop("checked")) {
                    resultParam[iName] = FormatHtml(Encode(thisObj.val()));
                }
            } else if (iName && type && type === "checkbox") {
                if (thisObj.prop("checked")) {
                    if (resultParam[iName]) {
                        resultParam[iName].push(FormatHtml(Encode(thisObj.val())));
                    } else {
                        var itemArr = [ FormatHtml(Encode(thisObj.val())) ];
                        resultParam[iName] = itemArr;
                    }
                }
            } else if (iName) {
                resultParam[iName] = FormatHtml(Encode(thisObj.val()));
            }
        });
        if (param.split) {
            for (var i in resultParam) {
                if (resultParam[i] instanceof Array) {
                    resultParam[i] = resultParam[i].join(param.split);
                }
            }
        }
        return resultParam;
    };
    formRequest.getCheckboxVal = function(form, checkName) {
        var resultObj = {}, getVal = [], decoll = arguments[2];
        form = $(form);
        form.find('[name="' + checkName + '"]').each(function(i, ele) {
            var thisObj = $(ele), type = thisObj.attr("type") && thisObj.attr("type").toLowerCase();
            if (type && (type === "radio" || type === "checkbox")) {
                if (thisObj.prop("checked")) {
                    getVal.push($(ele).val());
                }
            } else {
                if (thisObj.val()) {
                    getVal.push($(ele).val());
                }
            }
        });
        if (decoll) {
            resultObj[checkName] = getVal.join(decoll);
        } else {
            resultObj[checkName] = getVal;
        }
        return resultObj;
    };
    formRequest.getLineVals = function(trs) {
        trs = $(trs);
        var result = [];
        trs.each(function() {
            var iObj = {};
            $(this).find("[name]").each(function(i, ele) {
                var elent = $(ele), nodeName = elent.prop("nodeName").toLowerCase();
                if (nodeName == "input" || nodeName == "textarea" || nodeName == "select") {
                    iObj[elent.attr("name")] = elent.val();
                } else {
                    iObj[elent.attr("name")] = elent.text();
                }
            });
            result.push(iObj);
        });
        return result;
    };
    exports.formRequest = formRequest;
});
