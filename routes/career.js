const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {validarCampos} = require('../middlewares/validateFields');
const esAdminRole = require('../middlewares/validate-rol');
const {validarJWT} = require('../middlewares/validar-jwt');
const {controllerGet,controllerPost,controllerPut,controllerDelete} = require('../controllers/career');
const {isUrlValidate} = require('../helpers/validatorsFields');

router.get('/',controllerGet);

router.post('/',[validarJWT,
    esAdminRole,validarCampos],controllerPost);

router.put('/:id',[validarJWT,
    esAdminRole,
    check('id','El id especificado no id de mongo').isMongoId()],validarCampos,controllerPut);

router.delete('/:id',[validarJWT,
    esAdminRole,check('id','El id especificado no id de mongo').isMongoId()],validarCampos,controllerDelete);

module.exports = router;