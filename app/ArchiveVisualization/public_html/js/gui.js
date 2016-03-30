var gui = gui || {};

// namespace for constructing the gui
(function (constructor, $, undefined) {

    constructor.setLoadigScreen = function (visClass) {
        $('.' + visClass).css("background-image", "url(images/loading.gif)");
        $('.' + visClass).css("background-repeat", "no-repeat");
        $('.' + visClass).css("background-position", "center");
        $('.' + visClass).css("background-attachment", "fixed");
    };

    // TODO::
    // add funciton to trigger different areas of focus [ memento, tags, resources ]

}(window.gui.constructor = window.gui.constructor || {}, jQuery));