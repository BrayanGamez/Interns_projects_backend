const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const esAdminRole = require('../middlewares/validate-rol');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos}= require('../middlewares/validateFields');
const {controllerGet,controllerPost,controllerPut,controllerDelete} = require('../controllers/career');
const {EmptyFieldsCarees,isUrlValidate} = require('../helpers/validatorsFields');

router.get('/',controllerGet);

router.post('/',controllerPost);

router.put('/:id',[
    check('id','El id especificado no id de mongo').isMongoId()],validarCampos,controllerPut);

router.delete('/:id',[check('id','El id especificado no id de mongo').isMongoId()],validarCampos,controllerDelete);

module.exports = router;