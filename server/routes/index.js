var express = require('express');
const test1 = require('../test1');
var cors = require('cors')
const compare = require('../compare.js');
var router = express.Router();

router.get('/', (req, res) => {
  console.log('hello');
});
router.use(cors())
/* GET home page. */
router.post('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log('bye');
  console.log(req.body);
  console.log(typeof req.body);
  const result = compare(req.body, test1);
  res.send({
    data: result
  });
});

module.exports = router;
