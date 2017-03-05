var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modeloSchema = new Schema({ 
	name: {type : String },
	status: {type : Number}
});

module.exports = mongoose.model('Modelo', modeloSchema);
