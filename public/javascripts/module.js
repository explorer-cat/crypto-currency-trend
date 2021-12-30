/**
 * target element 의 className 존재 여부 확인
 * param {e : eventTarget}
 * @created 최성우 2021-09 00:00 최초 개발
 */
function hasClassName(target,keyword) {
    //키워드가 배열일경우,

    //키워드가 1개일 경우
    if(target.classList.contains(keyword)) {
        return true;
    } else {
        return false;
    }
}


/**
 * 소수점을 제외시키고 정수를 , 찍는 (KRW) ? 표현방식으로 변환
 * param {target}
 * @created 최성우 2021-12-26 00:00 최초 개발
 */

function covertToKRW(target) {
    return target.toLocaleString(undefined,{minimumFractionDigits: 0,maximumFractionDigits: 0})
}


/*업비트 리스팅 코인 파싱*/
function parseUpbitListingCoin() {

}