const {request,response} = require('express');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
cloudinary.config({
  cloud_name: 'drhu0an1l', 
  api_key: '326451829191238', 
  api_secret: 'hyoQPyq3ryXEAkSzZlEnV1kr6pU',
  secure: true
});
const {subirArchivo} =require('../helpers/subir-archivo');
const Scholar = require('../models/scholar');
const Reception = require('../models/reception');
const Admin = require('../models/admin');

const cargarArchivo = async(req=request,res=response)=>
{

  try {
    const nombre =  await subirArchivo(req.files);
    res.json({nombre});
  } catch (msg)
   {
      res.status(400).json({msg});
  }
}

const controllerImgNotFound = (req=request,res=response)=>
{
    const pathImagen = path.join(__dirname,'../asset','default.jpg');
     return res.sendFile(pathImagen);
}


const cargarArchivoPdf = async(req=request,res=response)=>
{
    const {tipo} = req.params;
    const {_id} = req.usuario;
    const reception = await Reception.findOne(
        {
            $and:[{Estudiante:_id.toString()},{status:true},{EstadoDeFormulario:true}]
        }
    );
    let documento;

    switch (tipo) {
        case 'colectorNotas':
            documento = 'ColectorDeNotas';
            break;

        case 'informeAcademico':
            documento = 'InformeRendimientoAcademico';
            break;
            
        case 'informeNotas':
            documento = 'InformeDeNotas';
            break;

        case 'cartaSuperior':
            documento = 'CartaTercioSuperior';
             break;

        case 'hojaCicloProximo':
            documento = 'HojaInscripcionCicloProximo';
            break;
    
        default:
            return res.status(500).json({msg:'Ese archivo a un no esta habilitado'});
            break;
    }

    if(reception[documento])
    {
        const nombreArr = reception[documento].split('/');
        const nombre = nombreArr[nombreArr.length-1];    
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath } = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath,function(error, result) { console.log(error) });
    reception[documento] = secure_url;
    await reception.save();

    res.json(reception);
}

const actualizarAvatar =async(req=request,res=response)=>
{
    const {coleccion,id} = req.params;
    var modelo;

    modelo = await Scholar.findById(id);
            if(!modelo)
            {
                return res.status(400).json({msg:`no existe un usuario con id ${id}`});
            }
            
            if(modelo.img)
            {
                const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
                if(fs.existsSync(pathImagen))
                {
                    fs.unlinkSync(pathImagen);
                }
            }



            const nombre = await subirArchivo(req.files,undefined,coleccion);
            modelo.img = nombre;
            await modelo.save();
           
    res.json(modelo);
}

const actualizarAvatarCloudinary =async(req=request,res=response)=>
{
    const {id,coleccion} = req.params;
    let modelo;

    switch (coleccion) {
        case 'scholars':
            modelo = await Scholar.findById(id);
            if(!modelo)
            {
                return res.status(400).json({msg:`no existe un usuario con id ${id}`});
            }
            break;

        case 'admins':
            modelo = await Admin.findById(id);
            if(!modelo)
            {
                return res.status(400).json({msg:`no existe un usuario con id ${id}`});
            }
            break;
    
        default:
            return res.status(500).json({msg:'Esta coleccion a un no esta habilitada'});
            break;
    }

            //Limpiar imagen previa
            if(modelo.img)
            {
                const nombreArr = modelo.img.split('/');
                const nombre = nombreArr[nombreArr.length-1];    
                const [public_id] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
            }

           const {tempFilePath } = req.files.archivo;
           const {secure_url} = await cloudinary.uploader.upload(tempFilePath,function(error, result) { console.log(error) });
           modelo.img = secure_url;
           await modelo.save();       
           
    res.json(modelo);
}

const mostrarAvatar = async(req=request,res=response)=>
{
    const {coleccion,id} = req.params;
   const modelo = await Scholar.findById(id);
    if(!modelo)
    {
        return res.status(400).json({msg:`no existe un usuario con id ${id}`});
    }

    if(modelo.img)
    {
        const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImagen))
        {
            return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname,'../asset','default.jpg');
    res.sendFile(pathImagen);

}
module.exports = {
    cargarArchivo,
    actualizarAvatar,
    mostrarAvatar,
    actualizarAvatarCloudinary,
    controllerImgNotFound,
    cargarArchivoPdf}