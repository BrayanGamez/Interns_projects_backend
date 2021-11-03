const {response,request} = require('mongoose');
const Career = require('../models/career');
const mongoose = require('mongoose')

const controllerGet = async(req=request,res=response)=>
{
    const {limite=5,desde=0} = req.query;
    const queryCareerTrue = {status:true};

    const [Total,Careers] =  await Promise.all([
        Career.countDocuments(queryCareerTrue),
        Career.find(queryCareerTrue)
        .populate({path:'idUniversidad',select:'nombre'})
        .skip(Number(desde))
        .limit(Number(limite))   
    ]);

    res.json({Total,Careers});
}

const controllerPost = async(req=request,res=response)=>
{
    if(!req.body){return res.status(400).json({
        msg:'Campos vacios'
    })};

    const {nombre,pensum,ciclos,IdUniversidad} = req.body;
    if(!nombre||!pensum||!ciclos||!IdUniversidad){return res.status(400).json({
        msg:'Campos vacios'
    })};

    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    
    if(!regexp.test(pensum)){return res.status(400).json({
        msg:'URL Invalida'
    })};

    const idUniversidad = new mongoose.Types.ObjectId(IdUniversidad);
    const career = new Career({nombre,pensum,ciclos,idUniversidad});
    await career.save();

    res.json(career);
}

const controllerPut = async(req=request,res=response)=>
{
    const {id} = req.params;
    const {_id,idUniversidad,...resto} = req.body;

    const carrer = await Career.findByIdAndUpdate(id,resto);
    res.json(resto);
}

const controllerDelete = async(req=request,res=response)=>
{
    const {id} = req.params;
    const career = await Career.findByIdAndUpdate(id,{status:false});
    res.json(career);
}

module.exports = {controllerGet,controllerPost,controllerPut,controllerDelete}