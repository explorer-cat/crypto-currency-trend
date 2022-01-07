const { list } = require('pm2');
const setting = require('../../setting')
const axios = require("axios");
const cheerio = require("cheerio");

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
exports.getUpbitMesuMedo = async function(req,res,callback) {
  try {
   await axios.get("https://upbit.com/trends").then(data => {
     console.log(data)
   })

  } catch(e) {
    console.error('getUpbit Error', e)
  }
//https://upbit.com/trends
}

// getUpbitMesuMedo().then(html => {
//   let ulList = [];
//   const cheerio = cheerio.load(html.data);
//   console.log('cheerio', cheerio)
// })