const Scholar = require('../models/scholar')
const {request,response} = require('express');
const bcryptjs = require('bcryptjs');


const controllerPost = async(req=request,res=response)=>
{
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
        idCarrera,
        idUniversidad} = req.body;
    if(!scholar){return res.status(400).json({
        msg:'Campos vacios'
    })}

    const scholar = new Scholar({nombre,
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
    const {_id,status,idCarrera,idUniversidad,password,...resto} = req.body;

    if(password)
    {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password,salt);
    }
    const scholar = await Scholar.findByIdAndUpdate(id,resto);

    res.json(scholar)
}

const controllerDelete = (req=request,res=response)=
{

}
module.exports = {controllerPost,controllerPut};