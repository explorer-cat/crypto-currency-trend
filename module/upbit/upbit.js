const { list } = require('pm2');
const setting = require('../../setting')

//업비트 모든 코인

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


/*업비트 크롤링*/
exports.getUpbitMesuMedo = function(req,res,callback) {
  return callback({data:'data!!'})
}

