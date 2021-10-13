const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {
controllerPost,
controllerPut,
controllerDelete,
controllerGet} = require('../controllers/scholars');
const {EmptyFieldsScholars,ageRange,userExist} = require('../helpers/validatorsFields')
const {validarCampos}= require('../middlewares/validateFields');
const esAdminRole = require('../middlewares/validate-rol');
const {validarJWT} = require('../middlewares/validar-jwt');

router.get('/',[
    check('desde').isNumeric(),
    check('limite').isNumeric()
],validarCampos,controllerGet)

router.post('/',
[
...EmptyFieldsScholars,validarJWT,
esAdminRole,
check('edad').custom(ageRange)
],validarCampos,controllerPost)

router.put('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(userExist)
],validarCampos,controllerPut)

router.delete('/:id',[
    check('id','No es id de mongo').isMongoId(),
    check('id').custom(userExist)
],validarCampos,controllerDelete)

module.exports = router;