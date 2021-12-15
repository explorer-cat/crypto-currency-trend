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
