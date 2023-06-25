const bcrypt = require('bcrypt');
const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

//function to hash a user password
let hash = (password) => {
    return bcrypt.hashSync(password,parseInt(saltRounds));
}

//function to compare the hashed password and plain text password
let Comparehash = async (password,hashedpassword) => {
    let isPass = await bcrypt.compare(password,hashedpassword)
    return isPass
}

module.exports = {
    hash,
    Comparehash
}