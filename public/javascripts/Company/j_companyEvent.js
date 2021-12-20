

/**
 * 클로바인 앱 카테고리 메뉴 클릭 이벤트
 * param {e : eventTarget}
 * @created 최성우 2021-09 00:00 최초 개발
 */

function clickCategoriMenu(e) {
    //선택되어있는 메뉴 탭 삭제
    let text_target = document.querySelectorAll('.text-white');
    let select_target = document.querySelectorAll('.select_item');

    if (text_target !== null) {
        for (let i = 0; i < text_target.length; i++) {
            text_target[i].classList.remove('text-white');
        }
    }

    if(select_target !== null) {
        for (let i = 0; i < text_target.length; i++) {
            select_target[i].classList.remove('select_item');
        }
    }

    e.target.classList.add('text-white')
    e.target.closest('tr').classList.add('select_item')
}

/**
 * 카테고리 앱 접고 펼치기
 * param {e : eventTarget}
 * @created 최성우 2021-09 00:00 최초 개발
 */
function clickCategoriShowHidden(e) {
    let arrowBtn = e.target.getAttribute('id');
    let showTarget;
    switch (arrowBtn) {
        case 'clovine_app_categori_arrowbtn':
            showTarget = document.getElementById('clovine_app_categori');
            if(hasClassName(showTarget,'aside_category_hidden')) {
                showTarget.classList.remove('aside_category_hidden');
            } else {
                showTarget.classList.add('aside_category_hidden');
            }
            break;
        default:
            console.log("not find target")
    }
}




