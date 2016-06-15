// 引入fs文件处理模块
var fs = require("fs");
var src = 'icons';

loopFile(src);

//循环遍历文件
function loopFile(dir){
    //缓存函数名
    var funName = arguments.callee;
    fs.readdir(dir, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }
        // files是名称数组
        files.forEach(function(filename) {
            var oldPath = dir + '/' + filename,
                newPath = dir + '/' + filename.replace(/-/g, '_');
            fs.stat(oldPath,function(err1, stats){
                if (err1) {
                    console.log('stat error');
                    return;
                }else if(stats.isDirectory()){
                    funName(oldPath);
                }else{
                    rename(oldPath,newPath,filename);
                }
            })
        });
    })
}

//重命名
function rename(oldPath,newPath,filename){
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        // 回调方法可以输出重命名成功的信息
        console.log(filename + '下划线替换成功!');
    })
}