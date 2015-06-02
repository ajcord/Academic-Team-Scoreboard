var homeScore = 0;
var visitorScore = 0;

var startingTimer = 0; //The original time on the clock
var timer = 0; //The time on the clock
var start = 0; //The starting timestamp

var round = 1; //The current round
var interval; //Stores the interval timer ID

$("#home-plus-1").on("click", function() {
    homeScore++;
    $("#home-score").val(homeScore);
});

$("#home-minus-1").on("click", function() {
    homeScore--;
    $("#home-score").val(homeScore);
});

$("#visitor-plus-1").on("click", function() {
    visitorScore++;
    $("#visitor-score").val(visitorScore);
});

$("#visitor-minus-1").on("click", function() {
    visitorScore--;
    $("#visitor-score").val(visitorScore);
});

$(".round").on("click", function() {
    $(".round").removeClass("active");
    $(this).addClass("active");
    round = $(this).index() + 1;
});

$("#timer-10").on("click", function() {
    window.clearInterval(interval);
    timer = 10;
    startingTimer = 10;
    $("#timer").text(timer.toFixed(2));
    $("#timer-pause").hide();
    $("#timer-start").show();
});

$("#timer-30").on("click", function() {
    window.clearInterval(interval);
    timer = 30;
    startingTimer = 30;
    $("#timer").text(timer.toFixed(2));
    $("#timer-pause").hide();
    $("#timer-start").show();
});

$("#timer-start").on("click", function() {
    startTimer();
    $("#timer-start").hide();
    $("#timer-pause").show();
});

$("#timer-pause").on("click", function() {
    pauseTimer();
    $("#timer-pause").hide();
    $("#timer-start").show();
});

$("#timer-reset").on("click", function() {
    window.clearInterval(interval);
    timer = startingTimer;
    $("#timer").text(timer.toFixed(2));
    $("#timer-pause").hide();
    $("#timer-start").show();
})


function startTimer() {
    start = new Date().getTime();
    interval = window.setInterval(function() {
        var now = new Date().getTime();
        var diff = now - start;
        var remaining = timer - diff/1000;
        $("#timer").text(remaining.toFixed(2));

        if (remaining < 0.005) {
            window.clearInterval(interval);
            $("#timer").text("0.00");
            $("#timer-pause").hide();
            $("#timer-start").show();
        }
    }, 25);
}

function pauseTimer() {
    window.clearInterval(interval);
    var now = new Date().getTime();
    var diff = now - start;
    timer = timer - diff/1000;
}
