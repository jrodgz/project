function listenForClicks() {
    // by default, chart1 is shown
    var currentChart = 1;
    var numberOfChartsOnPage = $('.chart').length;
    updatenavigationTextForArrows(currentChart);

    $('.right').click(function () {
        if (currentChart < numberOfChartsOnPage) {
            $("#box" + currentChart).hide(function () {
                currentChart++;
                updatenavigationTextForArrows(currentChart);
            });
        }

    });
    $('.left').click(function () {
        if (currentChart > 1) {
            $("#box" + (currentChart - 1)).show(function () {
                currentChart--;
                updatenavigationTextForArrows(currentChart);
            });
        }
    });

    function updatenavigationTextForArrows(currentChart) {
        var messageForNextButton = "Nothing follows";
        var messageForPreviousButton = "Nothing proceeds";
        var nextChart = currentChart + 1;
        var previousChart = currentChart - 1;
        if (nextChart <= numberOfChartsOnPage) {
            $('#next_chart_container').css('visibility', 'visible');
            messageForNextButton = $('#chart' + nextChart).attr('data-chart-desc');
            $('#next_chart').text(messageForNextButton);
        } else {
            $('#next_chart_container').css('visibility', 'hidden');
        }
        if (previousChart >= 1) {
            $('#prev_chart_container').css('visibility', 'visible');
            messageForPreviousButton = $('#chart' + previousChart).attr('data-chart-desc');
            $('#prev_chart').text(messageForPreviousButton);
        } else {
            $('#prev_chart_container').css('visibility', 'hidden');
        }
    }
}
