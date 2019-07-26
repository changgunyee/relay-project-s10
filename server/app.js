const express = require('express');
const app = express();
const compare = require('./compare.js');
const cors = require('cors');

app.use(cors());
// respond with "hello world" when a GET request is made to the homepage
app.post('/', function (req, res) {
    const result = compare(req);
    res.send({
        data: result
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
