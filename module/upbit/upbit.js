const { list } = require('pm2');
const setting = require('../../setting')
const axios = require("axios");
var request = require("request");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const charset = require('charset');
const sanitizeHtml = require('sanitize-html');

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



/*업비트 크롤링*/
exports.getUpbitNewListCoin = async function(req,res,callback) {
  try {
    let response = await axios.request({
      method: "GET",
      url: "https://s3.ap-northeast-2.amazonaws.com/crix-production/crix_master",
      responseType: "arraybuffer",
      responseEncoding: "binary" 
    });

    if(response.status !== 200) {
      console.error('[getUpbitNewListCoin] 정보를 불러오던중 문제가 발생했습니다.')
      return callback({success : false});
    } 
    else { 
      return callback(response.data);
    }
      // const enc = charset(response.headers, body) // 해당 사이트의 charset값을 획득
      // console.log('utf8', enc)
			// const i_result = iconv.decode(body, enc) // 획득한 charset값으로 body를 디코딩
			// console.log(i_result)

      // const decodedResult = await iconv.decode(body, 'utf8'); //iconv를 이용하여 해당 사이트의 인코딩 방식으로 body를 디코드
      // console.log(decodedResult); //디코드 결과를 콜백

      // const $ = cheerio.load(decodedResult);
      // const $articleList = $('html').children('body').text()
      // console.log($articleList)
    // })



  } catch(e) {
    console.error('getUpbit Error', e)
  }
//https://upbit.com/trends
}
