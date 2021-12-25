/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */



window.onload = async function () {
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
        //상승 보합 하락 기준에 따라 view를 다르게 지정합니다.
        //result.change -> RISE : 상승  EVEN : 보합  FALL : 하락

        switch(result.code)  {
            case "KRW-BTC":
                upbitBTC.KRW.innerHTML = `${result.trade_price.toLocaleString()}원`;
                upbitBTC.RATE.innerHTML = `전일대비 ${result.signed_change_rate.toFixed(2)}%`;
                setChangeToColor(result.code, result.change, upbitBTC);
            break;
            case "KRW-ETH":
                document.getElementById('upbit_ETH_krw').innerHTML = `${result.trade_price.toLocaleString()}원`;
                document.getElementById('upbit_ETH_signed_change_rate').innerHTML = `전일대비 ${result.signed_change_rate.toFixed(2)}%`;
                setChangeToColor(result.code, result.change, upbitETH);
                break
            case "KRW-XRP":
                document.getElementById('upbit_XRP_krw').innerHTML = `${result.trade_price.toLocaleString()}원`;
                document.getElementById('upbit_XRP_signed_change_rate').innerHTML = `전일대비 ${result.signed_change_rate.toFixed(2)}%`;
                setChangeToColor(result.code, result.change, upbitXRP);
                break;
        }




    });
}
