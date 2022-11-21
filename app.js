const express = require('express');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const { send } = require('@emailjs/browser');
const mongoose = require('mongoose');
const dataForm = require('./models/data')
require('dotenv/config');

const hostname = 'localhost';
//we added the process.env.PORT so that when in heroku it will use heroku's designated port
const port = process.env.PORT || 3002;


// let datas = [];

//we use nodemon for the development of servers. As we can modify without any need for restartingg server each time

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname + "/public")))

// for parsing form data in format x--www....
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing data in json format
app.use(bodyParser.json());



app.get('/my_skills', (req, res) => {
    res.sendFile('files/sample.json', {root: __dirname});
})

app.get('/about', (req, res) => {
    res.sendFile('files/about_me.json', {root: __dirname})
})
app.get('/experience', (req, res) => {
    res.sendFile('files/experience.json', {root: __dirname})
})

//import form data



app.post('/emails', (req, res) => {
    const data = new dataForm({
        username: req.body.username,
        email: req.body.email,
        message: req.body.message
    })

    data.save()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        console.log(err)
    })
    // const data = req.body
    // datas.push(data);
    // res.sendStatus = 200;
    // res.send('Data was successfully added to the database.')
    // res.end()
})

//this where we want to acces the posted data
app.get('/emails', (req, res) => {
    //res.send(JSON.stringify(datas))
    res.send({message: 'some shit happened'})

})


//connct to the database
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to the database')
})

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
})