/*project init*/
const express = require('express');
const app = express();
require('dotenv').config();

//init cors
const cors = require('cors');
const { parse } = require('dotenv');
app.use(cors({optionsSuccessStatus: 200}));

//set stylesheet
app.use(express.static('public'));

//set the main webpage root
const indexDirectory = __dirname + '/views/index.html';
app.get('/', (req,res)=>{
    console.log(req.method +" "+ `on port: ${process.env.PORT}`);
    res.sendFile(indexDirectory);
    
});

app.get("/api/:date", (req,res)=>{
    //req.params.date = {unix: Date.now(), utc: new Date().toUTCString()};
    //res.json(req.params.date);
    let reqDate = req.params.date;
    let dateNow = new Date(reqDate);
    if(!reqDate.match(/\d{5,}/) === false){
        reqDate = parseInt(reqDate);
        dateNow = new Date(reqDate);
    }else if(dateNow.toUTCString() == 'Invalid Date'){
        res.json({error : 'Invalid Date'})
    };
    res.json({unix: dateNow.valueOf(), utc: dateNow.toUTCString()});
});

app.get('/api/', (req,res)=>{
    const date = new Date();
    res.json({unix: date.valueOf(), utc: date.toUTCString()});
});

//set a port to listening for server requests
const listener = app.listen(process.env.PORT, ()=>{
    console.log('your app is listening on port: '+ listener.address().port);
});
