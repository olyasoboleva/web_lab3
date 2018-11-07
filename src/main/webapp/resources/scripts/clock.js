function setTime() {
    let date = new Date();
    let sec = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    document.getElementById("clock").innerHTML = "Дата: " + formatDate(day) + "." + formatDate(month) + "." + year
        + "<br/>Время: " + formatDate(hours) + ":" + formatDate(minutes) + ":" + formatDate(sec);
    let time = setTimeout(setTime, 6000);
}

function formatDate(number) {
    return number < 10 ? "0"+number : number;
}

window.addEventListener("load", setTime);

