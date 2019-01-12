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

            // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", function (e) {
            mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        }, false);

        // Get the position of a touch relative to the canvas
        function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
        };
        }

    /*Prevent scrolling when touching the canvas*/
    document.body.addEventListener("touchstart", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchend", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    }, false);

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