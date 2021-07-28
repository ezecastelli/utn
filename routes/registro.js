const express = require('express');
const router = express.Router();
const model = require('./../models/users');
const sha1 = require('sha1');
const {v4: uuid} = require('uuid');
const { send } = require('./services/mail');




const register = (req, res) => {
    res.render('registro');
}
const crearUsuario = async (req, res) => {
    const usuario = req.body;
    console.log(usuario);
    const uid = uuid();
    console.log(uid);
    const usuarioFinal = { 
        username: usuario.username,
        pass: sha1(usuario.pass),
        mail: usuario.mail,
        confirmacionCorreo: uid,
    }
    console.log(usuarioFinal);
    const registrados = await model.crearUsuario(usuarioFinal);
    send({mail: usuarioFinal.mail, 
        cuerpo:
        `<h1> Bienvenido ${usuarioFinal.username}</h1>
            <a href="${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.confirmacionCorreo}">Link magico</a>`,
            });
        res.redirect("/");
    };


    const verify = async (req, res) => {
        const {uid} = req.params;
        console.log(uid);
        const messageId = await model.verify(uid);
        res.redirect("/");
    }

router.get('/', register);
router.post('/create', crearUsuario);
router.get('/verify/:uid', verify)
module.exports = router;