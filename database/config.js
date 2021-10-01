const mongoose = require('mongoose');

const dbConnection = async()=>
{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log('Conexion exitosa');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la base de datos');
    }
}


module.exports = {dbConnection}