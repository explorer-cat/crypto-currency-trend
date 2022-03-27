let whaleAleartCount = 0;

/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */


window.onload = async function () {
    //가격 , 등락률 , 등락가격

    //가공된 업비트 비트코인 정보를 받아옵니다.
    getUpbitCoinInfo(async function (result) {

        switch(result.type)  {
            case "ticker" :
                getBestCoinInfo(result);
            break;
            case "trade":
                if(!result.error) {
                    getUpbitWhaleTrade(result)
                } 
            break;
        }
    });

    getUpbitNewListingCoin();

    //도미넌스 파싱 20초마다 실행
    getBTCdominance = setInterval(function() {
        getBitcoinDominance();
     }, 20000);


    
//    setTimeout("getBitcoinDominance()" , 3000)

    //업비트 일별 매수/매도 체결량 크롤링

}

//업비트 고래 매수/매도 체결 
function getUpbitWhaleTrade(result) {
        let change;
        let data = result.data;
        let buying_price = data.trade_price * data.trade_volume;
        let target = document.getElementById('upbit_whale_alert');
        let date = ConvertDateTime(new Date());


        //출력건의 대한 코인 아이콘 지정
        let alert_icon = document.createElement("div");
        alert_icon.classList.add('bitcoin_icon')
        alert_icon.classList.add('margin-r-4')
        alert_icon.style.marginTop = '2px'

        //출력건의 대한 Text 정보 출력
        var alert_div = document.createElement("div");

        alert_div.classList.add('flex','card_title','font-1b','padding-tb-8');

        if(data.ask_bid === 'BID') {
            alert_div.classList.remove('down_blue_color');
            alert_div.classList.add('up_red_color');
            change = '매수'
        } else {
            alert_div.classList.remove('up_red_color');
            alert_div.classList.add('down_blue_color');
            change = '매도'
        }

        //홀수 출력건에 대해서 백그라운드 컬러를 지정한다.
        if(whaleAleartCount % 2 === 0) {
            alert_icon.style.backgroundColor = 'gray';
            alert_div.style.background = 'gray'
        }
        data.trade_price = data.trade_price / 100000000;
        //axios //${data.trade_price.toLocaleString(undefined, {maximumFractionDigits: 1})}
        //해당 내역은 24시간 통계를 위해 백엔드로 넘겨서 DB에 저장하고 통계 제공할것.
        alert_div.innerText = `${data.korean_name} 체결가 ${data.buying_price.toLocaleString()} 원 ${data.trade_price.toLocaleString(undefined, {maximumFractionDigits: 1})}억 ${data.trade_time}`

        document.getElementById('whale_update_time').innerHTML = 'last update : '+date.all

        //체결 금액 출력
        target.prepend(alert_div);
        //체결 금액 앞에 아이콘 삽입
        alert_div.prepend(alert_icon);

        //홀수 출력에 대해서는 background color를 삽입한다.
        whaleAleartCount++;
    }



//메인 페이지 최상단 상위 코인 가격정보
function getBestCoinInfo(result) {
    let data = result.data;
    
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

    switch(data.code) {
        case "KRW-BTC" :
            upbitBTC.KRW.innerHTML = `${data.trade_price.toLocaleString()}원`;
            upbitBTC.RATE.innerHTML = `전일대비 ${(data.signed_change_rate * 100).toFixed(2)}%`;
    
            document.getElementById('upbit_BTC_acc_trade_volume_24h').innerHTML = `24시간 거래량 : ${covertToKRW(data.acc_trade_volume_24h)} BTC`; 
    
            //상승 보합 하락 기준에 따라 view를 다르게 지정합니다.
            setChangeToColor(data.change, upbitBTC);
            break;
        case "KRW-ETH" :
            upbitETH.KRW.innerHTML = `${data.trade_price.toLocaleString()}원`;
            upbitETH.RATE.innerHTML = `전일대비 ${(data.signed_change_rate * 100).toFixed(2)}%`;
            document.getElementById('upbit_ETH_acc_trade_volume_24h').innerHTML = `24시간 거래량 : ${covertToKRW(data.acc_trade_volume_24h)} ETH`; 

                //상승 보합 하락 기준에 따라 view를 다르게 지정합니다.
            setChangeToColor(result.change, upbitETH);
            break;
        case "KRW-XRP" :
            upbitXRP.KRW.innerHTML = `${data.trade_price.toLocaleString()}원`;
            upbitXRP.RATE.innerHTML = `전일대비 ${(data.signed_change_rate * 100).toFixed(2)}%`;
            document.getElementById('upbit_XRP_acc_trade_volume_24h').innerHTML = `24시간 거래량 : ${covertToKRW(data.acc_trade_volume_24h)} XRP`; 
        
                        //상승 보합 하락 기준에 따라 view를 다르게 지정합니다.
            setChangeToColor(data.change, upbitXRP);
            break;
    }
}


async function getUpbitMesuMedo() {
    try{
        let response = await axios({
            url: "/upbit/getUpbitMesuMedo",
            method: 'POST',
        })
        if(response) {
            console.log('this is getUpbitMesuMedo Response', response)
                //받아온 크롤링 데이터를 HTML 에 표현하세요.

        } else {
            console.error('response data is null')
        }
    }catch (e){
        console.error(' isOKAPI 사용 불가능한 api 정보=> ',e)
        response={err: true}
    }
}



async function getBitcoinDominance() {
    try{
        let response = await axios({
            url: "/upbit/getBitcoinDominance",
            method: 'GET',
        })
        let target = document.getElementById("BTC_dominance");
        if(response) {
            if(response.data.indexOf("+")) {
                target.style.color = "red";
                target.innerHTML = response.data + "%";
            } else {
                target.style.color = "blue";
                target.innerHTML = response.data + "%";
            }
        } else {
            console.error('response data is null')
        }
    }catch (e){
        console.error(' isOKAPI 사용 불가능한 api 정보=> ',e)
        response={err: true}
    }
}



