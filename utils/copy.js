const fs=require('fs')
const log = require("./chalk");


let fileCount = 0  /* 文件数量 */
let dirCount = 0   /* 文件夹数量 */
let flat = 0       /* readir数量 */
/**
 * 
 * @param {*} sourcePath   //template资源路径
 * @param {*} currentPath  //当前项目路径
 * @param {*} cb           //项目复制完成回调函数 
 */
function copy (sourcePath,currentPath,cb){
    flat++
    /* 读取文件夹下面的文件 */
    fs.readdir(sourcePath,(err,paths)=>{
        flat--
        if(err){
            throw err
        }
        paths.forEach(path=>{
            if(path !== '.git' && path !=='package.json' ) fileCount++
            const  newSoucePath = sourcePath + '/' + path
            const  newCurrentPath = currentPath + '/' + path
            /* 判断文件信息 */
            fs.stat(newSoucePath,(err,stat)=>{
                if(err){
                    throw err
                }
                /* 判断是文件，且不是 package.json  */
                if(stat.isFile() && path !=='package.json' ){
                    /* 创建读写流 */
                    const readSteam = fs.createReadStream(newSoucePath)
                    const writeSteam = fs.createWriteStream(newCurrentPath)
                    readSteam.pipe(writeSteam)
                    log.green( '创建文件：'+ newCurrentPath  )
                    fileCount--
                    completeControl(cb)
                /* 判断是文件夹，对文件夹单独进行 dirExist 操作 */    
                }else if(stat.isDirectory()){
                    if(path!=='.git' && path !=='package.json' ){
                        dirCount++
                        dirExist( newSoucePath , newCurrentPath ,copy,cb)
                    }
                }
            })
        })
    })
}

/**
 * 
 * @param {*} sourcePath  //template资源路径
 * @param {*} currentPath  //当前项目路径
 * @param {*} copyCallback  // 上面的 copy 函数
 * @param {*} cb    //项目复制完成回调函数 
 */
function dirExist(sourcePath,currentPath,copyCallback,cb){
    fs.exists(currentPath,(ext=>{
        if(ext){
            /* 递归调用copy函数 */
            copyCallback( sourcePath , currentPath,cb)
        }else {
            fs.mkdir(currentPath,()=>{
                fileCount--
                dirCount--
                copyCallback( sourcePath , currentPath,cb)
                log.yellow('创建文件夹：'+ currentPath )
                completeControl(cb)
            })
        }
    }))
}


function completeControl(cb){
    /* 三变量均为0，异步I/O执行完毕。*/
    if(fileCount === 0 && dirCount ===0 && flat===0){
        log.green('------构建完成-------')
        if(cb && !isInstall ){
            isInstall = true
            log.blue('-----开始install-----')
            cb(()=>{
                log.blue('-----完成install-----')
                /* 判断是否存在webpack  */
                runProject()
            })
        }
    }
}

module.exports=copy