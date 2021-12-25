const config = require('../../config')

//업비트 모든 코인
exports.getAllCoinInfo =  function(callback) {
  let JWT_list = {
    "upbitJWT" : "",
    "bithumbJWT" : "", 
    "error_api" : "",
    "error" : false,
  }
  try {
    return new Promise(resolve => {
      getUpbitJWT(function(result) {
        if(result) {
          JWT_list.upbitJWT = result;
        } else {
          JWT_list.error_api = "upbit"
          JWT_list.error = true;
          return callback(JWT_list)
        }
      })    
    return callback(JWT_list);
    })
  } catch (e) {
    console.log(e)
    JWT_list = {"error_api" : "UNKNOWN","error" : true,}
    return callback(JWT_list)
  }
}


const getUpbitJWT = (callback) => {
    const payload = {
    //onfig.upbitAPI.access_key
      access_key: config.upbitAPI.access_key,
      nonce: uuidv4(),
    };

    const jwtToken = jwt.sign(payload, "1xw9NYGFO1QEu8CMcKjQiYx7w1OR0fe6xkubxtLP");
    const authorizationToken = `Bearer ${jwtToken}`;
    return callback(authorizationToken);
}
