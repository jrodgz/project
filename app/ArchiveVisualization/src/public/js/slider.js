function listenForClicks() {
   var currentChart = 1;
   var numberOfChartsOnPage = $('.chart').length;
   console.log(numberOfChartsOnPage);
   updatenavigationTextForArrows(currentChart);

   $('.right').click(function () {
      if (currentChart <= numberOfChartsOnPage) {
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

function listenForClicks2(num) {
   // by default, chart1 is shown
   var currentChart = 1;
   var numberOfChartsOnPage = $('.chart2').length;
   console.log(numberOfChartsOnPage);
   updatenavigationTextForArrows2(currentChart);

   $('.right2').click(function () {
      if (currentChart < numberOfChartsOnPage) {
         $("#bbox" + currentChart).hide(function () {
            currentChart++;
            updatenavigationTextForArrows2(currentChart);
         });
      }

   });
   $('.left2').click(function () {
      if (currentChart > 1) {
         $("#bbox" + (currentChart - 1)).show(function () {
            currentChart--;
            updatenavigationTextForArrows2(currentChart);
         });
      }
   });

   function updatenavigationTextForArrows2(currentChart) {
      var messageForNextButton = "Nothing follows";
      var messageForPreviousButton = "Nothing proceeds";
      var nextChart = currentChart + 1;
      var previousChart = currentChart - 1;
      if (nextChart <= numberOfChartsOnPage) {
         $('#next_chart_container2').css('visibility', 'visible');
         messageForNextButton = $('#cchart' + nextChart).attr('data-chart-desc');
         $('#next_chart2').text(messageForNextButton);
      } else {
         $('#next_chart_container2').css('visibility', 'hidden');
      }
      if (previousChart >= 1) {
         $('#prev_chart_container2').css('visibility', 'visible');
         messageForPreviousButton = $('#cchart' + previousChart).attr('data-chart-desc');
         $('#prev_chart2').text(messageForPreviousButton);
      } else {
         $('#prev_chart_container2').css('visibility', 'hidden');
      }
   }
}


function listenForClicks3() {
   // by default, chart1 is shown
   var currentChart = 1;
   var numberOfChartsOnPage = $('.chart3').length;
   console.log(numberOfChartsOnPage);
   updatenavigationTextForArrows2(currentChart);

   $('.right3').click(function () {
      if (currentChart < numberOfChartsOnPage) {
         $("#bboxx" + currentChart).hide(function () {
            currentChart++;
            updatenavigationTextForArrows2(currentChart);
         });
      }

   });
   $('.left3').click(function () {
      if (currentChart > 1) {
         $("#bboxx" + (currentChart - 1)).show(function () {
            currentChart--;
            updatenavigationTextForArrows2(currentChart);
         });
      }
   });

   function updatenavigationTextForArrows2(currentChart) {
      var messageForNextButton = "Nothing follows";
      var messageForPreviousButton = "Nothing proceeds";
      var nextChart = currentChart + 1;
      var previousChart = currentChart - 1;
      if (nextChart <= numberOfChartsOnPage) {
         $('#next_chart_container3').css('visibility', 'visible');
         messageForNextButton = $('#cchartt' + nextChart).attr('data-chart-desc');
         $('#next_chart3').text(messageForNextButton);
      } else {
         $('#next_chart_container3').css('visibility', 'hidden');
      }
      if (previousChart >= 1) {
         $('#prev_chart_container3').css('visibility', 'visible');
         messageForPreviousButton = $('#cchartt' + previousChart).attr('data-chart-desc');
         $('#prev_chart3').text(messageForPreviousButton);
      } else {
         $('#prev_chart_container3').css('visibility', 'hidden');
      }
   }
}
