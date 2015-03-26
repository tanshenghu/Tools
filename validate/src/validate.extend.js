define(function(require, exports, module){
	
	var validate_rules = {};
	
	// 小数
	validate_rules.decimals = function( ele ){
		var result = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test( $(ele).val() );
		return result;
	};
	// 手机号码
	validate_rules.phone = function( ele ){
		var result = /^1[3578][0-9]{9}$|^$/.test( $(ele).val() );
		return result;
	};
	// 电话/传真
	validate_rules.tel = function( ele ){
		var result = /^(0\d{2,3}-)?[1-9]\d{6,7}(-\d{1,4})?$|^$/.test( $(ele).val() );
		return result;
	};
	// QQ号码
	validate_rules.QQ = function( ele ){
		var result = /^[1-9]\d{5,10}$|^$/.test( $(ele).val() );
		return result;
	};
	// 中文汉字
	validate_rules.Hanzi = function( ele ){
		var result = /^[\u4e00-\u9fa5]+$|^$/.test( $(ele).val() );
		return result;
	};
	// 邮编
	validate_rules.zipcode = function( ele ){
		var result = /^[1-9]\d{5}$|^$/.test( $(ele).val() );
		return result;
	};
	// 身份证
	validate_rules.ID = function( ele ){
		var result = /^[1-9]\d{16}(\d|X)$|^$/.test( $(ele).val() );
		return result;
	};
	// ip
	validate_rules.IP = function( ele ){
		var result = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$|^$/.test( $(ele).val() );
		return result;
	};
	// 端口号
	validate_rules.port = function( ele ){
		var value = $(ele).val();
		var result = (value>0 && value<65536);
		return result;
	};
	// 比较两个文本域的内容是否一致
	validate_rules.equalTo = function( ele ){
		var thisObj = $(ele), eqto = $( thisObj.attr('eqto') );
		var result = thisObj.val()===eqto.val();
		return result;
	};
	// 日历类型 yyyy-mm-dd
	validate_rules.date = function( ele ){
		var result = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test( $(ele).val() );
		return result;
	};

	return validate_rules;

});