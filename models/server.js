const express = require('express');
const cors = require('cors');
const {dbConnection}=require('../database/config');


class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        this.pathAuth = '/api/auth';
        this.pathScholars = '/api/scholars';
        this.pathUniversities = '/api/universities';
        this.pathCareers = '/api/careers';

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
        this.app.use(express.static('public'));
    }


    routes()
    {
/*         this.app.use(this.pathAuth,require('../routes/auth')); */
        this.app.use(this.pathScholars,require('../routes/scholars'));
        this.app.use(this.pathUniversities,require('../routes/university'));
        this.app.use(this.pathCareers,require('../routes/career'))
    }

    listen()
    {
        this.app.listen(this.port,()=>{console.log(`Escuchando en puerto ${this.port}`)})
    }

}

module.exports = Server;