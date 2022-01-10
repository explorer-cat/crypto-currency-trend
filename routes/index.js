var express = require('express');
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



module.exports = router;
