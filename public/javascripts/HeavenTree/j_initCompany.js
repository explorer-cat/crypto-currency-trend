/**
 * 사이드 메뉴바 초기화
 *
 * @created 최성우 2021-09 00:00 최초 개발
 */

function initCompanyInfo() {

    setMemberInfo();

}

function setMemberInfo() {
    var ctx = document.getElementById('working_member');

    var data = [12,19,3,5,2,3];
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
       //     labels: ["출근전", "휴식", "외근", "근무중", "퇴근", "출장"],
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    '#2E2EFE',
                    '#04B4AE',
                    '#BF00FF',
                    '#BDBDBD',
                    '#0B615E',
                    '#868A08'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            // scales: {
            //     yAxes: [{
            //         ticks: {
            //             beginAtZero: true
            //         }
            //     }]
            // },
        }
    });

    var result = document.getElementById('work_chart_result');



}





