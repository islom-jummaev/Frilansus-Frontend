//=require libs/jquery-3.5.1.min.js
//=require libs/ion/ion.rangeSlider.min.js

$(".js-range-slider").ionRangeSlider({
    type: "double",
    skin: "big",
    min: 100000,
    max: 10000000,
    from: 200,
    to: 500,
    grid: true
});

$(".js-range-slider-money").ionRangeSlider({
    type: "double",
    skin: "big",
    min: 100000,
    max: 10000000,
    from: 200,
    to: 500,
    step: 100000,
    grid: true
});

