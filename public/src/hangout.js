class Hangout {
    constructor(hangout, attendees, location, compiledAvailabilities, eventKey) {
        this.hangout = hangout;
        this.attendees = attendees;
        this.location = location;
        this.compiledAvailabilities = compiledAvailabilities;
        this.eventKey = eventKey;
    }

    getHangoutTitle() {
        return this.hangout;
    }

    getHangoutAttendees() {
        return this.attendees;
    }

    getHangoutLocation() {
        return this.location;
    }
    
    getHangoutAvailabilities() {
        return this.compiledAvailabilities;
    }

    getEventKey() {
        return this.eventKey;
    }

};

// This function populates and creates a Hangout object from firebase data
// Currently, eventRef is a string.
async function hangoutClass(eventRef) {

    var db = firebase.firestore();
    var hangoutKey = eventRef;
    eventRef = db.collection("hangouts").doc(eventRef);
    await eventRef.get()
    .then((doc) => {
        dataEventPassIn = {
            hangoutName: doc.data().hangoutName,
            hangoutKey: hangoutKey,
            location: doc.data().location,
            attendees: doc.data().attendees
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})

    var completeArray = [];

    eventRef = eventRef.collection("userInputs");
    await eventRef.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {       
            dataTimePassIn = {
                startDates : doc.data().startDates,
                endDates : doc.data().endDates
            }
            let personArray = [];
            for (i = 0; i < dataTimePassIn.startDates.length; i++) {
                let avail = new Availability(dataTimePassIn.startDates[i], dataTimePassIn.endDates[i])
                personArray.push(avail);
            }
            completeArray.push(personArray);
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    var hangout_class = await new Hangout(dataEventPassIn.hangoutName, dataEventPassIn.attendees, dataEventPassIn.location, completeArray);
    return hangout_class;
}
