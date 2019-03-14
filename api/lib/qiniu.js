var qiniu = require('qiniu')
const Config = require('../config')

// 要上传的空间
let bucket = 'qingxin'

// 需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = Config.qiniu.access_key
qiniu.conf.SECRET_KEY = Config.qiniu.secret_key

var accessKey = Config.qiniu.access_key
var secretKey = Config.qiniu.secret_key
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
var options = {
  scope: bucket
}

let qn = {
  // 构建上传策略函数
  uptoken: (filename) => {
    var putPolicy = new qiniu.rs.PutPolicy(options)
    return putPolicy.uploadToken(mac)
  },
  // 普通上传
  upload: (file, filename) => {
    return new Promise(resolve => {
      var formUploader = new qiniu.form_up.FormUploader({})
      var extra = new qiniu.form_up.PutExtra()
      let uptoken = qn.uptoken(filename)
      // var extra = new qiniu.io.PutExtra()
      formUploader.putStream(uptoken, filename, file, extra, (respErr, respBody, respInfo) => {
        if (respInfo.statusCode === 200) {
          console.log(respBody)
        } else {
          console.log(respInfo.statusCode)
          console.log(respBody)
        }
        resolve()
      })
    })
  }
}

module.exports = qn
