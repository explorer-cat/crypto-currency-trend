/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */

window.onload = async function () {

    //업비트 고래 체결 시작
    try {
        response = await axios({
            url            : '/getUpbitWhale',
            method         : 'POST',
            withCredentials: true,
        });
    } catch (e) {
        console.log(e)
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
