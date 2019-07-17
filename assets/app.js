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
        firstTrain: $("#firstTrainInput").val().trim(),
    };

    database.ref().push(addTrainInfo);

    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("firstTrainInput").val("");
    
});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().trainName;
    var tDestination = childSnapshot.val().trainDestination;
    var tFrequency = childSnapshot.val().trainFrequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
     
    var currentTime = moment().format("hh:mm"); //created the current time in military time
    var convertedFirstTrain = moment(tFirstTrain, "hh:mm").subtract(1, "years"); // converting user input time to military time and setting in the past 
    var timeDifference = moment().diff(convertedFirstTrain, "minutes"); //finding the difference between the current time and the user input time we just set
    var remainder = timeDifference%tFrequency; // taking the total number of minutes since the user input time and diving it by the frequency of train arrivals, taking the remainder that is left. 
    var tMinutesAway = tFrequency - remainder; //subtracting the train frequency by the remainder we just got. 
    var newArrivalcalc = moment().add(tMinutesAway, "minutes"); //taking current time and adding how many minutes away the next train is
    var tNextArrival = moment(newArrivalcalc).format("hh:mm a"); //formatting the next arrival time


    if (tMinutesAway <= 1){
        var newRow = $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(tNextArrival),
            $("<td>").text("Arriving Now"),
        );        
    } else {
        var newRow = $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(tNextArrival),
            $("<td>").text(tMinutesAway),
        );
    }

   $(".train-info").append(newRow);

    
});


