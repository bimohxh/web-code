const nodemailer = require('nodemailer')
const Config = require('../config')

module.exports = {
  send: (option) => {
    return new Promise(resolve => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.exmail.qq.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: Config.email.uid, // generated ethereal user
              pass: Config.email.pwd // generated ethereal password
          }
      })

      // setup email data with unicode symbols
      // let mailOptions = option 
      // {
      //     from: Config.email.uid, // sender address
      //     to: option.to, // list of receivers
      //     subject: option.subject, // Subject line
      //     text: 'Hello world?', // plain text body
      //     html: '<b>Hello world?</b>' // html body
      // }
      option.from = option.from || Config.email.uid

      // send mail with defined transport object
      transporter.sendMail(option, (error, info) => {
          if (error) {
            console.log(error)
            resolve(false)
            return
          }
          resolve(true)
          console.log('Message sent: %s', info.messageId)
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
      })
    })

  }
}
