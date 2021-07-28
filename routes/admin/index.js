const express = require('express');
const router = express.Router();

const index = (req, res) => {
    res.render('adminIndex');
}

router.get('/', index)
module.exports = router;