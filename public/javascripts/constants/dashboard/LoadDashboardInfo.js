/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */


window.onload = async function () {
    await test();

    var socket =  io.connect('http://localhost:3330');
    socket.on('message', function (message) {
      console.log(message);
    });

    //var socket = io.connect('http://localhost:80')
 
//    socket.on('message' , function(data) {
//        console.log(data);
//    })



    // function connectToServer(host, port) {
    //     var url = 'http://localhost:3000/';
    //     var options = {
    //         forceNew: true
    //     };
    //     socket = io.connect(url, options);

    //     socket.on('connect', function() {
    //         println('웹소켓 서버에 연결됨.' + url);
    //     });
    //     socket.on('disconnect', function() {
    //         println('웹소켓 서버 종료됨.');
    //     });

    //     socket.on('message', function(message) {
    //         $('#results').append('<p>' + JSON.stringify(message) + '</p>');
    //     });

    //     socket.on('response', function(input) {
    //         println('응답 -> ' + JSON.stringify(input));
    //     });
    // }
    //소켓 연결!
    


    //test();
    async function test() { 
        try {
            let response = await axios({
                url            : '/getUpbitWhale',
                method         : 'POST',
                withCredentials: true,
            });
            if(response) {

            }
        } catch (e) {
            console.log(e)
        }
    }





    //가격 , 등락률 , 등락가격
    let upbitBTC = {
        "KRW" : document.getElementById('upbit_BTC_krw'),
        "RATE" : document.getElementById('upbit_BTC_signed_change_rate'),
    }

    let upbitETH = {
        "KRW" : document.getElementById('upbit_ETH_krw'),
        "RATE" : document.getElementById('upbit_ETH_signed_change_rate'),
    }

    let upbitXRP = {
        "KRW" : document.getElementById('upbit_XRP_krw'),
        "RATE" : document.getElementById('upbit_XRP_signed_change_rate'),
    }



    //가공된 업비트 비트코인 정보를 받아옵니다.
    getUpbitCoinInfo(async function (result) {
        switch(result.code)  {
            case "KRW-BTC":
                upbitBTC.KRW.innerHTML = `${result.trade_price.toLocaleString()}원`;
                upbitBTC.RATE.innerHTML = `전일대비 ${result.signed_change_rate.toFixed(2)}%`;

                document.getElementById('upbit_BTC_acc_trade_volume_24h').innerHTML = `24시간 거래량 : ${covertToKRW(result.acc_trade_volume_24h)} BTC`; 

                //상승 보합 하락 기준에 따라 view를 다르게 지정합니다.
                setChangeToColor(result.change, upbitBTC);
            break;
            case "KRW-ETH":
                upbitETH.KRW.innerHTML = `${result.trade_price.toLocaleString()}원`;
                upbitETH.RATE.innerHTML = `전일대비 ${result.signed_change_rate.toFixed(2)}%`;
                document.getElementById('upbit_ETH_acc_trade_volume_24h').innerHTML = `24시간 거래량 : ${covertToKRW(result.acc_trade_volume_24h)} ETH`; 

                //상승 보합 하락 기준에 따라 view를 다르게 지정합니다.
                setChangeToColor(result.change, upbitETH);
                break
            case "KRW-XRP":
                upbitXRP.KRW.innerHTML = `${result.trade_price.toLocaleString()}원`;
                upbitXRP.RATE.innerHTML = `전일대비 ${result.signed_change_rate.toFixed(2)}%`;
                document.getElementById('upbit_XRP_acc_trade_volume_24h').innerHTML = `24시간 거래량 : ${covertToKRW(result.acc_trade_volume_24h)} XRP`; 

                //상승 보합 하락 기준에 따라 view를 다르게 지정합니다.
                setChangeToColor(result.change, upbitXRP);
                break;
        }
    });
}
