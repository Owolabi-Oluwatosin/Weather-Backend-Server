const express = require("express");
const env = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();

//environment variable or you can say constants
env.config();

// importing db configurations
const dbconfig = require('./config/dbconfig');

//routes
const historyRoutes = require("./routes/history");

//parsing request
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//routes middleware
app.use("/api/", historyRoutes);

//connection to mongodb database
mongoose.connect(dbconfig.dburl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log("Database Connected...");
}).catch((err) => {
  console.log(err);
})

if(process.env.NODE_ENV === "production"){
  app.use(static("client/build"));
}

//weather server is listening on this port
let port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});