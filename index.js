var http = require('http');

var router = require('./module/router');

http.createServer(function (req, res) {

 router.statics(req,res,'./static');

}).listen(8081);