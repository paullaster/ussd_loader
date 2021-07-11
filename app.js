//Dependencies
const express = require('express');
const ussdMenu = require('ussd-menu-builder');
const mongoose = require('mongoose');


//Global varialbles
const app = express();
let menu = new ussdMenu();
const PORT = 9595;

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
//Menus
menu.startState({
    run: ()=>{
        menu.con(`Welcome to universal loader. \n 
        Please choose your service provider. \n
        1.Safaricom\n
        2.Airtel\n
        3.Telcom`);
    },
    next: {
        '1':'safaricom',
        '2':'airtel',
        '3':'telcom',
    },
    defaultNext: 'Invalid option'
})
menu.state('safaricom',{
    run:()=>{
        menu.con(`Buy airtime for\n
        1.My Number\n
        2.Other Number`);
    },
    next:{
        '1':'myNumber',
        '2':'otherNumber',
    },
    defaultNext: 'Invalid option'
})
menu.state('myNumber',{
    run:()=>{
        menu.con('Enter amount');
    },
    next:{
        '*\\d+':'myNumber.amount',
    }
})
menu.state('myNumber.amount',{
    run: ()=>{
        let amount = Number(menu.val);
        buyAirtime(menu.args.phoneNumber, amount)
        .then(res=>{
            menu.end("Airtime bought successfully");
        })
    }
})



app.get('/', (req,res) =>{
    res.send("Logged to the UI");
});
app.post('/ussd', (req,res) =>{
    console.log(req.body);
    // let args = {
    //     phoneNumber: req.body.phoneNumber,
    //     text: req.body.text,
    //     sessionId:req.body.sessionId,
    //     serviceCode: req.body.serviceCode,
    // };
    // menu.run(args, argsMsg =>{
    //     res.send(argsMsg);
    // });
    })
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});