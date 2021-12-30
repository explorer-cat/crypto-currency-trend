var express = require('express');
const Auth = require('../module/Auth/parseCoinInfo');
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



router.get('/getUpbitListingCoin', async function(req, res, next) {
  try {
      await Auth.parseUpbitCoin(req, res, function (result) {
        if(result) {
          res.json(result);   
        }
      })
  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})

module.exports = router;
