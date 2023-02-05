const express = require('express')
const {login,createUser} = require('../controller/userHandler')

const user = express.Router();

user.post('/login',login);
user.post('/',createUser);

module.exports=user;