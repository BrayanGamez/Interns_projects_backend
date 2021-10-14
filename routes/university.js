const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const esAdminRole = require('../middlewares/validate-rol');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validateFields');
const {
    controllerGet,
    controllerPost,
    controllerPut,
    controllerDelete} = require('../controllers/university');

const {EmptyFieldsUniversities,universityExist} = require('../helpers/validatorsFields');

router.get('/',controllerGet);

router.post('/',[validarJWT,
    esAdminRole,...EmptyFieldsUniversities,validarCampos],controllerPost);

router.put('/:id',[validarJWT,
    esAdminRole,
    ...EmptyFieldsUniversities,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(universityExist)
],validarCampos,controllerPut);

router.delete('/:id',[validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(universityExist)
]
,validarCampos,controllerDelete);

module.exports = router;