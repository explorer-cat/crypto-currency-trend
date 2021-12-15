/**
 * 사이드 메뉴바 초기화
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */

function initSideBar() {
    //ClovineApp 카테고리 메뉴 클릭 이벤트
    setClovineAppCategoriEvent()

    //카테고리 접기/펼치기 Arrow Btn 클릭 이벤트
    setCategoriShowHidden();
}


/**
 * 사이드 메뉴선택 클릭 이벤트
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */

function setClovineAppCategoriEvent() {

    //카테고리 메뉴 item selecter
    let categori_item = document.querySelectorAll('table tbody tr');

    //
    for(let i = 0; i < categori_item.length; i++) {
        categori_item[i].removeEventListener("click", clickCategoriMenu)
        categori_item[i].addEventListener("click", clickCategoriMenu)
    }
}

/**
 * 사이드 메뉴 카테고리 펼치기/접기 버튼
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */


function setCategoriShowHidden() {

    let categori_arrow_btn = document.querySelectorAll(".fold_category_icon");

    for(let i = 0; i < categori_arrow_btn.length; i++) {
        categori_arrow_btn[i].removeEventListener("click", clickCategoriShowHidden)
        categori_arrow_btn[i].addEventListener("click", clickCategoriShowHidden)
    }
}




