var express = require('express');
const Upbit = require('../module/upbit/upbit');
var router = express.Router();
const axios = require("axios");
const WebSocket = require('ws');


router.get('/getUpbitCryptoInfo', async function(req, res, next) {
  try {
      await Upbit.getAllCoinInfo(req, res, function (result) {
        if(result) {
          res.send(result);  
        }
      })
  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})



router.get('/getUpbitMesuMedo', async function(req, res, next) {
  try {
      await Upbit.getUpbitMesuMedo(req, res, function (result) {
        if(result) {
          res.send(result);  
        }
      })
  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})


router.post('/getUpbitNewListCoin', async function(req, res, next) {
  try {
      await Upbit.getUpbitNewListCoin(req, res, function (result) {
        if(result) {
          res.send(result);  
        }
      })
  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})

router.get('/getBitcoinDominance', async function(req, res, next) {
  try {
      await Upbit.getBitcoinDominance(req, res, function (result) {
        if(result) {
          res.send(result);  
        }
      })
  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})



module.exports = router;
