//Module for OTP generations
function generateOTP(length) {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  
    return otp;
  }
  
  // Usage
//   const otp = generateOTP(6);
//   console.log('Generated OTP:', otp);

module.exports = generateOTP;