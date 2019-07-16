var firebaseConfig = {
    apiKey: "AIzaSyCt1uFyyzehL_ZQ2sM-sLzLLTVTc9T0uGs",
    authDomain: "train-time-project-f2659.firebaseapp.com",
    databaseURL: "https://train-time-project-f2659.firebaseio.com",
    projectId: "train-time-project-f2659",
    storageBucket: "",
    messagingSenderId: "439879879956",
    appId: "1:439879879956:web:c1234b7f7c4696d9"
      
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#addTrainBtn").on("click", function(){
    event.preventDefault();

    var addTrainInfo = {
        trainName: $("#nameInput").val().trim(),
        trainDestination: $("#destinationInput").val().trim(),
        trainFrequency: $("#frequencyInput").val().trim(),
        nextArrival: $("#nextArrivalInput").val().trim(),
        minutesAway: $("#minutesAwayInput").val().trim(),
    };

    database.ref().push(addTrainInfo);

    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#nextArrivalInput").val("");
    $("#minutesAwayInput").val("");
});

database.ref().on("child_added", function(childSnapshot){
    //console.log(childSnapshot.val());

    var tName = childSnapshot.val().trainName;
    var tDestination = childSnapshot.val().trainDestination;
    var tFrequency = childSnapshot.val().trainFrequency;
    var tNextArrival = childSnapshot.val().nextArrival;
    var tMinutesAway = childSnapshot.val().minutesAway;

    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tNextArrival),
        $("<td>").text(tMinutesAway),
    );

    $("<tbody>").append(newRow);
    
});