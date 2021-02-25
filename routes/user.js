let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('user', { title: 'Express' });
});

module.exports = router;