function setTime() {
    let date = new Date();
    let sec = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    document.getElementById("clock").innerHTML = "<label style='color: black;font-size: 25pt;'>Время:</label><br/> " + formatDate(hours) + ":" + formatDate(minutes) + ":" + formatDate(sec);
    let time = setTimeout(setTime, 6000);
}

function formatDate(number) {
    return number < 10 ? "0"+number : number;
}

window.addEventListener("load", setTime);

//-----------------------------------------------------------------------------------------------

function createCalendar() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dayOfWeek = date.getDay();
    let nameOfMonth = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь',
    ];
    let numOfMonth = [
        31, 29 ,31 ,30 ,31 ,30 ,31 ,31 ,30 ,31 ,30 ,31
    ];
    document.getElementById("tableCalendar").innerHTML += "<caption>" + nameOfMonth[month-2]+ " " + year + "</caption>";
    document.getElementById("tableCalendar").innerHTML += "<tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>";
    var num = 1;
    var str = "<tr>";
    var start = (day+(7-dayOfWeek))%7;
    for(var k = 1; k <= 7;k++ ) {
        if (k < start) {
            str += "<td></td>";
        }
        else {
            if (num === day) {
                str += "<td style='background: #1b30a7;color: white'>" + num + "</td>";
            } else {
                str += "<td>" + num + "</td>";
            }
            num++;
        }
    }
    str += "</tr>";
    document.getElementById("tableCalendar").innerHTML += str;
    for (var i = 1; i < 5; i++) {
        var week = "<tr>";
        var temp = num + 6;
        for (var j = num; j<=temp; j++) {

            if (j <= numOfMonth[month-1]) {
                if (j === day) {
                    week += "<td style='background: #1b30a7;color: white'>" + j + "</td>";
                } else {
                    week += "<td>" + j + "</td>";
                }
            } else {
                week += "<td></td>"
            }
        }
        week += "</tr>";

        document.getElementById("tableCalendar").innerHTML += week;
        num += 7;
    }

}
