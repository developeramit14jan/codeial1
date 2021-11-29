const express = require('express');
const port = 8000;
const app = express();

// use express router as middle ware
app.use('/' , require('./routes/index'));

app.listen(port , function(err){
    if(err){console.log("Error "); return ;}
    console.log("Server is running on the " , port);
})