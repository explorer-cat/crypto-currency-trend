const config = require('../../config')
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const rp = require('request-promise');
const WebSocket = require('ws');
const express = require('express');
const app = express();
var http = require('http').createServer(app)
const io = require('socket.io')(http,{cors : {origin : "*"}})


http.listen(3330, () => {
  console.log('start server')
})


//업비트 고래 체결량 확인 module
exports.getUpbitWhale =  async function(req, res, callback) {

  try {


  //   io.sockets.on('connection', function (socket) {
  //     console.log('connect')
  //    if(socket) {
  //      console.log('connect!')
  //      socket.send('hi');
  //    }
  //  });
 
    io.sockets.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });

    var ws = new WebSocket('wss://api.upbit.com/websocket/v1');



   // console.log('test', test)

    ws.on('open', ()=>{
        ws.send(`[
          {"ticket":"UNIQUE_TICKET"},
          {"type":"trade","codes":["KRW-BTC","KRW-ETH","KRW-XRP"]}]`)
    })  
    ws.on('close', ()=>{
        console.log('trade websocket is closed');
    })  
    // setInterval(async () => {
      ws.on('message', (data)=>{
        try {
            var str = data.toString('utf-8')
            var response = JSON.parse(str)
            //매수 혹은 매도 물량이 1천만원 이상일 경우
            let buying_price = response.trade_price * response.trade_volume;

            let result = {
              error : false,
              price : buying_price
            }
            if(buying_price > 30000) {
            //  await clientSocket.emit('message', 'zz');
                console.log(buying_price)
                //                ws.close();
             // return callback(result);
            } 

            //   trades[json.cd] = json
        } catch (e) {
            console.log(e)
        }
    })
    // },1000)


  } catch(e) {

  }
}

//1초간 반복 하면서 로직에 일치할 경우 callback 계속 시켜줘서 프론트에 뿌려줘야함.