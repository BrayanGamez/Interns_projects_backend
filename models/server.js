const express = require('express');
const cors = require('cors');
const {dbConnection}=require('../database/config');


class Server
{
    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;

        this.dbconecction();
    }

    async dbconecction()
    {
        await dbConnection;
    }

    listen()
    {
        this.app.listen(this.port,()=>{console.log(`Escuchando en puerto ${this.port}`)})
    }

}

module.exports = Server;