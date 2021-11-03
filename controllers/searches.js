const {request,response} = require('express');
const {ObjectId} = require('mongoose').Types;

//colecciones
const Scholar = require('../models/scholar');
const Career = require('../models/career');
const Assignature = require('../models/assignature');
const University = require('../models/university');

const trueColecctions = [
    'assignatures',
    'careers',
    'scholars',
    'universities'
];

const searchScholars = async(termino,res=response)=>
{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId)
    {
        const scholar = await Scholar.findById(termino);

        res.json({
            results:(scholar)?[scholar]:[]
        });
    }

    const regEx = new RegExp(termino,'i');
    const scholar = await Scholar.find({
        $or:[{nombre:regEx},{apellido:regEx},{direccion:regEx},{correo:regEx},{telefono:regEx}],
        $and:[{status:true}]
    })
    .populate({path:'idCarrera',select:'nombre'})
    .populate({path:'idUniversidad',select:'nombre'});

    res.json({results:scholar});

}

const searchCareers = async(termino,res=response)=>
{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId)
    {
        const career = await 
        Career
        .find({_id:termino,status:true})
        .populate({path:'idUniversidad',select:'nombre'});

        const careerByUniversity = await 
        Career
        .find({idUniversidad:ObjectId(termino),status:true})
        .populate({path:'idUniversidad',select:'nombre'});

        return res.json({
            results:(career.length>0)?[career]:(careerByUniversity.length>0)?[careerByUniversity]:[]
        });
    }

    const regEx = new RegExp(termino,'i');
    const career = await Career.find({nombre:regEx,
        status:true
    })
    .populate({path:'idUniversidad',select:'nombre'});

    res.json({results:career});
}

const searchAsignatures = async(termino,res=response)=>
{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId)
    {
        const asignature = await 
        Assignature
        .find({_id:termino,status:true})
        .populate({path:'idCarrera',select:'nombre'});

        const asignatureByCareer = await 
        Assignature
        .find({idCarrera:ObjectId(termino),status:true})
        .populate({path:'idCarrera',select:'nombre'});

        return res.json({
            results:(asignature)?[asignature]:(asignatureByCareer)?[asignatureByCareer]:[]
        });
    }
    const regEx = new RegExp(termino,'i');
    const asignature = await Assignature.find({nombre:regEx,status:true});
    res.json({
        results:asignature
    });
}

const searchUniversities = async(termino,res=response)=>
{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId)
    {
        const university = await University.findById(termino);

        res.json({
            results:(university)?[university]:[]
        });
    }

    const regEx = new RegExp(termino,'i');
    const university = await University.find({
        $or:[{nombre:regEx},{direccion:regEx},{correo:regEx}],
        $and:[{status:true}]
    });

    res.json({results:university});

}

const Search = (req=request,res=response)=>
{
    const {coleccion,termino} = req.params;

    if(!trueColecctions.includes(coleccion))
    {
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${trueColecctions}`
        })
    }

    switch (coleccion) {
        case 'assignatures':
            searchAsignatures(termino,res);
            break;

        case 'careers':
            searchCareers(termino,res);
            break;

        case 'scholars':
            searchScholars(termino,res);
            break;

        case 'universities':
            searchUniversities(termino,res);
            break;
    
        default:
            res.status(500).json({
                msg:'Falto implementar esa coleccion , hable con el administrador'
            })
            break;
    }
}

module.exports = {Search}