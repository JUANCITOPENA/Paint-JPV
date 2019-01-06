$(document).ready(start);
var draw;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 10;
var minRadius = 2;
var maxRadius = 30;
save();

function pincelSize() {
    $('#increase').click(function() {
        radius = radius + 2;
        if (radius >= maxRadius) {
            radius = maxRadius;
        }
        $('#pincelval').text(radius);
    });
    $('#decrease').click(function() {
        radius = radius - 2;
        if (radius <= minRadius) {
            radius = minRadius;
        }
        $('#pincelval').text(radius);
    });
}


function start() {
    pincelSize();
    canvas.width = window.innerWidth - 15;
    canvas.height = window.innerHeight - 10;
    //eventos
    $('#canvas').mousedown(press);
    $('#canvas').mousemove(paint);
    $('#canvas').mouseup(leave);

    function press() {
        draw = true;
        context.moveTo(event.pageX, event.pageY);
    }

    function paint() {
        if (draw) {

            context.lineWidth = radius * 2;
            context.lineTo(event.pageX, event.pageY);
            context.stroke();

            context.beginPath();
            context.arc(event.pageX, event.pageY, radius, 0, 2 * Math.PI);
            context.fill();

            context.beginPath();
            context.moveTo(event.pageX, event.pageY);

        }
    }

    function leave() {
        draw = false;
    }
}

function save() {
    $('#save').click(function() {

        var image = document.getElementById("canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = image;


    });
}