const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {validarCampos}= require('../middlewares/validateFields');
const {controllerGet,controllerPost,controllerPut,controllerDelete} = require('../controllers/career');
const {EmptyFieldsCarees,isUrlValidate} = require('../helpers/validatorsFields');

router.get('/',controllerGet);

router.post('/',[...EmptyFieldsCarees,
    check('pensum').custom(isUrlValidate)],validarCampos,controllerPost);

router.put('/:id',[...EmptyFieldsCarees,
    check('id','El id especificado no id de mongo').isMongoId()],validarCampos,controllerDelete);

router.delete('/:id',[check('id','El id especificado no id de mongo').isMongoId()],validarCampos,controllerDelete);

module.exports = router;