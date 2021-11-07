const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {dbConnection}=require('../database/config');


class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            Auth:'/api/auth',
            Admin : '/api/admin',
            Assignature : '/api/assignatures',
            Careers :'/api/careers',
            Scholars :'/api/scholars',
            Searches :'/api/search',
            Universities : '/api/universities',
            Uploads:'/api/uploads',
            Reception:'/api/receptions'
        }

        this.dbconecction();
        this.middlewares();
        this.routes();
    }

    async dbconecction()
    {
        await dbConnection();
    }

    middlewares()
    {
        //cors
        this.app.use(cors({origin:'*'}));
        //Lectura y parseo
        this.app.use(express.json());
        //Establecer la pagina por defecto
        this.app.use(express.static('public'));
        //FileUpload-Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
        
    }


    routes()
    {
        this.app.use(this.paths.Auth,require('../routes/auth')); 
        this.app.use(this.paths.Scholars,require('../routes/scholars'));
        this.app.use(this.paths.Universities,require('../routes/university'));
        this.app.use(this.paths.Careers,require('../routes/career'))
        this.app.use(this.paths.Admin,require('../routes/admins'));
        this.app.use(this.paths.Assignature,require('../routes/assignatures'));
        this.app.use(this.paths.Searches,require('../routes/searches'));
        this.app.use(this.paths.Uploads,require('../routes/uploads'));
        this.app.use(this.paths.Reception,require('../routes/reception'));
    }

    listen()
    {
        this.app.listen(this.port,()=>{console.log(`Escuchando en puerto ${this.port}`)})
    }

}

module.exports = Server;