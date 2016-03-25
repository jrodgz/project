var gui = gui || {};

// namespace for constructing the gui
(function (constructor, $, undefined) {

    constructor.prepareMenuItems = function (menuButtonClass) {
        // ensure once a link is clicked, it stays so
        // TODO:: this is a bug, and its not working... must investigyate why
        $('.' + menuButtonClass).click(function () {
            $(this).toggleClass('active');
        });
    };

    constructor.setLoadigScreen = function (visClass) {
        $('.' + visClass).css("background-image", "url(images/loading.gif)");
        $('.' + visClass).css("background-repeat", "no-repeat");
        $('.' + visClass).css("background-position", "center");
        $('.' + visClass).css("background-attachment", "fixed");
    };

}(window.gui.constructor = window.gui.constructor || {}, jQuery));