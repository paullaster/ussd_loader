//Dependencies
const express = require('express');
const ussdMenu = require('ussd-menu-builder');
const mongoose = require('mongoose');


//Global varialbles
const app = express();
let menu = new ussdMenu();
const PORT = 8585;


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

    //Define menu states
    menu.startState({
        run: () =>{
            //CON: to send response without terminating the session
            menu.con(`Welcome to Universal Loader\n
            Choose your service provider\n
            1. Safaricom \n 2. Airtel \n 3. Telcom`);
        }
       
    });
    console.log(response);

});



app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});