const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const esAdminRole = require('../middlewares/validate-rol');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validateFields');
const {assignatureExist,assignatureExistPost} = require('../helpers/validatorsFields');
const {
    controllerGet,
    controllerGetId,
    controllerPost,
    controllerPut,
    controllerDelete
} = require('../controllers/assignatures');

//Obtener Asignaturas --Lista
router.get('/',controllerGet);

//Obtener Asignatura por id
router.get('/:id',[check('id','No es ido de mongo').isMongoId(),validarCampos],controllerGetId);

//Crear una Asignatura
router.post('/',[validarJWT,check('nombre','Nombre vacio').not().isEmpty(),
check('nombre','La asignatura ya existe').custom(assignatureExistPost),
check('IdCarrera','No es id de mongo').isMongoId(),
validarCampos],controllerPost);

//Actualizar una Asignatura
router.put('/:id',[validarJWT,
    check('id','No es id de mongo').isMongoId(),
    check('id').custom(assignatureExist),
    validarCampos
],controllerPut);

//Eliminar una asignatura
router.delete('/:id',[validarJWT,
check('id','No es un Id de mongo').isMongoId(),
check('id').custom(assignatureExist)
,validarCampos],controllerDelete);

module.exports = router;