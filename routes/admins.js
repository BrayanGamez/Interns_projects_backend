const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {validarCampos}= require('../middlewares/validateFields');
const { route } = require('./scholars');
const esAdminRole = require('../middlewares/validate-rol');
const {validarJWT} = require('../middlewares/validar-jwt');
const {controllerGet,controllerPost,controllerPut,controllerDelete} = require('../controllers/admins');

router.get('/',[check('desde').isNumeric(),
check('limite').isNumeric()],validarCampos,controllerGet);

router.post('/',[validarJWT,
    esAdminRole,
check('usuario','campo usuario vacio').not().isEmpty(),
check('password','campo password vacio').not().isEmpty(),
check('nombre','campo nombre vacio').not().isEmpty(),
check('apellido','campo apellido vacio').not().isEmpty(),
check('correo','no es correo').isEmail(),
check('correo','30m es la longitud maxima').isLength({max:30}),
check('telefono','25 es la longitud maxima').isLength({max:25}),
],validarCampos,controllerPost);

router.put('/:id',[validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
    check('usuario','campo usuario vacio').not().isEmpty(),
    check('password','campo password vacio').not().isEmpty(),
    check('nombre','campo nombre vacio').not().isEmpty(),
    check('apellido','campo apellido vacio').not().isEmpty(),
    check('correo','no es correo').isEmail(),
    check('correo','30m es la longitud maxima').isLength({max:30}),
    check('telefono','25 es la longitud maxima').isLength({max:25}),
    ],validarCampos,controllerPut);

router.delete('/:id',[validarJWT,
    esAdminRole,check('id','No es un Id de mongo').isMongoId()],validarCampos,controllerDelete);

module.exports = router;
