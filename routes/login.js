const express = require('express');
const router = express.Router();
const {enter} = require('./../models/users');
const sha1 = require('sha1');

const login = (req, res) => res.render('login');

const entrar = async (req, res) => {
let {username, pass} = req.body;
pass = sha1(pass);
const logged = await enter(username, pass);
logged.length === 0
? res.redirect('/login')
: null;
res.redirect('/admin');
}


router.get('/', login);
router.post('/', entrar)
module.exports = router;