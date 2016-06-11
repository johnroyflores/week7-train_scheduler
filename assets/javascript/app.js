var choochoomotherfucker = new Firebase('https://choochoo.firebaseio.com/');
var trainName = "";
var firstTrain = "";
var destination = "";
var frequency = 0;
var timeTilNext = 0;


$('#submit').on('click', function() {
    trainName = $('#trainNameInput').val().trim();
    firstTrain = $('#firstTrainInput').val().trim();
    frequency = $('#frequencyInput').val().trim();
    destination = $('#destinationInput').val().trim();
    var m = moment(firstTrain, 'hhmm').format();
    console.log(m);
    var difference = moment().diff(m, 'minutes');
    var nextTrain = (difference % frequency);
    nextTrain = frequency - nextTrain;
    
    
    nextTrain = moment().add(nextTrain, 'minutes');
    

    nextTrain = moment(nextTrain, "hhmm").format();
    
    timeTilNext = moment().diff(nextTrain, 'minutes');
    timeTilNext = Math.abs(timeTilNext);

    choochoomotherfucker.push({
        trainName: trainName,
        firstTrain: firstTrain,
        frequency: frequency,
        destination: destination,
        timeTilNext: timeTilNext
    })

    $('#trainNameInput').val('');
    $('#firstTrainInput').val('');
    $('#destinationInput').val('');
    $('#frequencyInput').val('');

    return false;
});

choochoomotherfucker.on("child_added", function(snapshot) {
    console.log(snapshot.key());
    $('#newRow').append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().firstTrain + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().timeTilNext + " minutes" + "</td></tr>")
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code)
});
