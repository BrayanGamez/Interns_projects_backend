const {request,response} = require('express');
const University = require('../models/university');


const controllerGet = async(req=request,res=response)=>
{
    const {limite=5,desde=0} = req.query;
    const statusUniversityTrue = {status:true};

    const [Total,Universities] = await Promise.all([
        University.countDocuments(statusUniversityTrue),
        University.find(statusUniversityTrue).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({Total,Universities});
}

const controllerPost=async(req=request,res=response)=>
{
    try
    {
        if(!req.body){return res.status(400).json({
            msg:'Campos vacios'
        })}
    
        const {nombre,direccion,correo,telefono} = req.body;
        const university = new University({nombre,direccion,correo,telefono});
        await university.save();
    
        res.json(university)
    }
    catch(error)
    {
        throw new Error(error);
    }
}

const controllerPut = async(req=request,res=response)=>
{
    const {id} = req.params;
    const {_id,...resto} = req.body;
    const university = await University.findByIdAndUpdate(id,resto)
    res.json(university);
}

const controllerDelete = async(req=request,res=response)=>
{
    const {id} = req.params;
    const university = await University.findByIdAndUpdate(id,{status:false})
    res.json(university);
} 

module.exports={controllerGet,controllerPost,controllerPut,controllerDelete}