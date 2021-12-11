const express = require('express');
const port = 8000;
const app = express();


// here we require the express ejs layout
const expressLayouts = require('express-ejs-layouts');

// acquir cookies parser
const cookieParser = require('cookie-parser');


const db = require('./cofig/mongoose');
// const { urlencoded } = 
app.use(express.urlencoded());

// now use cookies parser
app.use(cookieParser());


app.use(express.static("./assets"));


// now use expresslayout as middleware
app.use(expressLayouts);


// use express router as middle ware
app.use('/' , require('./routes/index'));
// extract style and script from subpages into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

// // set up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');





app.listen(port , function(err){
    if(err){console.log("Error "); return ;}
    console.log("Server is running on the " , port);
}) 