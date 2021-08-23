/*project init*/
const express = require('express');
const app = express();
require('dotenv').config();

//init cors
const cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}));

//set stylesheet
app.use(express.static('public'));

//set the main webpage root
const indexDirectory = __dirname + '/views/index.html';
app.get('/', (req,res)=>{
    console.log(req.method +" "+ `on port: ${process.env.PORT}`);
    res.sendFile(indexDirectory);
    
});

app.get("/api/2021-8-23", (req,res)=>{
    res.json({unix: Date.now(), utc: new Date().toUTCString()});
})

//set a port to listening for server requests
const listener = app.listen(process.env.PORT, ()=>{
    console.log('your app is listening on port: '+ listener.address().port);
});
