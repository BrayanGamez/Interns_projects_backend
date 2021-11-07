const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {
    controllerPost,
    controllerGet,
     controllerPut,
    controllerDelete,
controllerStatusForm} = require('../controllers/reception');
const {validarCampos}= require('../middlewares/validateFields');
const {validarJWT} = require('../middlewares/validar-jwt');
const esAdminRole = require('../middlewares/validate-rol');
const {formatDate} = require('../helpers/validatorsFields');

router.get('/',controllerGet)

router.post('/',[
    validarJWT,
    esAdminRole,
    check('FechaInicial').custom(formatDate),
    check('FechaFinal').custom(formatDate),
    check('Descripcion').not().isEmpty(),
    validarCampos],controllerPost);

router.put('/',[validarJWT,esAdminRole,validarCampos],controllerPut);

router.delete('/',[validarJWT,esAdminRole,validarCampos],controllerDelete);

router.put('/:estado',[
    validarJWT,
    esAdminRole,
    validarCampos],
    controllerStatusForm);

module.exports = router;