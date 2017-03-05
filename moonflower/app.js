var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

// Conexion base de datos
mongoose.connect('mongodb://localhost/clients', function(err, res) {
	if(err) throw err;
	console.log('Conectado a la base de datos');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());

// Modelos y Controladores
var models = require('./models/modelo')(app, mongoose);
var ClientCtrl = require('./controllers/client');

var router = express.Router();

// Index
router.get('/', function(req, res) { 
	res.send("Hola Mundo!");
});

app.use(router);

var api = express.Router();

api.route('/todo') 
 .get(ClientCtrl.findAll) // Devuelve todas las tareas
 .post(ClientCtrl.add);	  // Inserta una nueva tarea

api.route('/todo/:id') 
 .get(ClientCtrl.findById)	// Devuelve una tarea en concreto
 .put(ClientCtrl.update)	// Actualiza una tarea
 .delete(ClientCtrl.delete);	// Elimina una tarea

app.use('/api', api);

// Start Server
app.listen(3000, function() {
	console.log("Node server running on http://localhost:3000");
});


