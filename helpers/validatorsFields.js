const {check} = require('express-validator');
const Scholar = require('../models/scholar');
const University = require('../models/university');
const Career = require('../models/career');

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

const EmptyFieldsUniversities = [check('nombre','Campo nombre vacio').not().isEmpty(),
check('nombre','No debe ser mayor a 50 caracteres').isLength({max:50}),
check('direccion','Campo direccion vacio').not().isEmpty(),
check('direccion','No debe ser mayor a 100 caracteres').isLength({max:100}),
check('correo','Campo de correo invalido').not().isEmpty(),
check('correo','formato de correo invalido').isEmail(),
check('telefono','numero de telefono supera 20 caracteres').isLength({max:20})];

const EmptyFieldsCarees = [
    check('nombre','Campo nombre vacio').not().isEmpty(),
    check('pensum','Campo pensum vacio').not().isEmpty(),
    check('ciclos','No es numerico').isNumeric(),
    check('IdUniversidad','No es un id de mongo').isMongoId()
]

const userExist = async(id)=>
{
    const existUser = await Scholar.findById(id);
    if(!existUser)
    {
        throw new Error('El Estudiante no existe en la Base de Datos');
    }
}

const universityExist = async(id)=>
{
    const existUniversity = await University.findById(id);
    if(!existUniversity)
    {
        throw new Error('La Universidad no existe revise su id');
    }
}

const careerExist = async(id)=>
{
    const existCareer = await Career.findById(id);
    if(!existCareer)
    {
        throw new Error('La carrera no existe revise su id');
    }
}

const isUrlValidate = (url)=>
{
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    if(!regexp.test(url))
    {
        throw new Error('La url no tiene una entrada valida');
    }
}

module.exports = {
    EmptyFieldsScholars,
    ageRange,userExist,
    EmptyFieldsUniversities,
    careerExist,
    universityExist,
    isUrlValidate,
    EmptyFieldsCarees
}