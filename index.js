const express = require('express');
const port = 8000;
const app = express();


// here we require the express ejs layout
const expressLayouts = require('express-ejs-layouts');

// acquir cookies parser
const cookieParser = require('cookie-parser');


const db = require('./cofig/mongoose');
// require express session

const session = require('express-session');
// require passport
const passport = require('passport');
// passport strategy

const passportLocal = require('./cofig/passport-local-strategy');
// we need to require this so that we can passport jwt can be used 
const passportJwt = require('./cofig/passport-jwt-strategy');
const passportGoogle = require('./cofig/passport-google-oauth2');
// const { urlencoded } = 

// use mongo store to store the session for longer time

const MongoStore = require('connect-mongo');

// for flash message
const flash = require('connect-flash');
//customise middle ware
const cmiddleware = require('./cofig/middleware');
// now use node sass middle ware
const sassMiddleWare = require('node-sass-middleware');


// web socket set chat socket
const chatServer = require('http').Server(app);
const chatSockets = require('./cofig/chat_socket').chatSockets(chatServer);
chatServer.listen(3000)
    console.log("chat is running on the port number 3000");
// });


app.use(sassMiddleWare({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded());

// now use cookies parser
app.use(cookieParser());


app.use(express.static("./assets"));


// now use expresslayout as middleware
app.use(expressLayouts);

// make the upload available to browser
app.use('/upload' , express.static(__dirname+'/upload'));   

// do practice


// use express router as middle ware
// app.use('/' , require('./routes/index'));
// extract style and script from subpages into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

// // set up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

// mongo store is used to store the session in db
app.use(session({
    name:'codeial',
    // change the secret
    secret:"Amit1999",
    saveUninitialized : false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },

    store: new MongoStore({
        // mongooseConnection :db,
        mongoUrl:'mongodb://localhost/codeial_developement',
        autoRemve:'interval',
        autoRemoveInterval:'1'
    }, function(err){console.log(err || "connect to mongo");}
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//use flash 
app.use(flash());
app.use(cmiddleware.setflashMessage);
app.use('/' , require('./routes/index'));




app.listen(port , function(err){
    if(err){console.log("Error "); return ;}
    console.log("Server is running on the " , port);
}) 