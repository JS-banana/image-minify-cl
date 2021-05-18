import imagemin from "./lib/imagemin.js"
// const imagemin = require("./lib/imagemin")
import imageminJpegtran from "imagemin-jpegtran"
import imageminPngquant from "imagemin-pngquant"
// import imageminWebp from "imagemin-webp"
// import imageminSvgo from "imagemin-svgo"

const start = async () => {
  const start = Date.now()
  const files = await imagemin(["./assets/**/*.{jpg,JPG,jpeg,JPEG,png}"], {
    destination: "./zip/",
    plugins: [
      imageminJpegtran({
        progressive: true, // 开启无损压缩
        arithmetic: true, // 开启算法
      }),
      imageminPngquant({
        // speed: 10,
        quality: [0.3, 0.5], // 压缩质量
      }),
    ],
  })
  const end = Date.now()

  console.log(`time：${end - start} ms`)
  //   console.log("files", files)
}

start()
