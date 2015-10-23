var express = require('express'); //导入express模块
var handle = require('./handle'); //导入handle模块

var app = express(); //创建web服务器
app.use(express.static(__dirname + '\\public')); //指定静态目录（前端代码所在目录）
app.use(express.bodyParser()); //设置解析前端传来的参数

app.post('/upload', function(req, res){ //将前端请求路由到处理函数上
	var codeStr = req.body.code; //获取到前端输入的JAVA代码
	var result = handle(codeStr); //处理代码，并得到结果result
	res.end(JSON.stringify({ //将JSON格式对象转换（序列化）为JSON字符串，并返回给前端
		result: result
	}));
});

app.listen(80); //侦听80端口，完成服务器启动