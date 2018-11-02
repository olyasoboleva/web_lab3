var form = document.querySelector('.form');
var y_form = form.querySelector('.input_Y');
var r_form = form.querySelector('.input_R');
var x_form = form.querySelector('.x_input');

var generateError = function (text) {
    var error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = text;
    return error;
};

var removeValidation = function () {
    var errors = form.querySelectorAll('.error');
    for (var i = 0; i < errors.length; i++) {
        errors[i].parentElement.removeChild(errors[i]);
    }
};

function validate_R() {
    var form = document.querySelector('.form');
    var r_form = form.querySelector('.input_R');
    var check = true;
    removeValidation();
    if (r_form.value.indexOf(",") !== -1) {
        r_form.value = r_form.value.replace(",",".");
    }
    if (!r_form.value || r_form.value <= 1 || r_form.value >= 4 || isNaN(r_form.value) || r_form.value.charAt(0).localeCompare(".") === 0) {
        var error = generateError('Некорректно задано значение R. R ∈ (1;4). R должно быть числом.');
        r_form.parentElement.insertBefore(error, null);
        check = false;
    }
    return check;
}

function validate() {
    var check_Y = true;
    var point = false;
    var point_r = false;
    removeValidation();
    if (y_form.value.indexOf(",") !== -1) {
        y_form.value = y_form.value.replace(",",".");
        point = true;
    }
    if (r_form.value.indexOf(",") !== -1) {
        r_form.value = r_form.value.replace(",",".");
        point_r = true;
    }
    var check_r = validate_R();
    if (!y_form.value || y_form.value <= -5 || y_form.value >= 5 || isNaN(y_form.value) || y_form.value.charAt(0).localeCompare(".") === 0) {
        var error = generateError('Некорректно задано значение Y. Y ∈ (-5;5). Y должно быть числом.');
        y_form.parentElement.insertBefore(error, null);
        check_Y = false;
    }

    if (check_r && check_Y) {
        drawCanvas('canvas', r_form.value);
        drawPoint( x_form.value, y_form.value, r_form.value, 4);
        if (point) {
            y_form.value = y_form.value.replace(".",",");
        }
        if (point_r) {
            r_form.value = r_form.value.replace(".",",");
        }
        form.submit();
        return true;
    } else return false;
}



//------------canvas-------------

function drawCanvas(id, r){
    var canvas = document.getElementById(id),
        context = canvas.getContext("2d");
//очистка
    context.clearRect(0, 0, canvas.width, canvas.height);
//треугольник
    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(150, 85);
    context.lineTo(280,150);
    context.lineTo(150, 150);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

//прямоугольник
    context.beginPath();
    context.rect(20, 150, 130, 130);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

//сектор
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 65, Math.PI, Math.PI*3/2, false);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

//отрисовка осей
    context.beginPath();
    context.font = "12px Verdana";
    context.moveTo(150, 0); context.lineTo(150, 300);
    context.moveTo(150, 0); context.lineTo(145, 12);
    context.moveTo(150, 0); context.lineTo(155, 12);
    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();

    context.beginPath();
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150);
    context.lineTo(300, 150);
    context.moveTo(300, 150);
    context.lineTo(288, 145);
    context.moveTo(300, 150);
    context.lineTo(288, 155);
    context.fillText("X", 290, 135);
    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();

//деления X
    context.beginPath();
    context.moveTo(145, 20);
    context.lineTo(155, 20);
    context.moveTo(145, 85);
    context.lineTo(155, 85);
    context.moveTo(145, 215);
    context.lineTo(155, 215);
    context.moveTo(145, 280);
    context.lineTo(155, 280);
    if (r==0){
        context.fillText("R", 160, 25);
        context.fillText("R/2", 160, 90);
        context.fillText("-R/2", 160, 220);
        context.fillText("-R", 160, 285);
    } else {
        context.fillText(r, 160, 25);
        context.fillText((r / 2), 160, 90);
        context.fillText(-(r / 2), 160, 220);
        context.fillText(-r, 160, 285);
    }

//деления Y
    context.moveTo(20, 145);
    context.lineTo(20, 155);
    context.moveTo(85, 145);
    context.lineTo(85, 155);
    context.moveTo(215, 145);
    context.lineTo(215, 155);
    context.moveTo(280, 145);
    context.lineTo(280, 155);
    if (r==0){
        context.fillText("-R", 12, 140);
        context.fillText("-R/2", 70, 140);
        context.fillText("R/2", 205, 140);
        context.fillText("R", 275, 140);
    } else {
        context.fillText(-r, 12, 140);
        context.fillText(-(r / 2), 70, 140);
        context.fillText((r / 2), 205, 140);
        context.fillText(r, 275, 140);
    }

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
}

function createCanvas(id, x, y, r){
    drawCanvas(id, r);
    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130))-2, Math.round(150 - ((y / r) * 130))-2, 4, 4);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.fill();
    context.stroke();
}

function clickCanvas(){
    var canvas = document.getElementById('canvas');
    var br = canvas.getBoundingClientRect();
    var left = br.left;
    var top = br.top;
    var event = window.event;
    var x = event.clientX-left;
    var y = event.clientY-top;
    document.getElementById("R").value = document.getElementById("R").value.replace(",",".");
    var r = document.getElementById("R").value;
    var size = canvas.height;
    if (validate_R()) {
        x = Math.round((x - size / 2) * r * 10 / 2 / 65) / 10;
        y = Math.round((-y + size / 2) * r * 10 / 2 / 65) / 10;
        drawCanvas('canvas',r);
        document.getElementById("Y").value = y;
        checkX(x);
        drawPoint(x, y, r, size);
        document.getElementById('button').click();
    }
}

function drawPoint(x,y,r){
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(150+x*130/r,150-y*130/r,2,0,2*Math.PI);
        ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
/*
function isArea(x, y, r) {
    x = 150+x*130/r;
    y = 150-y*130/r;
    if (
        ((x >= 0) && (y <= 0) && (y >= -r)  && (x <= r)) ||
        ((x <= 0) && (y >= 0) && ((x * x + y * y) <= (r * r))) ||
        ((x <= 0) && (y <= 0) && (y <= (r / 2) * x + r))  // и тут тоже треугольник надо
    ) {
        return 'true';
    }
    return 'false';

}*/