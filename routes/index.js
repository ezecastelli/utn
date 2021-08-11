var express = require('express');
var router = express.Router();


const login = (req, res) => res.render('./index.hbs');

router.get('/', login);
module.exports = router;
