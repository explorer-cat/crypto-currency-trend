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

/**
 * 날짜 시간 변환 함수
 *
 * @param   Modified    Date
 * @returns {{all: string, date: string, time: string}}
 */
 function ConvertDateTime(Modified) {
    Modified = new Date(Modified);
    let m = moment(Modified);

    let time = "";
    if (Modified.getHours() < 12) {
        time = '오전';
    }
    else {
        time = '오후';
    }

    let convertedDate = m.format("YYYY-MM-DD");
    let convertedTimeHMS = time + m.format(" " + "hh:mm:ss");
    let convertedTimeHM = time + m.format(" " + "hh:mm");

    return {all: convertedDate + " " + convertedTimeHMS, date: convertedDate, timeHMS: convertedTimeHMS, timeHM: convertedTimeHM};
}
//숫자단위를 화폐단위로 변환하는 함수
function ConvertNumberToCurrency(Num) {
    let Currency = parseFloat(parseFloat(Num.toString()).toFixed(2)).toString();
    let location = Num.toString().indexOf('.');

    if (location === -1) {
        location = Num.toString().length;
    }

    for (let i = 0; i < location; i++) {
        if (((i + 1) % 3) === 0 && i !== location - 1) {
            Currency = [Currency.slice(0, location - 1 - i), ',', Currency.slice(location - 1 - i)].join('');
        }
    }

    return Currency;
};
