const express = require('express');
const router = express.Router(); // método que se encarga de devolver un objeto

const Task = require('../models/task');//Importar desde el archivo 'tasks' el esquema de los datos
// y lo guarda en la constante 'Task'

router.get('/', async (req, res) => {//Muestra los datos en pantalla en el cuadro al lado del formulario
    const tasks = await Task.find();//Traer los datos desde la base de datos y lo almacena en la constante 'tasks'
    console.log(tasks);
    res.render('index', {// Pasa la información y la publica en el cuadro de texto en el navegador
        tasks //tasks: tasks
    });
})

router.post('/add', async (req, res) => {//Conectar el formulario a la base de datos y guardar estos en objetos
    const task = new Task(req.body);//Guarda los datos en 'task'
    await task.save();// Guarda el dato
    res.redirect('/');// Redirige la pagina a la ruta raiz y muestra los datos.
})

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;//Se recibe el Id para actualizar el estado en 'Done'
    const task = await Task.findById(id);//Buscamos el Id y lo guardamos en una constante 'task'
    task.status = !task.status;//Se cambia el estado de verdadero a falso y viceversa
    await task.save();
    res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
})

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
})

router.get('/delete/:id', async (req, res) => {
    /* console.log(req.params)// probar si el boton 'delete' funciona
    res.send('received'); */
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
})

module.exports = router; //exportando el método

