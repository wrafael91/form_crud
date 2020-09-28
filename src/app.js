const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

// connecting to db
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));


// importing routes
const indexRoutes = require('./routes/index');//Invocar las rutas desde la carpeta Routes y guardarlas en constante indexRoutes 

// settings
app.set('port', process.env.PORT || 3000);//Tomar el puerto del sistema operativo, si no existe, colocar el puerto 3000.
app.set('views', path.join(__dirname, 'views'));//Indica que la carpeta views se encuentra en src
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));// ejecutar el middleware usando 'morgan'
app.use(express.urlencoded({extended: false}));// metodo urlEncoded se encarga de entender los datos que le envía un formulario de html

// routes
app.use('/', indexRoutes);// cuando el usuario ingresa a la ruta raiz, podrá acceder a las otras rutas guardadas en la constante indexRoutes

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
})