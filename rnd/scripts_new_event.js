function addEvent() {
    var eventdb = firebase.firestore();

    eventdb.collection("events(test)").add({
        name: $("#nameField").val()
    });
}