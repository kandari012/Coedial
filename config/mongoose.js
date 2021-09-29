//require the library
const mongoose = require("mongoose");
const env = require("./environment");
//connect to the db
mongoose.connect(`mongodb://localhost/${env.db}`); //db name       contact_list_db
//acquire the connection (to check if it is successful) to access db
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error connecting to db"));
// up and running then print the message
db.once("open", function () {
  console.log("successfully connected to the db");
});
