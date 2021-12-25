/**
 * 첫 대시보드 화면 로딩시 보여주는 데이터 캐싱 js
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */

window.onload = async function () {

    //가공된 업비트 비트코인 정보를 받아옵니다.
    getUpbitBitCoinInfo(async function (result) {
        document.getElementById('upbit_bitcoin_krw').innerHTML = result.trade_price;
        document.getElementById('upbit_bitcoin_signed_change_price').innerHTML = result.signed_change_price;
    });


}
