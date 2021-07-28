var express = require('express');
var router = express.Router();

/* GET users listing. */
const users = [
  { id: 1,
    email: "ec@utn.com",
    pass: 1234, },

  { id: 2,
    email: "eze@utn.com",
    pass: 1234,},
];

const listar = (req, res) => {
  res.render('users', {users});
}

const single = (req, res) => {
  const {id} = req.params;
  const usuario= users.find((users) => users.id == id);
  res.render('single', {usuario});
}
router.get('/', listar);
router.get('/single/:id', single)

module.exports = router;
