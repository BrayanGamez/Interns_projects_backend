const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {
controllerPost,
controllerPut,
controllerDelete,
controllerGet,
controllerGetId} = require('../controllers/scholars');
const {EmptyFieldsScholars,ageRange,userExist} = require('../helpers/validatorsFields')
const {validarCampos}= require('../middlewares/validateFields');
const esAdminRole = require('../middlewares/validate-rol');
const {validarJWT} = require('../middlewares/validar-jwt');
//Obtener lista de estudiantes
router.get('/',[
    check('desde').isNumeric(),
    check('limite').isNumeric()
],validarCampos,controllerGet)

router.get('/log',[validarJWT,validarCampos],controllerGetId)

router.post('/',
[
...EmptyFieldsScholars,validarJWT,
esAdminRole,
check('edad').custom(ageRange)
],validarCampos,controllerPost)

router.get('/:id',[],);

router.put('/:id',[
    validarJWT,
esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(userExist)
],validarCampos,controllerPut)

router.delete('/:id',[
    validarJWT,
esAdminRole,
    check('id','No es id de mongo').isMongoId(),
    check('id').custom(userExist)
],validarCampos,controllerDelete)

module.exports = router;