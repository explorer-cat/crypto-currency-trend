/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */


var socket; // 소켓

// 웹소켓 연결


async function getUpbitCoinInfo(callback) {
	if(socket != undefined){
		socket.close();
	}
	
	socket = new WebSocket("wss://api.upbit.com/websocket/v1");
	socket.binaryType = 'arraybuffer';

	socket.onopen 	= function(e){ 
		//소켓이 연결되면 
		
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



		switch(response.type) {
			case 'ticker':
				return callback({type : 'ticker', data : response});	
			break;
			case 'trade' :
				return callback({type : 'trade', data : response})
		}
        //      if(response.type === 'ticker') {
        //     } else if (response.ty)
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
            el[property].classList.add("down_blue_color")
            el[property].classList.remove("up_red_color")
          }
    } 
}




