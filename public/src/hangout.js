class Hangout {
    constructor(hangout, attendees, location, compiledAvailabilities, eventKey) {
        this.hangout = hangout;
        this.attendees = attendees;
        this.location = location;
        this.compiledAvailabilities = compiledAvailabilities;
        this.eventKey = eventKey;
    }

    getHangoutName() {
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

    var names = [];
    
    eventRef = db.collection("hangouts").doc(eventRef);
    await eventRef.get()
    .then(async (doc) => {
        dataEventPassIn = {
            hangoutName: doc.data().hangoutName,
            hangoutKey: hangoutKey,
            location: doc.data().location,
            attendees: doc.data().attendees
        }
        var people = await dataEventPassIn.attendees;
        var i = 0;
        for(i; i < people.length; i++) {
            var person = await people[i].get()
                .then((doc) => {
                    return doc.data().displayName;
                })
                names.push(person);
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

    var hangout_class = await new Hangout(dataEventPassIn.hangoutName, names, dataEventPassIn.location, 
                                          completeArray, dataEventPassIn.hangoutKey);
    return hangout_class;
}
