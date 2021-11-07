const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {validarCampos} = require('../middlewares/validateFields');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarExtensionArchivo} = require('../middlewares/validar-archivo-extension');
const {validarArchivoSubir} = require('../middlewares/validar-archivo');
const {colectionVerify}  = require('../helpers/validatorsFields');
const {
    cargarArchivoPdf,
    actualizarAvatarCloudinary,
    controllerImgNotFound} = require('../controllers/uploads');
const { subirArchivo } = require('../helpers/subir-archivo');


/* router.post('/',validarArchivoSubir,cargarArchivo); */

//Cargamos-actualizamos avatar para scholars y admins
router.put('/:coleccion/:id',[validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom((c)=>colectionVerify(c,['scholars','admins'])),
    validarCampos
],actualizarAvatarCloudinary);

/*Sirve una imagen estatica cuando no hay una en la base de datos*/
router.get('/imgNotFound',controllerImgNotFound);/*Solo de uso interno*/

//Ruta para subir archivos de documentacion
router.put('/:tipo',[
    validarJWT,
    validarArchivoSubir,
    validarCampos],cargarArchivoPdf);

//obtenemos la imganen desde un ambito local
/* router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom((c)=>colectionVerify(c,['scholars'])),
    validarCampos
],mostrarAvatar); */


module.exports=router;