const PORT = "8080";

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");


const app = express();

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
//ejs
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

const getJs = (name) => require("./routes/"+name);
app.use('/', getJs("calc"));

const server = http.createServer(app);
server.listen(PORT, ()=>{
    console.log("start");
});
