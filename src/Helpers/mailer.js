const mailer = require("nodemailer");
const ejs = require('ejs');
const fs = require('fs');
// const generateOtp = require('../Helpers/generateOtp');


//Global data sets for mailer
const transporter = mailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.MAIL_USER,
        pass : process.env.MAIL_PASSWORD
    }
})



//Send greet message for the user email
async function WelcomeUser(to,data){
    const template = fs.readFileSync('C:/Users/Santhosh.M/Desktop/MVC_Structure/server/views/Welcome.ejs', 'utf8');
    const html = ejs.render(template , {name : data});
    var mailOptions = {
        from: 'abcd@gmail.com',//sender mail id
        to: to,
        subject: "Congrats you have been joined with our community",
        // text: text
        html : ejs.render(html)
      };

      var bool = true;
    try{
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        })
    }catch(error){
        console.log(error)
    }
    return bool
}

//send Otp for the user email
async function OTPMail(to,otp){
    const template = fs.readFileSync('C:/Users/Santhosh.M/Desktop/MVC_Structure/server/views/OTPtemplate.ejs', 'utf8');
    const html = ejs.render(template , {otpCode : otp});
    var mailOptions = {
        from: 'abcd@gmail.com',//sender mail id
        to: to,
        subject: "Your OTP for Login credentials is generated!!",
        // text: text
        html : ejs.render(html)
      };

      var bool = true;
    try{
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return({statusCode : 400})
            } else {
              console.log('Email sent: ' + info.response);
              return({statusCode : 200})
            }
        })
    }catch(error){
        console.log(error)
    }
    return bool
}

//send mail for the user for successful deletion
async function Deletedaccount(to,data){
  const template = fs.readFileSync('C:/Users/Santhosh.M/Desktop/MVC_Structure/server/views/Deletedaccount.ejs', 'utf8');
  const html = ejs.render(template , {data : data});
  var mailOptions = {
      from: 'abcd@gmail.com',//sender mail id
      to: to,
      subject: "Your account has been deleted successfully !!",
      // text: text
      html : ejs.render(html)
    };

    var bool = true;
  try{
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            return({statusCode : 400})
          } else {
            console.log('Email sent: ' + info.response);
            return({statusCode : 200})
          }
      })
  }catch(error){
      console.log(error)
  }
  return bool
}
module.exports = {WelcomeUser , OTPMail , Deletedaccount};