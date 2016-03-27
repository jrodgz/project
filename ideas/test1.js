$('body').append('<div id="container"></div>');

var imageList = [];
for (var i = 0; i < 10; ++i)
{
    if (i < 5)
    {
        imageList.push('cow.jpg');
    }
    else
    {
        imageList.push('dummy.jpg');
    }
}

var div = $('#container');

imageGroup = new drawing.ImageGroup(div, imageList);

$('body').append('<button id="btn1">128</button>');
$('body').append('<button id="btn2">64</button>');
$('body').append('<button id="btn3">prev</button>');
$('body').append('<button id="btn4">next</button>');

$('#btn1').click(function() {
    imageGroup.resize(128, 128);
});

$('#btn2').click(function() {
    imageGroup.resize(64, 64);
});

$('#btn3').click(function() {
    imageGroup.previousPage();
});

$('#btn4').click(function() {
    imageGroup.nextPage();
});

imageGroup.paginate(imageList.length / 2);
imageGroup.resize(256, 256);
