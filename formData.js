const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

let datas = [];

router.post('/emails', (req, res) => {
    const data = req.body
    datas.push(data);
    res.sendStatus = 200;
    res.send('Data was successfully added to the database.')
    res.end()
})

//this where we want to acces the posted data
router.get('/emails', (req, res) => {
    res.send(JSON.stringify(datas))

})




module.exports = router;