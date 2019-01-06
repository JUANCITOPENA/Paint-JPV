$(document).ready(setColors);

function setColors() {
    var colors_array = ["yellow", "pink", "orange", "gray", "red", "green", "blue", "black", "white", "purple", "gold"];

    for (var i = 0; i < colors_array.length; i++) {
        $('#changeColor').append('<button class="set_color" id=' + colors_array[i] + ' style="background-color:' + colors_array[i] + '"></button>');
    }

    $('#changeColor button').click(function() {

        var selectedColor = $(this).attr('id');
        context.fillStyle = selectedColor;
        context.strokeStyle = selectedColor;
    });
}