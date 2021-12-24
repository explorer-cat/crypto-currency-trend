var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('heaventree-member', { title: 'cointrend' });
});

/* clendy. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'clovine Trend for Clen:D' });
});




module.exports = router;
