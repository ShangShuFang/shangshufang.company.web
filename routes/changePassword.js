let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('changePassword', { title: 'Express' });
});

module.exports = router;