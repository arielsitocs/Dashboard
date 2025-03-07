import mongoose from "mongoose";

// Creacion de la estructura del usuario con tipos de datos definidos
const userSchema = new mongoose.Schema({ 
    name: String,
    rut: String,
    birth: String,
    position: String,
    email: String,
    phone: String,
    password: String
})

// Funcion que nos permite instruir al toJSON como deberia hacer la transformacion segun nuestras necesidades
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id // Asignamos el id creado en mongoDB al objeto creado por nosotros 
        delete returnedObject._id // Borramos el campo de _id ya que se lo asignamos al objeto
        delete returnedObject.__v // Borramos el campo de __v ya que no nos sirve de nada
    }
})

// Creacion de un modelo usando el esquema de usuario creado arriba
const User = mongoose.model('User', userSchema);

export default User;