import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://arielsitox:MadonaxD1@cluster.3r7p7.mongodb.net/dashboard';

//Conexion a mongoDB
const connection = () => { mongoose.connect(connectionString)
    .then(() => {
        console.log('MongoDB conectado')
    }).catch(err => {
        console.log('Error al conectar a mongoDB: ',err)
    })
}

export default connection;

