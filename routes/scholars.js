const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {controllerPost,
controllerPut,controllerDelete} = require('../controllers/scholars');
const {EmptyFieldsScholars,ageRange,userExist} = require('../helpers/validatorsFields')
const {validarCampos}= require('../middlewares/validateFields');

router.post('/',
[
...EmptyFieldsScholars,
check('edad').custom(ageRange)
],validarCampos,controllerPost)

router.put('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(userExist)
],validarCampos,controllerPut)

router.delete('/:id',[
    check('id','No es id de mongo').isMongoId()
],validarCampos,controllerDelete)

module.exports = router;