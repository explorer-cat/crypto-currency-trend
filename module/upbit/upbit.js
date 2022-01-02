const { list } = require('pm2');
const setting = require('../../setting')

//업비트 모든 코인

// return new Promise(async function (resolve, reject) {
//   await jwt.verify(token, config.tokenPublicKey, {algorithms: ['RS256']}, function (err, decoded) {
//       if (err) {
//           console.error(err)
//           resolve({err:true});
//       } else {
//           resolve({err:false,value:decoded});
//       }
//   });
// });

exports.getAllCoinInfo =  function(req,res,callback) {
  try {
      let list = setting.listing;
      let result = [{}];
      let newArray = list.map((data,index) =>{
        if(data.market.indexOf('KRW') !== -1) {
          result.push(data);
        }
      })
      return callback(result)
  } catch (e) {
    console.log(e)
    return callback({error:false})
  }
}



