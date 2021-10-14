const {request,response} = require('express');
const Admin = require('../models/admin');
const Scholar = require('../models/scholar');
const bcryptjs = require('bcryptjs');
const {generarJWT}=require('../helpers/generarJWT');

const controllerPost = async(req=request,res=response)=>
{
    const {correo,password} = req.body;
    try {
        const scholar = await Scholar.findOne({correo});
        if(scholar)
        {
            if(scholar.status)
            {
                const validPassword = bcryptjs.compareSync(password,scholar.password);
                if(!validPassword)
                {
                    return res.status(400).json({
                        msg:"Error Usuario/Contrasena - contra incorrecta"
                    });
                }
                const token = await generarJWT(scholar._id);
                    res.json({
                    msg:'Login ok!',
                    token
                           });
            }
        }
        else
        {
            const admin = await Admin.findOne({correo});
            if(!admin)
            {
                return res.status(400).json({
                    msg:"Error Usuario/Contrasena (Admin)"
                });
            }
            const validPassword = bcryptjs.compareSync(password,admin.password);
            if(!validPassword)
            {
            return res.status(400).json({
            msg:"Error Usuario/Contrasena - contra incorrecta (Admin)"
            }); 
            }

            const token = await generarJWT(admin._id);
                    res.json({
                    msg:'Login ok!',
                    token
                           });

        }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = controllerPost;