const { list } = require('pm2');
const setting = require('../../setting')
const axios = require("axios");
var request = require("request");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const charset = require('charset');
const sanitizeHtml = require('sanitize-html');
const puppeteer = require('puppeteer');



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
}




exports.getBitcoinDominance = async function(req,res,callback) {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    // 수집하고자 하는 URL을 입력
    await page.goto('https://kr.tradingview.com/symbols/CRYPTOCAP-BTC.D/');

    let content = await page.content();

    const $ = cheerio.load(content, {decodeEntities: true});
   // const res = sanitizeHtml()
    // CSS선택자로 데이터를 수집
    const selector = 'header .tv-category-header__content .quote-ticker-inited .tv-category-header__main-price .tv-category-header__main-price-content span:first-child'
    let res = sanitizeHtml($(selector), {
        parser: {
          decodeEntities: true
        }
      });

    res = res.replace("</span><span>","(")
    res = res.replace("</span><span>마켓오픈</span>",")")
    res = res.replace("<span>","")

    console.log("res", res)
    page.close();
    
    return callback(res)
  } catch(e) {
    console.error('getUpbit Error', e)
  }

}


/*업비트 크롤링*/
exports.getUpbitNewListCoin = async function(req,res,callback) {
  try {

    // conn.connect();
    // let [rows] = conn.query("SELECT * FROM coin-trend")
    // console.log(rows)

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
    
    if(!response.data || response.data.length <= 0) {
      console.error('[getUpbitNewListCoin] response.data undefined')
      return callback({success : false});
    }

    return callback(response.data)
  } catch(e) {
    console.error('getUpbit Error', e)
  }
//https://upbit.com/trends
}
