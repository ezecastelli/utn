const express = require('express');
const router = express.Router();
const model = require('./../models/users');
const sha1 = require('sha1');
const {v4: uuid} = require('uuid');
const { send } = require('./services/mail');
const {validateRegistro} = require('./../middleware/usuarios');




const register = (req, res) => {
    res.render('registro');
}
const crearUsuario = async (req, res) => {
    const usuario = req.body;
    let duplicado = false;
    console.log(usuario);
    const uid = uuid();
    console.log(uid);
    const usuarioFinal = { 
        username: usuario.username,
        pass: sha1(usuario.pass),
        mail: usuario.mail,
        confirmacionCorreo: uid,
    }
    const usuariosExistentes = await model.all();
    usuariosExistentes.forEach(usuario => {
        if (usuario.username == usuarioFinal.username || usuario.mail == usuarioFinal.mail) duplicado = true;
    })
    if (!duplicado) {
        const agregado = await model.crearUsuario(usuarioFinal);
        console.log(agregado);
        send({
            mail : usuarioFinal.mail, 
            cuerpo:
            `<h1> Bienvenido ${usuarioFinal.username}</h1>
            <a href="${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.confirmacionCorreo}">Link magico</a>`,
            });
        res.redirect('/login');
    }
    else {
        res.render('registro', {message : "el nombre de usuario y/o mail ingresado ya extisten"})
    }
}


    const verify = async (req, res) => {
        const {uid} = req.params;
        console.log(uid);
        const messageId = await model.verify(uid);
        res.redirect("/");
    }

router.get('/', register);
router.post('/', validateRegistro, crearUsuario);
router.get('/verify/:uid', verify)
module.exports = router;