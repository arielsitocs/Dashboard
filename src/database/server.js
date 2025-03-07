import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; //Libreria para encriptar las contraseñas antes de guardarlas en la BD de mongo
import jwt from 'jsonwebtoken'; //Libreria para generar tokens al usuario asi no tendra que loguearse cada vez que realice una accion
import dotenv from 'dotenv'; // Libreria para acceder a las variables de entorno almacenadas en .env
import User from './models/user.js'
import connection from './db.js';

connection(); // Conexion a la BD de mongoBDB

const app = express(); // Asi utilizamos express en el archivo

app.use(express.json()); // Para que express transforme a json los datos enviados por el body de las peticiones

app.use(cors()); // Permite que se hagan peticiones desde cualquier lado, ya que sin esto los fetchs son bloqueados en el frontend

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto:", PORT)
});

app.get('/', (request, response) => {
    response.send('<h1>/api/users para ver los usuarios</h1>');
}) 

app.get('/api/users', (request, response) => {
    User.find().then(users => { // Devuelve todos los usuarios sin filtro
        response.json(users);
    })
})

// Los datos en la request siempre llegaran como string, por lo que si buscamos un numero hay que convertirlo a numero
app.get('/api/users/:id', (request, response) => {
    const id = request.params.id;
    User.findById(id).then(user => {
        if(user) {
            response.json(user);
        } else {
            response.status(404).end();
        }
    });
}) 

// Funcion para acutalizar un usuario con los datos enviados por la peticion
app.put('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const user = request.body;

    const updatedUser = {
        name: user.name,
        rut: user.rut,
        birth: user.birth,
        position: user.position,
        email: user.email,
        phone: user.phone 
    }
    
    User.findByIdAndUpdate(id, updatedUser).then(updatedUser => {
        response.status(202).json(updatedUser);
    })
})

// Metodo que elimina el usuario por parametro en la peticion(id) y retorna un array con los usuarios que no tienen el id encontrado
app.delete('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const objectId = new mongoose.Types.ObjectId(id); // Para convertir el id recibido en el tipo exacto que usan los ids de mongoDB

    User.findByIdAndDelete(objectId).then(() => {
        response.status(200).end()
    }); 
})

// Metodo post para crear un nuevo usuario(JSON) con los datos que llegan desde el cuerpo de la peticion
app.post('/api/users', async (request, response) => {
    const user = request.body;

    //Encriptar la contraseña con bcrypt antes de guardarla, hacemos 10 rondas de encriptacion para añadir más seguridad a las contraseñas 
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    const newUser = new User({
        name: user.name,
        rut: user.rut,
        birth: user.birth,
        position: user.position,
        email: user.email,
        phone: user.phone ,
        password: passwordHash
    })

    newUser.save().then(savedUser => {
        response.status(201).json(savedUser); 
    }) 
})

// APARTADO DE AUTENTIFICACIÓN DE USUARIOS //

app.post('/api/login', async (request, response) => {
    const {email, password} = request.body;

    try {

        console.log(email, password)

        //Comparar el correo del usuario en la BD
        const user = await User.findOne({ email });
        if(!user) {
            return response.status(404).json({ error: 'Email no encontrado' })
        }

        //Comparar la contraseña del usuario en la BD 
        const passwordMatch = bcrypt.compare(password, user.password)
        if(!passwordMatch) {
           return response.status(401).json({ error: 'Las contraseñas no coinciden' })
        }

        //Generar el token con jsonwebtokens
        const token = jwt.sign(
            { userId: user.id },
            'clave_secreta_temporal',
            { expiresIn: '1h' }
        )

        //Enviar el token al cliente y el usuario para estableces el usuario logeado
        response.json({ user, token });

    } catch (error) {  
        response.status(500).json({ error: `Error en el servidor: ${error}` });
    }
})

