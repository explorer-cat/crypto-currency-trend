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
                getUpbitWhaleTrade(result)
            break;
        }
    });
}

//업비트 고래 매수/매도 체결 
function getUpbitWhaleTrade(result) {
    let data = result.data;
    let buying_price = data.trade_price * data.trade_volume;

    //비트코인
    if(buying_price > 10000000) {
        let change;
        //upbit_whale_alert card_title font-20b flex flex-a-center
        let target = document.getElementById('upbit_whale_alert');
        var div = document.createElement("div");
        div.classList.add('flex','card_title','font-12b');
        console.log(data)
        if(data.change === 'FALL') {
            div.classList.remove('up_red_color');
            div.classList.add('down_blue_color');
            change = '매도'
        } else {
            div.classList.remove('down_blue_color');
            div.classList.add('up_red_color');
            change = '매수'
        }
        //axios 
        //해당 내역은 24시간 통계를 위해 백엔드로 넘겨서 DB에 저장하고 통계 제공할것.

     
        div.innerText = `[${change}] 비트코인 ${buying_price.toLocaleString(undefined, {maximumFractionDigits: 0})} 원`
        target.prepend(div);
    }
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
