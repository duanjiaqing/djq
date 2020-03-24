
const fs = require('fs');  //引入文件模块

const url = require('url');  //引入url模块

const path = require('path');//path模块

   function getMime(extname,callback) {
       
var data = fs.readFileSync('./content.json');
// 转换成字符串，再通过json.parse把json字符串转换为对象
var Mimes = JSON.parse(data.toString());

var result = Mimes[extname] || 'text/html';
callback(result);
   }
 
exports.statics = (req,res,staticpath) =>{

  var pathname = url.parse(req.url).pathname;   //格式化服务器请求的文件的url

  if(pathname == '/'){
      pathname = './index.html'; //默认加载的首页
  }


//   获取文件后缀名
//   获取文件类型

var extname = path.extname(pathname); //获取文件后缀名

  if(pathname != '/favicon.ico'){  //过滤请求favicon.ico

    fs.readFile(staticpath+'/'+pathname,(err,data) => {   //这里是读取文件
        if(err){
            console.log('404');  //没有这个
            fs.readFile(staticpath+'/404.html',(err,data) => {  //找到文件
                if(err){
                    console.log(err);
                    return;
                }else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});   //请求头
                    res.write(data);
                    res.end();
                }
            })
        }else{
        getMime(extname,(mime) => {
            res.writeHead(200, {'Content-Type': "" + mime + ";charset='utf-8'"});
            res.write(data);
            res.end();
        })
        }
    })
    
  }
}
