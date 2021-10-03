const {check} = require('express-validator');
const Scholar = require('../models/scholar');

const ageRange = (edad)=>
{
    if (edad<15||edad>110)
    {
       throw new Error('Rango de edad invalida (debe ser mayor a 15 o menor a 110)');
    }
    return true;
}

const EmptyFieldsScholars = [check('nombre','Campo Nombre vacio').not().isEmpty(),
check('nombre','30 caracteres maximo').isLength({max:30}),
check('apellido','campo apellido vacio').not().isEmpty(),
check('apellido','30 caracteres maximo').isLength({max:30}),
check('carnet','campo carnet vacio').not().isEmpty(),
check('password','campo password vacio').not().isEmpty(),
check('password','La password debe poseer como minimo 6 caracteres').isLength({min:6}),
check('edad','No es numerico').isNumeric(),
check('edad','campo edad vacio').not().isEmpty(),
check('fechaNacimiento','campo de fecha nacimiento vacio').not().isEmpty(),
check('direccion','campo de direccion vacio').not().isEmpty(),
check('correo','campo de correo vacio').not().isEmpty(),
check('correo','Formato de correo no valido').isEmail(),
check('telefono','campo de telefono vacio').not().isEmpty(),
check('idCarrera','No es un objeto de mongo').isMongoId(),
check('idUniversidad','No es un objeto de mongo').isMongoId()]
;

const userExist = async(id)=>
{
    const existUser = await Scholar.findById(id);
    if(!existUser)
    {
        throw new Error('El Estudiante no existe en la Base de Datos');
    }
}

module.exports = {EmptyFieldsScholars,ageRange,userExist}