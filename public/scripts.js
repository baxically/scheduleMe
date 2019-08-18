//import User from './user.js';
//ASK BRIAN ABOUT THIS, WHEN THE CLASS IS IN THE SCRIPT, OTHER FUNCTIONS FAIL

class User {
    constructor(email, username, avatar, friends) {
        this.email = email;
        this.displayName = username;
        this.avatar = avatar;
        this.friends = friends;
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
};

<<<<<<< HEAD
class userPersonalEvent {
    constructor(title, location, date, dateArray, start, startArray, end, endArray, attendees) {
        this.title = title;
        this.location = location;
        this.date = date;
        this.dateArray = dateArray;
        this.start = start;
        this.startArray = startArray;
        this.end = end;
        this.endArray = endArray;
        this.attendees = attendees;
    }

    getEventTitle() {
        return this.title;
    }

    getEventLocation() {
        return this.location;
    }

    getEventDate() {
        return this.date;
    }

    getEventDates() {
        return this.dateArray;
    }

    getEventStart() {
        return this.start;
    }

    getEventStarts() {
        return this.startArray;
    }

    getEventEnd() {
        return this.end;
    }

    getEventEnds() {
        return this.endArray;
    }

    getEventAttendees() {
        return this.attendees;
    }

};

//This function populates with dummy values and creates an Event object
async function creatingEvent() {

    var db = firebase.firestore();
    eventRef = db.collection("EVENTS");
    
    var title = "Kevin Demo Event";
    var location = "Alpha Centari";
    var date = "Waiting for responces";
    var dateArray = ["09/21", "09/22", "09/23"];
    var start = "Waiting for responces";
    var startArray = ["7:30"];
    var end = "Waiting for responces";
    var endArray = ["13:45"];
    var attendees = ["Beandon", "Alloy", "Howad", "Chrimbal", "Seven"];

    var creation = await new userPersonalEvent(title, location, date, dateArray, start, startArray, end, endArray, attendees);

    eventRef.add({
        title: creation.getEventTitle(),
        location: creation.getEventLocation(),
        chosen_date: creation.getEventDate(),
        dates: creation.getEventDates(),
        chosen_start: creation.getEventStart(),
        starts: creation.getEventStarts(),
        chosen_end: creation.getEventEnd(),
        ends: creation.getEventEnds(),
        attendees: creation.getEventAttendees()

      });
    }

=======
//This function populates and creates a User object
async function userClass() {
    var email;
    var dataPassIn;
    
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
            friends: doc.data().friends
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})
    
    var user_class = new User(dataPassIn.email, dataPassIn.displayName, dataPassIn.avatar, dataPassIn.friends);
    //debugger;
    return user_class;
>>>>>>> master
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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL) //
    .then(function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            user = result.user;
            // ...
            var name = user.displayName;
            var email = user.email;
            var avatarURL = user.photoURL;
            var friendList = ["Andre", "Chris", "Ton", "Noah", "Mina", "Morgan", "Jeff", "Brian"];
    
            var profile = {
                profName: name,
                profEmail: email,
                profAvatar: avatarURL,
                profFriends: friendList
            };
            
            addUser(profile);

            setTimeout(function(){profileRedirect();}, 1000);
            
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

function addUser(profile) {
    var db = firebase.firestore();
    console.log('before db.set');
    db.collection("users").doc(profile.profEmail).set({
    //db.collection("users").add({
        //GToken: token,
        avatar: profile.profAvatar,
        displayName: profile.profName,
        email: profile.profEmail,
        friends: profile.profFriends
    });
    console.log('after db.set');
}

function logout() {
    firebase.auth().signOut().then(function() {
        //setTimeout(() => {homeRedirect();}, 500);
    }).catch(function(error) {
        console.error(error);
    });
}

async function getUserData() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            let user1 = await userClass();
            var name = user1.getUserName();
            //debugger;
            document.getElementById("username").innerHTML = name;
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

function listFriends() {
    var staticFriends = ["Alex", "Brianna", "Calvin", "Hailey", "Kristy"];
    
    var person = "";
    
    for(var i = 0; i < staticFriends.length; i++)
    {
        person += "<li>" + staticFriends[i] + "</li> <br>";
    }
    
    document.getElementById("fList").innerHTML = person;
}

function listEvents() {
    var staticEvents = ["Lan @ Alex's", "Hot Pot @ Aaron's", "Kyle's Birthday Party"];
    
    var event = "";
    
    for(var i = 0; i < staticEvents.length; i++)
    {
        event += "<li>" + staticEvents[i] + "</li> <br>";
    }
    
    document.getElementById("eList").innerHTML = event;
}
