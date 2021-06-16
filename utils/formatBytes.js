// Javascript中将字节大小转换为的KB、MB、GB
module.exports = function formatBytes(a, b) {
  if (0 == a) return "0 Bytes"
  var c = 1024,
    d = b || 2,
    e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    f = Math.floor(Math.log(a) / Math.log(c))
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}
