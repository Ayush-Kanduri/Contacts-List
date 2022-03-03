//Require Express Module for running the Express Server
const express = require("express");
//Create Port
const port = 8000;
//Require Module Path for Directory
const path = require("path");
//Require the MongoDB Database File from Mongoose.js
const db = require("./config/mongoose");
//Require the DB Model/Collection of the Schema
const Contact = require("./models/contact");
//Create Express App for Request-Response Cycle & to create the Express Server
const app = express();

//Set Up Template Engine as EJS
app.set("view engine", "ejs");
//Set Up Template Engine Views Folder Path (..../views)
app.set("views", path.join(__dirname, "views"));

//Middleware - URL Encoder
app.use(express.urlencoded());
//Middleware - Static Files
app.use(express.static("assets"));

//Contact List Array of Objects to store the data
let contactList = [
	{
		name: "Ayush",
		phone: "1234567890",
	},
	{
		name: "Aman",
		phone: "1234567891",
	},
	{
		name: "Akshay",
		phone: "1234567892",
	},
];

//Home Page URL Controller
app.get("/", (request, response) => {
	//Fetches the Contact List from the Database based on any condition or all of them.
	Contact.find({}, (err, contacts) => {
		if (err) {
			console.log("Error in fetching the contacts from DB");
			return;
		}
		//Send the EJS View Response to the clients
		return response.render("home", {
			title: "Contact List",
			contact_list: contacts,
		});
	});
});

//Practice Page URL Controller
app.get("/practice", (request, response) => {
	//Send the EJS View Response to the clients
	return response.render("practice", {
		title: "Let's Play with EJS",
	});
});

//Create-Contact Page Form URL Controller
app.post("/create-contact", (request, response) => {
	//Add a new Contact into the DB
	Contact.create(
		{
			name: request.body.name,
			phone: request.body.phone,
		},
		(err, newContact) => {
			if (err) {
				console.log("Error in Creating a Contact");
				return;
			}
			console.log("*******", newContact, "*******");
			//Redirect to the Home Page URL where the updated Contact List is displayed
			return response.redirect("back");
		}
	);
});

//Delete-Contact Page URL Controller
app.get("/delete-contact", (request, response) => {
	//Get the ID from the Query Param URL
	let id = request.query.id;
	//Find the Contact in the DB based on the ID & then delete it.
	Contact.findByIdAndDelete(id, (err) => {
		//No 2nd argument since we are only deleting a Contact.
		if (err) {
			console.log("Error in Deleting the Contact");
			return;
		}
		//Redirect to the Home Page URL where the updated Contact List is displayed
		return response.redirect("back");
	});
});

//Run the ExpressJS Server
app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(`Express Server is Up & Running Successfully on Port ${port}`);
});
