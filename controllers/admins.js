const {request,response} = require('express');
const Admin = require('../models/admin');
const bcryptjs = require('bcryptjs');

const controllerGet = async(req=request,res=response)=>
{
    const {limite=5,desde=0} = req.query;
    const queryUserAdmin = {status:true};

    const [Total,Admins] =  await Promise.all([
        Admin.countDocuments(queryUserAdmin),
        Admin.find(queryUserAdmin).skip(Number(desde)).limit(Number(limite))   
    ]);

    res.json({Total,Admins});
}

const controllerPost = async(req=request,res=response)=>
{

    if(!req.body){return res.status(400).json({
        msg:'Campos vacios'
    })}
    
    const {usuario,
        password,
        nombre,
        apellido,
        correo,
        telefono} = req.body;

    const admin = new Admin({usuario,
        password,
        nombre,
        apellido,
        correo,
        telefono} );

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password,salt);
    await admin.save();

    res.json(admin);
}

const controllerPut = async(req=request,res=response)=>
{
    const {id} = req.params;
    const {_id,status,password,...resto} = req.body;

    if(password)
    {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password,salt);
    }
    const admin = await Admin.findByIdAndUpdate(id,resto);

    res.json(admin)
}

const controllerDelete = async(req=request,res=response)=>
{
    const {id} = req.params;
    const admin = await Admin.findByIdAndUpdate(id,{status:false});
    res.json(admin);
}

module.exports = {controllerGet,controllerPost,controllerPut,controllerDelete}