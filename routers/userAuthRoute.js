const express=require('express');
const { signup, login, logout } = require('../controllers/userAuthController');

const userAuthRoute=express.Router();

userAuthRoute.post("/signup",signup);
userAuthRoute.post("/login",login);
userAuthRoute.post("/logout",logout);



module.exports = userAuthRoute;