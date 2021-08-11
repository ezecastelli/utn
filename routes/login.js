const express = require('express');
const router = express.Router();
const {enter} = require('./../models/users');
const sha1 = require('sha1');
const {validateLogin} = require('./../middleware/usuarios');

const login = (req, res) => res.render('login');

const entrar = async (req, res) => {
    let {username, pass} = req.body;
    pass = sha1(pass);
    const logged = await enter(username, pass);
    if (logged.length === 0) {
        res.render('login', {message: 'Usuario o pass incorrectos'});
    }
    else {
        const [{id, admin}] = logged;
        req.session.user = id;
        req.session.admin = admin;
        res.redirect('/admin');

    }
}


router.get('/', login);
router.post('/', validateLogin, entrar)
module.exports = router;