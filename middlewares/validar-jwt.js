const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Scholar = require('../models/scholar');
const Admin = require('../models/admin');

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
      const {_id} =  jwt.verify(token,process.env.SECRETPRIVATEKEY);
      const scholar = await Scholar.findById(_id);
      const admin = await Admin.findById(_id);

      if(!scholar&&!admin)
      {
        return res.status(401).json({
            msg:'Token no valido - Usuario no disponible'
        })
      }

      if(!scholar.status&&!admin.status)
      {
          return res.status(401).json({
              msg:'Token no valido - Usuario no disponible'
          })
      }
      
      if(!scholar)
      {
          req.usuario = admin;
      }
      else
      {
          req.usuario = scholar;
      }

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        });
    }
    next();
}

module.exports = {validarJWT}