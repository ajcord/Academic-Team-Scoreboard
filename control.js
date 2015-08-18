var homeScore = 0;
var visitorScore = 0;
var homeName = "Versailles";
var visitorName = "Visitor";

var startingTimer = 10; //The original time on the clock
var timer = 0; //The time on the clock
var start = 0; //The starting timestamp
var interval; //Stores the interval timer ID

var round = 1; //The current round

var scoreboardWindow; //Stores the scoreboard window

//Setup Firebase
var firebase = new Firebase("https://vhsacademicteam.firebaseio.com/");
updateFirebase();

//Get buzzer audio file
var buzzer = new Audio("buzzer.mp3");

function updateScoreboard() {
    if (scoreboardWindow) {
        $(scoreboardWindow.document).find("#home-name").text(homeName);
        $(scoreboardWindow.document).find("#visitor-name").text(visitorName);
        $(scoreboardWindow.document).find("#home-score").text(homeScore);
        $(scoreboardWindow.document).find("#visitor-score").text(visitorScore);
        $(scoreboardWindow.document).find("#round").text("Round " + round);
    }
}

function updateFirebase() {
    firebase.set({
        "home_name": homeName,
        "visitor_name": visitorName,
        "home_score": homeScore,
        "visitor_score": visitorScore,
        "round": round
    });
}

$("#home-name").on("change", function() {
    homeName = $("#home-name").val();
    if (homeName.trim() == "") {
        homeName = "Home";
    }
    updateScoreboard();
    updateFirebase();
});

$("#visitor-name").on("change", function() {
    visitorName = $("#visitor-name").val();
    if (visitorName.trim() == "") {
        visitorName = "Visitor";
    }
    updateScoreboard();
    updateFirebase();
});

$("#home-score").on("change", function() {
    var newScore = parseInt($("#home-score").val());
    if (isNaN(newScore)) {
        //Prevent non-numbers from being entered
        $("#home-score").val(homeScore);
        return;
    }
    homeScore = newScore;
    $("#home-score").val(homeScore);
    updateScoreboard();
    updateFirebase();
});

$("#home-plus-1").on("click", function() {
    homeScore++;
    $("#home-score").val(homeScore);
    updateScoreboard();
    updateFirebase();
});

$("#home-minus-1").on("click", function() {
    homeScore--;
    $("#home-score").val(homeScore);
    updateScoreboard();
    updateFirebase();
});

$("#visitor-score").on("change", function() {
    var newScore = parseInt($("#visitor-score").val());
    if (isNaN(newScore)) {
        //Prevent non-numbers from being entered
        $("#visitor-score").val(visitorScore);
        return;
    }
    visitorScore = newScore;
    $("#visitor-score").val(visitorScore);
    updateScoreboard();
    updateFirebase();
});

$("#visitor-plus-1").on("click", function() {
    visitorScore++;
    $("#visitor-score").val(visitorScore);
    updateScoreboard();
    updateFirebase();
});

$("#visitor-minus-1").on("click", function() {
    visitorScore--;
    $("#visitor-score").val(visitorScore);
    updateScoreboard();
    updateFirebase();
});

$(".round").on("click", function() {
    $(".round").removeClass("active");
    $(this).addClass("active");
    round = $(this).index() + 1;
    updateScoreboard();
    updateFirebase();
});

$("#show-scoreboard").on("click", function() {
    scoreboardWindow = window.open("scoreboard.html", "scoreboardWindow",
        "width=1280, height=900");

    //Insert the correct stats once the popup loads
    scoreboardWindow.onload = updateScoreboard;
});

$("#timer-10").on("click", function() {
    window.clearInterval(interval);
    timer = 10;
    startingTimer = timer;
    $("#timer").text(timer.toFixed(2));
    $("#timer-pause").hide();
    $("#timer-start").show().removeAttr("disabled");
});

$("#timer-30").on("click", function() {
    window.clearInterval(interval);
    timer = 30;
    startingTimer = timer;
    $("#timer").text(timer.toFixed(2));
    $("#timer-pause").hide();
    $("#timer-start").show().removeAttr("disabled");
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
    $("#timer-start").show().removeAttr("disabled");
});

function startTimer() {
    start = new Date().getTime();
    interval = window.setInterval(function() {
        var now = new Date().getTime();
        var diff = now - start;
        var remaining = timer - diff/1000;
        $("#timer").text(remaining.toFixed(2));

        if (remaining < 0.005) {
            window.clearInterval(interval);
            timer = 0;
            $("#timer").text("0.00");
            $("#timer-pause").hide();
            $("#timer-start").show().attr("disabled", "true");
            
            //Sound the buzzer
            buzzer.play();

            //Flash the scoreboard
            if (scoreboardWindow) {
                $(scoreboardWindow.document.body).css("background-color", "red");
                window.setTimeout(function() {
                    $(scoreboardWindow.document.body).css("background-color", "white");
                }, 650);
            }
        }
    }, 25);
}

function pauseTimer() {
    window.clearInterval(interval);
    var now = new Date().getTime();
    var diff = now - start;
    timer = timer - diff/1000;
}
