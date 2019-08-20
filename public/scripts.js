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
}

//This function populates and creates a Event object from firebase data
async function eventClass() {

    // var specific_event = tempUser.getUserEvents()[eventIndex];
    var db = firebase.firestore();

    eventRef = db.collection("test").doc("#sample");
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
            var name = await user1.getUserName();
            var avatar = await user1.getUserAvatar();
            //debugger;
            document.getElementById("username").innerHTML = name;
            document.getElementById("profilepic").src = avatar;
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

function addEvent(){
    createEvent();
    setTimeout(function(){location.href = 'profile.html';}, 1000);
}

function createEvent() {
    var db = firebase.firestore();
    var email_ref = "users/" + document.getElementById("friend_email").value;

    db.collection("test").add({
        // email: document.getElementById("friend_email").value,
        event: document.getElementById("event_name").value,
        location: document.getElementById("location_name").value,
        date: document.getElementById("avail_date").value,
        friend_name: document.getElementById("friend_name").value,
        email: db.doc(email_ref)
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
