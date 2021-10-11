const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req=request,res=response,next)=>
{
    const token = req.header('x-token');
    if(!token)
    {
        return res.status(401).json({
            msg:'Token no valido - No existe el usuario en la DB'
        });
    }

    try {
      const {uid} =  jwt.verify(token,process.env.SECRETPRIVATEKEY);
      const usuario = await Usuario.findById(uid);

      if(!usuario)
      {
        return res.status(401).json({
            msg:'Token no valido - Usuario no disponible'
        })
      }

      if(!usuario.estado)
      {
          return res.status(401).json({
              msg:'Token no valido - Usuario no disponible'
          })
      }
      req.usuario = usuario;

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        });
    }
    next();
}

module.exports = {validarJWT}