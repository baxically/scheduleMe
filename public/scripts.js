//import User from './user.js';
//ASK BRIAN ABOUT THIS, WHEN THE CLASS IS IN THE SCRIPT, OTHER FUNCTIONS FAIL

class User {
    constructor(email, username, avatar, friends, events) {
        this.email = email;
        this.displayName = username;
        this.avatar = avatar;
        this.friends = friends;
        this.events = events;
    }

    getUserEmail() {
        return this.email;
    }

    getUserName() {
        return this.displayName;
    }

    getUserAvatar() {
        return this.avatar;
    }

    getUserFriends() {
        return this.friends;
    }

    getUserEvents() {
        return this.events;
    }
};

class userPersonalEvent {
    constructor(date, emails, event, friend_names, location) {
        this.date = date;
        this.emails = emails;
        this.event = event;
        this.friend_names = friend_names;
        this.location = location;
    }

    getEventDate() {
        return this.date;
    }

    getEventEmails() {
        return this.emails;
    }

    getEventTitle() {
        return this.event;
    }

    getEventFriends() {
        return this.friend_names;
    }

    getEventLocation() {
        return this.location;
    }

};

async function userClass() {
    var email;
    var dataPassIn;
    
    //debugger;
    var user = firebase.auth().currentUser;
    email = user.email;

    var db = firebase.firestore();
    userRef = db.collection('users').doc(email);
    await userRef.get()
    .then((doc) => {
        dataPassIn = {
            email: email,
            displayName: doc.data().displayName,
            avatar: doc.data().avatar,
            friends: doc.data().friends,
            events: doc.data().events
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})
    
    var user_class = new User(dataPassIn.email, dataPassIn.displayName, dataPassIn.avatar, dataPassIn.friends, dataPassIn.events);
    //debugger;
    return user_class;
}

// This function populates and creates a Event object from firebase data
// Currently, eventRef is a string. Will adjust for reference when confirmed by others.
async function eventClass(eventRef) {

    var db = firebase.firestore();

    eventRef = db.collection("test").doc(eventRef);
    await eventRef.get()
    .then((doc) => {
        dataEventPassIn = {
            date: doc.data().date,
            emails: doc.data().emails,
            event: doc.data().event,
            friend_names: doc.data().friend_names,
            location: doc.data().location
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})

    
    var event_class = await new userPersonalEvent(dataEventPassIn.date, dataEventPassIn.emails, dataEventPassIn.event, dataEventPassIn.friend_names, dataEventPassIn.location);
    return event_class;
}

function initialize() {
    firebase.initializeApp(firebaseConfig);
}

function homeRedirect() {
    location.href = 'home.html';
}


function create_eventsRedirect() {
    location.href = 'create_events.html';
}

function settingsRedirect() {
    location.href = 'settings.html';
}

function profileRedirect() {
    location.href = 'profile.html';
}

function login() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var db = firebase.firestore();
            var docRef = db.collection("users").doc(result.user.email);
            
            docRef.get().then( (doc) => {
                if(!doc.exists) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    user = result.user;
                    // ...
                    var name = user.displayName;
                    var email = user.email;
                    var avatarURL = user.photoURL;
                    //var friendList = ["users/athac007@ucr.edu", "users/bport008@ucr.edu"];

                    var profile = {
                        profName: name,
                        profEmail: email,
                        profAvatar: avatarURL
                        //profFriends: friendList
                    };
                    
                    addUser(profile);

                    setTimeout(function(){profileRedirect();}, 1000);
                }
                else {
                    profileRedirect();
                }
            })
        })
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
        // ...
    });
}

async function addUser(profile) {
    var db = firebase.firestore();
    db.collection("users").doc(profile.profEmail).set({
    //db.collection("users").add({
        //GToken: token,
        avatar: profile.profAvatar,
        displayName: profile.profName,
        email: profile.profEmail
        //friends: db.doc(profile.profFriends[0])
    });
    //debugger;
}

function logout() {
    firebase.auth().signOut().then(function() {
        //setTimeout(() => {homeRedirect();}, 500);
    }).catch(function(error) {
        console.error(error);
    });
}

async function getProfileData() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            let user1 = await userClass();
            var name = await user1.getUserName();
            var avatar = await user1.getUserAvatar();
            //debugger;
            document.getElementById("username").innerHTML = name;
            document.getElementById("profilepic").src = avatar;
            listEvents(user1);
            listFriends(user1);
        } else {
            console.error('user state is broken');
        }
    });
}

function openPrompt() {
    var event = prompt("Please enter the name of your event", "");
    if (event != null) {
        document.getElementById("demo").innerHTML =
        "When are you free to host '" + event + "'?";
    }
}

async function listFriends(user) {
    var staticFriends = await user.getUserFriends();
    
    var person = "";
    if(staticFriends != null)
    {
        for(var i = 0; i < staticFriends.length; i++)
        {
            var name = await staticFriends[i].get().then((doc) => {
                return doc.data().displayName;
            });
            person += "<li>" + name + "</li> <br>";
        }
        
        document.getElementById("fList").innerHTML = person;
    }
    else
    {
        person += "You have no friends";
        document.getElementById("fList").innerHTML = person;
    }
}

async function listEvents(user) {
    var staticEvents = await user.getUserEvents();
    
    var events = "";
    
    if(staticEvents != null)
    {
        for(var i = 0; i < staticEvents.length; i++)
        {
            var eventName = await staticEvents[i].get().then((doc) => {
                return doc.data().event;
            });
            events += "<li>" + eventName + "</li> <br>";
        }
        
        document.getElementById("eList").innerHTML = events;
    }
    else
    {
        events += "You have no events";
        document.getElementById("eList").innerHTML = events;
    }
}

async function addFriends() {
    var db = firebase.firestore();
    var fEmail = document.getElementById("friendsEmail").value;
    var docRef = db.collection('users').doc(fEmail);
    
    docRef.get().then(async (doc) => {
        if(doc.exists) {
            var friendRef = 'users/' + fEmail;
                      
            let user1 = await userClass();
            var myEmail = user1.getUserEmail();
            var myRef = db.collection('users').doc(myEmail);
            
            myRef.update({
            friends: firebase.firestore.FieldValue.arrayUnion(db.doc(friendRef))
            });
        }
        else
        {
            alert("This user doesn't exist!");
        }
    });
}

async function addEvent() {
    var eventId = await createEvent();
    await addEventReference(eventId);
    setTimeout(function(){location.href = 'profile.html';} , 1000)
}

async function createEvent() {
    var db = firebase.firestore();
    var email_ref = "users/" + document.getElementById("friend_email").value;
    var docId = "";
    //This will be returned to be used in the addEventReference function
    await db.collection("test").add({
        // email: document.getElementById("friend_email").value,
        event: document.getElementById("event_name").value,
        location: document.getElementById("location_name").value,
        date: document.getElementById("avail_date").value,
        friend_name: document.getElementById("friend_name").value,
        email: db.doc(email_ref)
    })
    .then((docRef) => {
        docId = docRef.id;
        return docId;
    })
    //debugger;
    return docId;
}

async function addEventReference(eventId) {
    var email;
    var user = firebase.auth().currentUser;
    email = user.email;

    var db = firebase.firestore();
    var userRef = db.collection('users').doc(email);

    var eventRef = 'test/' + eventId;  //Will need to change from 'test/' when we change the collection
    userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion(db.doc(eventRef))
    });
}

$(function() {
  $('input[name="dates"]').daterangepicker({
        timePicker: true,
        startDate: moment(),
        endDate: moment().add(2, 'day'),
        locale: {
            format: 'M/DD hh:mm A'
        }
    },
    function(start, end, label) {
        console.log("New date range selected: " + start.format('M/DD hh:mm A') +
        ' to ' + end.format('M/DD hh:mm A'));
    });
});
