//Dependencies
const express = require('express');
const ussdMenu = require('ussd-menu-builder');
const mongoose = require('mongoose');


//Global varialbles
const app = express();
let menu = new ussdMenu();
const PORT = 8585;

//Models
const userTransaction = require('./models/user_transaction');

//Mongoose connection
const database_uri = 'mongodb+srv://ussdadmin:ussdadmin@ussdloader.yg3nc.mongodb.net/ussdloader?retryWrites=true&w=majority';
mongoose.connect(database_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
      });
const db = mongoose.connection;
db.on('error', (err) =>{
    console.log(`${err}`);
});
db.once('open', () =>{
    console.log("Database is running");
});


//Express body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.get('/', (req,res) =>{
    res.send("Logged to the UI");
});
app.post('/', (req,res) =>{
    const {phoneNumber, text, sessionId} = req.body;
    let response;

    if(text === ''){
        response = `CON Welcome to Universal loader\n Choose your service provider\n1. Safaricom\n2. Airtel\n3. Telcom`;
    }
    let input_val = Number(text);
    if(input_val === 1){
        if(text !== ''){
            response = `CON Top up \n 1. My number \n 2. Other number`;
         }
    }
    //Set timer delay
    setTimeout(()=>{
        
        res.send(response);
        res.end();
    },500)
});



app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});