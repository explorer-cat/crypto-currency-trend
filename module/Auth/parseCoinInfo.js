
var cheerio = require('cheerio');
var request = require('request');
const { stringify } = require('uuid');



exports.parseUpbitCoin =  async function(req, res, callback) {
    console.log('ddd')
    let url = "https://api.upbit.com/v1/market/all";

    request(url, function(error, response, html){
    
        if (error) {throw error};

        let json = JSON.parse(html)

        console.log(json)

    });

}