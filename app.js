var express 	= require("express"),
    app 		= express(),
    bodyParser 	= require("body-parser"),
    mongoose 	= require("mongoose");

mongoose.connect("mongodb://localhost:27017/dealership",  { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//DB scheema
var vehicleSchema = new mongoose.Schema({
	make: String,
	model: String,
	year: String,
	image: String
});

//The collection will be named after what in in the "" if it does not exist yet it will be created in the 
//db specified in the mongoose.conncect
var Inventory = mongoose.model("inventory", vehicleSchema);

// Inventory.create({
// 	make:"Chrysler",
// 	model: "200",
// 	year: 2016,
// 	image:"http://images.dealercenter.net/240/180/201806-9051811d92b441cf9928f493c20657e0.jpg"
// }, function(err, car){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("New car inserted");
// 		console.log(car);
// 	}
// });

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/inventory", function(req, res){
	//Grab all vehicles

	Inventory.find({}, function(err, cars){
		if(err){
			console.log(err);
		}
		else{
			//inventory is being populated by the cars variable returned from our callback funciton
			res.render("inventory", {inventory:cars});			
		}
	});


});

app.get("/inventory/new", function(req, res){
	//form will send data to 
	res.render("new");
});

app.post("/inventory", function(req, res){
	//get data from form and add to database
	console.log(req.body);

	var make  = req.body.make;
	var model = req.body.model;
	var year  = req.body.year;
	var image = req.body.image;
	var NewEntry = {make: make, model: model, year: year, image: image};
	Inventory.create(NewEntry, function(err, Newcar){
		if(err){
			console.log(err);
			console.log("error inserting new entry");
		}
		else{
			//redirect back to campgounds page
			res.redirect("/inventory");
		}
	});
});

app.listen(3000, function(){
	console.log("server running");
});
