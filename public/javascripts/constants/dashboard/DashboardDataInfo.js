/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */


var socket; // 소켓

// 웹소켓 연결
function getUpbitCoinInfo(callback) {
	if(socket != undefined){
		socket.close();
	}
	
	socket = new WebSocket("wss://api.upbit.com/websocket/v1");
	socket.binaryType = 'arraybuffer';

	socket.onopen 	= function(e){ 
		filterRequest(`[
            {"ticket":"UNIQUE_TICKET"},
			{"type":"ticker","codes":["KRW-BTC","KRW-ETH","KRW-XRP"]},
		    {"type":"trade","codes":["KRW-BTC"]}]`); 
	}
	socket.onclose 	= function(e){ 
		socket = undefined; 
	}
	socket.onmessage= async function(e){ 
		let enc = new TextDecoder("utf-8");
		let arr = new Uint8Array(e.data);
		let str_d = enc.decode(arr);
		let response = JSON.parse(str_d);

		//main_coin_ticker
        let ticker_result = {
            code : response.code,
            trade_price : response.trade_price, //현재가
            change : response.change, //RISE : 상승  EVEN : 보합  FALL : 하락
            signed_change_price : response.signed_change_price, //전일 대비 등락가격
            acc_trade_volume_24h : response.acc_trade_volume_24h,  //24시간 누적 거래량
            signed_change_rate : response.signed_change_rate * 100 //부호 있는 전일 등락률
        }

            if(response.type === 'ticker') {
                return callback(ticker_result);
            } 
		}
	}	

// 웹소켓 연결 해제
function closeWS() {
	if(socket != undefined){
		socket.close();
		socket = undefined;
	}	
}

// 웹소켓 요청
function filterRequest(filter) {
	if(socket == undefined){
		alert('no connect exists');
		return;
	}
	socket.send(filter);
}
/**
 * 전일 대비 상승,보합,하락에 따라 document의 색상을 변경해주는 함수
 * RISE : 상승  EVEN : 보합  FALL : 하락
 * 
 * @created 최성우 2021-12-26 
 * @param change <string> RISE : 상승  EVEN : 보합  FALL : 하락
 * @param el <object> 색상을 변경할 element 
 */

function setChangeToColor(change,el) {
    if(change === "RISE") {
        for (const property in el) {
            el[property].classList.add("up_red_color")
            el[property].classList.remove("down_blue_color")
          }
    } else {
        for (const property in el) {
			console.log(el[property])
            el[property].classList.add("down_blue_color")
            el[property].classList.remove("up_red_color")
          }
    } 
}




