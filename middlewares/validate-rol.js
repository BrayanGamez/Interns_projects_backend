const { response, request } = require("express");

const esAdminRole = (req=request,res=response,next)=>
{
    if (!req.usuario) {
        return res.status(500).json({
            msg:'Se quiere ver el usuario sin verificar el token primero'
        })
    }

    const {rol,nombre} = req.usuario;
    if (rol!=='ADMIN') 
    {
        res.status(401).json(
            {
                msg:'${nombre} no tiene permisos de administrador'
            }
        )    
    }
    next();
}

module.exports = esAdminRole;