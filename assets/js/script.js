
// Initialize Firebase

var config = {
    apiKey: "AIzaSyA1exJi5NBZHh5H5SsL1jeOjZLmPgEYU7U",
    authDomain: "trains-n-stuff.firebaseapp.com",
    databaseURL: "https://trains-n-stuff.firebaseio.com",
    projectId: "trains-n-stuff",
    storageBucket: "",
    messagingSenderId: "114710596911"
  };
  firebase.initializeApp(config);


let db = firebase.database();


// create variables and push to DB
//take in variables from submit
$("#submit-btn").on("click", function(e) {

  event.preventDefault();

  let name = $("#name-submit").val().trim()
  let destination = $("#destination-submit").val().trim()
  let initialTime = $("#initialTime-submit").val().trim()
  let frequency = $("#frequency-submit").val().trim()

  pushToDB(name, destination, initialTime, frequency);

  // Clears all of the text-boxes
  $("#name-submit").val("");
  $("#destination-submit").val("");
  $("#initialTime-submit").val("");
  $("#frequency-submit").val("");


});

function pushToDB(name, destination, initialTime, frequency) {

  db.ref().push({
    "name": name,
    "destination": destination,
    "initialTime": initialTime, 
    "frequency": frequency, 
  });
}

//populate table using child_added



db.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().initialTime);
  console.log(childSnapshot.val().frequency);
  
  //train-example.html
  let firstTimeConverted = moment(childSnapshot.val().initialTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  // Current Time
  let currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  let tRemainder = diffTime % childSnapshot.val().frequency;
  console.log(tRemainder);

  // Minute Until Train
  let tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  let nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




  $("#full-name-list").append("<div class='well'><span id='name'>" + childSnapshot.val().name + " </span></div>");
  $("#full-destination-list").append("<div class='well'><span id='destination'>" + childSnapshot.val().destination + " </span></div>");
  $("#full-frequency-list").append("<div class='well'><span id='frequency'>" + childSnapshot.val().frequency + " </span></div>");
  $("#full-nextTrain-list").append("<div class='well'><span id='nextTrain'>" + moment(nextTrain).format("hh:mm") + " </span></div>");
  $("#full-nextTime-list").append("<div class='well'><span id='tMinutesTillTrain'>" + tMinutesTillTrain + " </span></div>");
  


})

//using current time, frequency, and initial start time calculate next arrival and minutes away


//Next arrival = 

//minutes away =? moment().startOf(nextArival).fromNow();

/* 
let firstTimeConverted = moment(initialTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
*/