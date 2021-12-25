var express = require('express');
const { response } = require('../app');
const Auth = require('../module/Auth/authorization');
var router = express.Router();

//  res.send(upbit.getUpbitJWT(function (result){
/* clendy. */
router.get('/', function(req, res, next) {

  try {
    let guestID = req.cookies.guestID
    let apiID = req.cookies.apiID


    //게스트 ID 발급
    if(req.cookies && !guestID) {
      res.cookie("guestID",'123');
    }

    //UPBIT API ID 발급
    if(req.cookies && !apiID) {
      res.send(Auth.getAuth(function(result) {
        if(!result.error && result.upbitJWT) {
           res.cookie("apiID",result.upbitJWT);
        } else {
          console.debug('[ROUTER] [index.js] not find upbit JWT')
        }
      })
    )}

    if(guestID && apiID) {
      res.render('dashboard', { title: 'Express'});
    } else {
      console.debug('[index.js] not has guestID or apiID')
    }

  } catch (e) {
    console.debug('[ROUTER] [index.js] ', e)
    res.send(null);
  }
})

module.exports = router;
