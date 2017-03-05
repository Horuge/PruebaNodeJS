var mongoose = require('mongoose');
var Modelo = mongoose.model('Modelo');

//GET - Devuelve todos los registros
exports.findAll = function(req, res) {
 	Modelo.find(function(err, Modelos) {
 		if(err) res.send(500, err.message);
 		console.log('GET /Modelos')
 	res.status(200).jsonp(Modelos);
 	});
};

//GET - Devuelve un id
exports.findById = function(req, res) {
 	Modelo.findById(req.params.id, function(err, Modelo) {
 		if(err) return res.send(500, err.message);
 		console.log('GET /Modelos/' + req.params.id);
 		res.status(200).jsonp(Modelo);
 	});
};

//POST - Añade un registro
exports.add = function(req, res) {
 	console.log('POST');
 	console.log(req.body);
 	var Modelo = new Modelo({
 		name: req.body.name,
 		status: req.body.status,
 });
 Modelo.save(function(err, Modelo) {
 	if(err) return res.send(500, err.message);
 	res.status(200).jsonp(Modelo);
 });
};

//PUT - Actualiza un registro
exports.update = function(req, res) {
 	Modelo.findById(req.params.id, function(err, Modelo) {
 		Modelo.name = req.body.name;
		Modelo.status = req.body.status;
 		Modelo.save(function(err) {
 			if(err) return res.send(500, err.message);
 			res.status(200).jsonp(Modelo);
 		});
 	});
};

//DELETE - Elimina un registro
exports.delete = function(req, res) {
	Modelo.findById(req.params.id, function(err, Modelo) {
 		Modelo.remove(function(err) {
 			if(err) return res.send(500, err.message);
 			res.json({ message: 'Successfully deleted' });
 		});
 	});
};
