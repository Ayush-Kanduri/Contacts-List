//Require the Mongoose Library
const mongoose = require("mongoose");

//Connect to the Database
mongoose.connect("mongodb://localhost/contacts_list_db");

//Acquire the Connection
const db = mongoose.connection;

//If Error
db.on("error", console.error.bind(console, "Error connecting to the MongoDB"));

//If Successful
db.once("open", () => {
	console.log("Successfully connected to the MongoDB !!!");
});
