var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* clendy. */
router.get('/clovine-trend', function(req, res, next) {
  res.render('clovine-trend', { title: 'clovine Trend for Clen:D' });
});

/* clendy. */
router.get('/heaventree-member', function(req, res, next) {
  res.render('heaventree-member', { title: 'clovine Trend for Clen:D' });
});



module.exports = router;
