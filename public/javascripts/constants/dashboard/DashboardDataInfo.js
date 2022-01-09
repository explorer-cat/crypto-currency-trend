/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */



var socket; // 소켓

// 웹소켓 연결


async function getUpbitCoinInfo(callback) {
	//코인 정보 불러오기
	let upbitCoinData = await getUpbitCryptoInfo();
	let upbitCodes = []

	let dataMap = new Map();
	dataMap.set(upbitCoinData.data);

	for(let marketlist of upbitCoinData.data) {
		if(marketlist.market) {
			upbitCodes.push(marketlist.market)

			//marekt 이름을 key값으로 하여 Map 을 만들고 value 를 코인마다 다른 체결 limit 를 부여
			dataMap.set(marketlist.market, [marketlist.korean_name, marketlist.upbit_whale_limit])
		}
	}

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
		    {"type":"trade","codes":${JSON.stringify(upbitCodes)}}]`); 
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
				let result = {};
				let buying_price = response.trade_price * response.trade_volume;

				//response.code 를 통해 dataMap에서 해당 코인의 체결 limit 금액을 가져옴.
				let limit_price = dataMap.get(response.code)[1];

				if(buying_price > limit_price) {
					let korean_name = dataMap.get(response.code)[0]

					result = {
						code : response.code,
						ask_bid :response.ask_bid,
						trade_price : buying_price,
						trade_time : response.trade_time,
						korean_name : korean_name,
					}
					return callback({type : 'trade', data : result})
				} else {
					return callback({type : 'trade', error:true})
				}
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
            el[property].classList.add("down_blue_color")
            el[property].classList.remove("up_red_color")
          }
    } 
}


async function getUpbitCryptoInfo() {
        try{
            let response = await axios({
                url: "/upbit/getUpbitCryptoInfo",
                method: 'GET',
            })
			if(response) {
				return response;
			}
        }catch (e){
            console.error(' isOKAPI 사용 불가능한 api 정보=> ',e)
            response={err: true}
        }
}

async function getUpbitNewListingCoin() {
	try{
		let response = await axios({
			url: "/upbit/getUpbitNewListCoin",
			method: 'POST',
		})
		if(response) {
			console.log(response)
			return response;
		}
	}catch (e){
		console.error(' isOKAPI 사용 불가능한 api 정보=> ',e)
		response={err: true}
	}
}




