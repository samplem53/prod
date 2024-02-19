const express = require('express');
const app = express();
const userRouter = require('./Router/userRouter');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/dist')))

app.use('/user', userRouter);

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})


module.exports = app