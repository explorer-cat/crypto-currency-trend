var express = require('express');
const { response } = require('../app');
const Auth = require('../module/Auth/authorization');
var router = express.Router();
const axios = require("axios");
const WebSocket = require('ws');


//  res.send(upbit.getUpbitJWT(function (result){
/* clendy. */
router.get('/', function(req, res, next) {
  try {
    res.render('actual', { title: 'Express'});
  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})



router.post('/getUpbitWhale', function(req, res, next) {
  try {
      Auth.getUpbitWhale(req, res, function (result) {
        res.send(result);
      })
  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})

module.exports = router;
