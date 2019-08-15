var user = null; //FIXME

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
            var user = result.user;
            // ...
            //WE WANT THE USER TO CREATE AN ACCOUNT/GIVE US INFORMATION
            //var db = firebase.firestore();
            var name = user.displayName;
            var email = user.email;
            var avatarURL = user.photoURL;
            var friendList = new Array();
    
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
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}

function getUserData() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user = firebase.auth().currentUser;
            var name = "User's Name";
            if(user) {
                console.log('user signed in');
                name = user.displayName;
            }
        
            document.getElementById("username").innerHTML = name; //FIXME BACK TO 'name'
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });
}

function openPrompt() {
    var event = prompt("Please enter the name of your event", "");
    if (event != null) {
        document.getElementById("demo").innerHTML =
        "Who would you like to invite to '" + event + "'?";
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

