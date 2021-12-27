const config = require('../../config')
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const rp = require('request-promise');
const WebSocket = require('ws');

//업비트 고래 체결량 확인 module
exports.getUpbitWhale =  async function(req, res, callback) {
  try {

    var ws = new WebSocket('wss://api.upbit.com/websocket/v1');
    ws.on('open', ()=>{
        console.log('trade websocket is connected')
        ws.send(`[
          {"ticket":"UNIQUE_TICKET"},
          {"type":"trade","codes":["KRW-BTC"]}]`)
    })  
    ws.on('close', ()=>{
        console.log('trade websocket is closed');
    })  
    ws.on('message', (data)=>{
        try {
            var str = data.toString('utf-8')
            var response = JSON.parse(str)

            console.log(response.trade_volume)
            console.log(response.trade_price * response.trade_volume)

            let trade_result = {
              code : response.code,
              trade_price : response.trade_price,
              trade_volume : response.trade_volume,
              ask_bid : response.ask_bid
            }
            


            //   trades[json.cd] = json
        } catch (e) {
            console.log(e)
        }
    })

  } catch(e) {

  }
}

//1초간 반복 하면서 로직에 일치할 경우 callback 계속 시켜줘서 프론트에 뿌려줘야함.