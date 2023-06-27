const router = require("express").Router();
const LoginUser_ = require('../Controller/UserLogin');
const RegisterUser_ = require('../Controller/userRegister');

router.post('/login' , LoginUser_.post);
router.post('/register' , RegisterUser_.post);

module.exports = router;