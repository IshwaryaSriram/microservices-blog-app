const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-cluster-ip-serv:4000/events',event).catch((err) => {
        console.log(err.message);
    }); //posts 
    axios.post('http://comments-cluster-ip-serv:4001/events',event).catch((err) => {
        console.log(err.message);
    }); //comments
    axios.post('http://query-cluster-ip-serv:4002/events',event).catch((err) => {
        console.log(err.message);
    }); //query
    axios.post('http://moderation-cluster-ip-serv:4003/events',event).catch((err) => {
        console.log(err.message)
    }); //moderation 

    res.send({ status: 'OK'})

})

app.get('/events', (req,res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Listening on 4005');
})