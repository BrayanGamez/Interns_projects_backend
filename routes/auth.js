
const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const controllerPost = require('../controllers/auth.js');
const {validarCampos} = require('../middlewares/validateFields')


router.post('/login',[check('correo','El correo es obligatorio').isEmail(),
check('password','Campo password esta vacio').not().isEmpty()],validarCampos,controllerPost);
