
var cheerio = require('cheerio');
var request = require('request');
const { stringify } = require('uuid');
var setting = require('../../setting');





exports.parseUpbitCoin =  async function(req, res, callback) {
    let upbit_coin_list = new Map()

    for await (let list of setting.listing) {
       /// console.log(list.korean_name)
        upbit_coin_list.set(list.market, list.korean_name)
    }
    return callback(upbit_coin_list);
    //console.log(upbit_coin_list)
   // let url = "https://api.upbit.com/v1/market/all";

}