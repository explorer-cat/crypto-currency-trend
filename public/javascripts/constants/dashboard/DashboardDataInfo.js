/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */

// function initCompanyInfo() {
//     setMemberInfo();
// }

// function setMemberInfo() {
//     var ctx = document.getElementById('working_member');

//     var data = [12,19,3,5,2,3];
//     var myChart = new Chart(ctx, {
//         type: 'doughnut',
//         data: {
//        //     labels: ["출근전", "휴식", "외근", "근무중", "퇴근", "출장"],
//             datasets: [{
//                 label: '# of Votes',
//                 data: data,
//                 backgroundColor: [
//                     '#2E2EFE',
//                     '#04B4AE',
//                     '#BF00FF',
//                     '#BDBDBD',
//                     '#0B615E',
//                     '#868A08'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: false,
//             // scales: {
//             //     yAxes: [{
//             //         ticks: {
//             //             beginAtZero: true
//             //         }
//             //     }]
//             // },
//         }
//     });

//     var result = document.getElementById('work_chart_result');

// }

// let socekt;

//     //업비트 비트코인 가격 정보
//     async function getUpbitBitCoinInfo() {
//         let getURL = ""
//         let response;
//         try {
//             if(socket != undefined){
//                 socket.close();
//             }
            
//             socket = new WebSocket("wss://api.upbit.com/websocket/v1");
//             socket.binaryType = 'arraybuffer';
        
//             socket.onopen 	= function(e){ 
//                 filterRequest(`
//                 [
//                     {"ticket": "UNIQUE_TICKET"},
//                     {"type" : "ticker","codes":["KRW-BTC"]},		// "KRW-BTC","KRW-ETH" -> parsing
//                     {"type" : "orderbook","codes":["KRW-BTC"]},
//                     {"type" : "trade","codes":["KRW-BTC"]},
//                 ]`); 
//             }
//             socket.onclose 	= function(e){ 
//                 socket = undefined; 
//             }
//             socket.onmessage= function(e){ 
//                 var enc = new TextDecoder("utf-8");
//                 var arr = new Uint8Array(e.data);
//                 var str_d = enc.decode(arr);
//                 var d = JSON.parse(str_d);

//                 if(d.type == "ticker") { // 현재가 데이터
//                 // TODO
//                 }
//                 if(d.type == "orderbook") { // 호가 데이터
//                 // TODO
//                 }
//                 if(d.type == "trade") { // 체결 데이터
//                 // TODO
//                 }
//                 console.log(d)
//             }
//             // let response = await axios({
//             //     headers : {Accept : 'application/json'},
//             //     url: 'https://api.upbit.com/v1/ticker?markets=KRW-BTC',
//             //     method: 'get',
//             //   });
//               return callback(response.data[0]);
//         } catch (e) {
//             console.error('업비트 정보 불러오기 에러',e);
//             response = {err:true}
//         }
//     }



// // 웹소켓 연결 해제
// function closeWS() {
// 	if(socket != undefined){
// 		socket.close();
// 		socket = undefined;
// 	}	
// }

// // 웹소켓 요청
// function filterRequest(filter) {
// 	if(socket == undefined){
// 		alert('no connect exists');
// 		return;
// 	}
// 	socket.send(filter);
// }

// getUpbitBitCoinInfo();

var socket; // 소켓

// 웹소켓 연결
function getUpbitBitCoinInfo(callback) {
	if(socket != undefined){
		socket.close();
	}
	
	socket = new WebSocket("wss://api.upbit.com/websocket/v1");
	socket.binaryType = 'arraybuffer';

	socket.onopen 	= function(e){ 
		filterRequest(`[
            {"ticket":"UNIQUE_TICKET"},
			{"type":"ticker","codes":["KRW-BTC"]},
			{"type":"orderbook","codes":["KRW-BTC"]},
			{"type":"trade","codes":["KRW-BTC"]}]`); 
	}
	socket.onclose 	= function(e){ 
		socket = undefined; 
	}
	socket.onmessage= function(e){ 
		let enc = new TextDecoder("utf-8");
		let arr = new Uint8Array(e.data);
		let str_d = enc.decode(arr);
		let response = JSON.parse(str_d);

        let result = {
            trade_price : response.trade_price, //현재가
            change : response.change, //RISE : 상승  EVEN : 보합  FALL : 하락
            signed_change_price : response.signed_change_price, //전일 대비 등락율
            acc_trade_volume_24h : response.acc_trade_volume_24h  //24시간 누적 거래량
        }
            
            if(response.type === 'ticker') {
                console.log('ticker', result)
                return callback(result);
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


