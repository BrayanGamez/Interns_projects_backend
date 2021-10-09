const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const {validarCampos} = require('../middlewares/validateFields');
const {
    controllerGet,
    controllerPost,
    controllerPut,
    controllerDelete} = require('../controllers/university');

const {EmptyFieldsUniversities} = require('../helpers/validatorsFields');

router.get('/',controllerGet);

router.post('/',[...EmptyFieldsUniversities,validarCampos],controllerPost);

router.put('/:id',[
    ...EmptyFieldsUniversities,
    check('id','No es un id de mongo').isMongoId(),
],validarCampos,controllerPut);

router.delete('/:id',[
    check('id','No es un id de mongo').isMongoId()
]
,validarCampos,controllerDelete);

module.exports = router;