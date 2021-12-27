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



router.post('/getUpbitWhale', async function(req, res, next) {
  try {
      console.log('/getUpbitWhale!!');
      await Auth.getUpbitWhale(req, res, function (result) {
        if(result) {
          console.log('router', result)
          res.send(result);   
        }
      })

  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})

module.exports = router;
