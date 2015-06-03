//Setup Firebase
var firebase = new Firebase("https://academic-team-scoreboard.firebaseio.com/");

firebase.on("value", function(snapshot) {
    var data = snapshot.val();

    //Update the interface with the new data
    $("#home-name").text(data.home_name);
    $("#visitor-name").text(data.visitor_name);
    $("#home-score").text(data.home_score);
    $("#visitor-score").text(data.visitor_score);
    $("#round").text("Round " + data.round);
});
