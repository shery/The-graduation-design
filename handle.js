var fs = require('fs');

var content = '';

//数组去重方法
Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
	  if(u.hasOwnProperty(this[i])) {
		 continue;
	  }
	  a.push(this[i]);
	  u[this[i]] = 1;
   }
   return a;
};

//基本的工具方法
var Util = {};

Util.getObjType = function(objStr) { //获得对象类型
	var ruleStr = '/(\\n| ).*(?=(\\n| ){1,}' + objStr + ')/g';
	var rule = eval(ruleStr);
	var result = content.match(rule);
	return result;
};

Util.getAllVariable = function() { //获得代码中所有单词
	var rule = /\w*/g; //匹配文本中的所有单词
	var result = content.match(rule);
	result = result.filter(function(value) { //过滤方法，过滤掉所有空字符串
		return value
	});
	return result;
};

Util.getTypeObj = function(typeStr) { //得到所有Connection变量
	var resultAry = [];
	var varAry = Util.getAllVariable();
	for(var i = 0; i < varAry.length; i++) { //遍历每一个单词
		var varStr = varAry[i];
		var type = Util.getObjType(varStr); //得到该单词的类型
		if(type) {
			type = type[0]; //处理格式，得到真正的类型值
			type = type.trim();
			if(type == typeStr) { //如果给对象为Connection类型
				resultAry.push(varStr);
			}
		}
	}
	return resultAry.getUnique();
};

Util.getAllLine = function() {
	var resultAry = content.split('\n');
	return resultAry;
};

//规则判断方法
var Rule = {};

//######## rule1
//Connection coon;
//PreparedStatement stmt = coon.prepareStatement(sqlString);
Rule.checkCorrectConnection = function() {
	var lineAry = Util.getAllLine(); //获得代码中的每一行到数组
	for(var i = 0; i < lineAry.length; i++) { //遍历每一行代码
		var lineStr = lineAry[i];
		var objAry = Util.getTypeObj('Connection'); //获得所有Connection类型的对象
		if(objAry.length){
			var varStr = objAry[0];
			if(lineStr.indexOf(varStr + '.createStatement') != -1){ //查找字符串是否存在
				return {
					line: (i + 1),
					info: '建议使用' + varStr + '.prepareStatement函数'
				};
			}
		}
	}
	return null;
};

//处理代码
exports = module.exports = function(codeStr){ //导出该函数
	content = codeStr;

	var result = Rule.checkCorrectConnection(); //检查规则（核心）

	if(result){
		var resultStr = '第' + result.line + '行: ' + result.info;
		return resultStr;
	}else{
		return '代码检查完毕，验证通过';
	}
};