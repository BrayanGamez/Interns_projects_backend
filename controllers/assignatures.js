const {request,response} = require('express');
const Assinature = require('../models/assignature');
const mongoose = require('mongoose');


const controllerGet = async(req=request,res=response)=>
{
    const {limite=5,desde=0} = req.query;
    const AssignatureStatus={status:true};
    
    const [Total,Assignatures] = await Promise.all([Assinature.countDocuments(AssignatureStatus),
    Assinature.find(AssignatureStatus)
    .populate({path:'idCarrera',select:'nombre'})
    .skip(Number(desde))
    .limit(Number(limite))]);

    res.status(200).json({Total,Assignatures});
}

const controllerGetId = async(req=request,res=response)=>
{
    const {id} = req.params;
    if(!id)
    {
      return  res.status(400).json({msg:'Id de Asignatura no especificado'});
    }

    const assignature = await Assinature.findById(id);

    if(!assignature)
    {
       return res.status(404).json({msg:'La Asignatura no existe en la base de datos'})
    }

    res.status(200).json(assignature);
}

const controllerPost = async(req=request,res=response)=>
{
    const data = req.body;

    if(!data)
    {
        return res.status(400).json('No ha ingresado la informacion a la ruta');
    }

    const {IdCarrera,...resto} = data;
    const idCarrera = new mongoose.Types.ObjectId(IdCarrera);
    const assignature = new Assinature({...resto,idCarrera});
    await assignature.save()
    if(!assignature)
    {
        return res.status(500).json({msg:'Hubo un error al crear la assinatura'});
    }

    res.status(201).json(assignature)

}

const controllerPut = async(req=request,res=response)=>
{
    const {id} = req.params;
    const data = req.body;

    if(!data)
    {
        return res.status(400).json({msg:'La entrada esta vacia'});
    }

    const {IdCarrera,IdAlumno,...resto} = data;

    if(IdCarrera)
    {
        const idCarrera = mongoose.Types.ObjectId(IdCarrera);
        resto.idCarrera = idCarrera;
    }



    const assignature = await Assinature.findByIdAndUpdate(id,resto);

    res.status(200).json(assignature);
}

const controllerDelete = async(req=request,res=response)=>
{
    const {id} = req.params;

    if(!id)
    {
        return res.status(400).json({msg:'El id no esta definido'});
    }

    const assignature = await Assinature.findByIdAndUpdate(id,{status:false});

    res.status(200).json({assignature})
}

module.exports = {
    controllerGet,
    controllerGetId,
    controllerPost,
    controllerPut,
    controllerDelete
}