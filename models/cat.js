var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var schema = mongoose.Schema({
	name: String,
	age: Number,
	color: [String]
});
var Cat = mongoose.model('Cat', schema);

module.exports = Cat;