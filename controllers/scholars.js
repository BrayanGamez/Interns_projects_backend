const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const Scholar = require('../models/scholar');

const controllerGet = async(req=request,res=response)=>
{
    const {limite=5,desde=0} = req.query;
    const queryUserTrue = {status:true};

    const [Total,Scholars] =  await Promise.all([
        Scholar.countDocuments(queryUserTrue),
        Scholar.find(queryUserTrue)
        .populate({path:'idUniversidad',select:'nombre'})
        .populate({path:'idCarrera',select:'nombre'})
        .skip(Number(desde))
        .limit(Number(limite))   
    ]);

    res.json({Total,Scholars});
}

const controllerGetId = async(req=request,res=response)=>
{
    const user = req.usuario;
    if(!user.img)
    {
         user.img = `https://rest-server-dps-api.herokuapp.com/api/uploads/imgNotFound`;
    }

    res.json(user);
}


const controllerPost = async(req=request,res=response)=>
{

    if(!req.body){return res.status(400).json({
        msg:'Campos vacios'
    })}
    
    const {nombre,
        apellido,
        carnet,
        password,
        edad,
        fechaNacimiento,
        direccion,
        correo,
        telefono,
        statusBecario,
        status,
        IdCarrera,
        IdUniversidad} = req.body;

    const idCarrera = new mongoose.Types.ObjectId(IdCarrera);
    const idUniversidad = new mongoose.Types.ObjectId(IdUniversidad);
    const dia = fechaNacimiento.substring(0,2);
    const mes = fechaNacimiento.substring(3,5);
    const anio = fechaNacimiento.substring(6);
    const newFecha = `${anio}-${mes}-${dia}`;
    const scholar = new Scholar({nombre,
            apellido,
            carnet,
            password,
            edad,
            fechaNacimiento:newFecha,
            direccion,
            correo,
            telefono,
            statusBecario,
            status,
            idCarrera,
            idUniversidad} );

    const salt = bcryptjs.genSaltSync();
    scholar.password = bcryptjs.hashSync(password,salt);
    await scholar.save();

    res.json(scholar);
}

const controllerPut = async(req=request,res=response)=>
{
    const {id} = req.params;
    const {_id,status,IdCarrera,IdUniversidad,fechaNacimiento,password,...resto} = req.body;

    if(password)
    {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password,salt);
    }
    if(IdCarrera)
    {
        const idCarrera = new mongoose.Types.ObjectId(IdCarrera);
        resto.idCarrera = idCarrera;
    }
    if(IdUniversidad)
    {
        const idUniversidad = new mongoose.Types.ObjectId(IdUniversidad);
        resto.idUniversidad = idUniversidad;
    }
    if(fechaNacimiento)
    {
    const dia = fechaNacimiento.substring(0,2);
    const mes = fechaNacimiento.substring(3,5);
    const anio = fechaNacimiento.substring(6);
    const newFecha = `${anio}-${mes}-${dia}`;
    resto.fechaNacimiento = newFecha;
    }
    const scholar = await Scholar.findByIdAndUpdate(id,resto);

    res.json(scholar)
}

const controllerDelete = async(req=request,res=response)=>
{
    const {id} = req.params;
    const scholar = await Scholar.findByIdAndUpdate(id,{status:false});
    res.json(scholar);
}
module.exports = {
    controllerPost,
    controllerPut,
    controllerDelete,
    controllerGet,
    controllerGetId};