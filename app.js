
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var inventory = [
	{name: "2016 Chrysler 200", image: "http://images.dealercenter.net/640/480/201806-9051811d92b441cf9928f493c20657e0.jpg"},
	{name: "2015 Toyota Corolla", image: "http://images.dealercenter.net/640/480/201805-00124ec2ef5e49c2b47ffc832c2a854d.jpg"},
	{name: "2015 GMC Seirra", image: "http://images.dealercenter.net/640/480/201807-43c7f3b05c7a4ecb9ddef8161fb4eeea.jpg"}
	];
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/inventory", function(req, res){

	res.render("inventory", {inventory:inventory});

});

app.get("/inventory/new", function(req, res){
	//form will send data to 
	res.render("new");
});

app.post("/inventory", function(req, res){
	//get data from form and add to array of campgrounds
	var name = req.body.name;
	var image = req.body.image;
	var newVehicle = {name: name, image:image};
	inventory.push(newVehicle);
	//redirect back to campgounds page
	res.redirect("/inventory");
});

app.listen(3000, function(){
	console.log("server running");
});