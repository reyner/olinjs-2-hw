
/*
 * GET users listing.
 */

var Cat = require('../models/cat')

exports.list = function(req, res){
  var query = Cat.find({});
  query.sort("age");
  query.exec(function (err, docs) {
    if (err)
      return console.log("error", err);
    res.render('cats', {cats: docs, title: 'List of cats'});
  });
};

exports.new = function(req, res){
  var names = ["Eagle One", "Been There, Done That", "Currently Doing That", "It Happened Once in a Dream", "If I Had To Pick a Dude", "Eagle Two", "ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ"];
  var namechoice = names[Math.floor(Math.random()*names.length)];
  var agechoice = Math.floor(Math.random()*20);
  var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];
  var number_of_colors = Math.floor(Math.random()*(colors.length-1))+1;
  var colorchoice = [];
  for (var i = 0; i<number_of_colors; i++) {
    colorchoice.push(colors[Math.floor(Math.random()*colors.length)]);
  }
  console.log(colorchoice);
  var kitty = new Cat({ name: namechoice, age: agechoice, color: colorchoice });
  kitty.save(function (err) {
    if (err) return console.log("error", err);
    res.send('meow');
  });
};

exports.color = function(req, res){
  var color_req = req.params.color;
  var query = Cat.find({color: color_req});
  query.sort("age");
  query.exec(function (err, docs) {
    if (err)
      return console.log("error", err);
    res.render('cats', {cats: docs, title: 'List of cats'});
  });
};

exports.delete = function(req, res){
  var query = Cat.findOneAndRemove({}).sort('-age');
  query.exec(function (err, docs){
    if (err)
      return console.log("error", err);
    res.send("Deleted " + docs.name);
  });
};

exports.delete_all = function(req, res){
  Cat.remove({}, function(err) { 
    console.log('collection removed') 
  });
  res.send("deleted");
};