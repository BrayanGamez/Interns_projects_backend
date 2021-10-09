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
/*         this.app.use(cors()); */
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        
        //Lectura y parseo
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }


    routes()
    {
/*         this.app.use(this.pathAuth,require('../routes/auth')); */
        this.app.use(this.pathScholars,require('../routes/scholars'));
        this.app.use(this.pathUniversities,require('../routes/university'))
    }

    listen()
    {
        this.app.listen(this.port,()=>{console.log(`Escuchando en puerto ${this.port}`)})
    }

}

module.exports = Server;