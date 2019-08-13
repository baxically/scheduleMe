var user = null; //FIXME

function initialize() {
    firebase.initializeApp(firebaseConfig);
}

function aboutRedirect() {
    window.location.replace('about.html');
}

function friendsRedirect() {
    window.location.replace('friends.html');
}

function my_scheduleRedirect() {
    window.location.replace('my_schedule.html');
}

function settingsRedirect() {
    window.location.replace('settings.html');
}

function homeRedirect() {
    window.location.replace('home.html');
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
    
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    homeRedirect();
                }
            });
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

    db.collection("users").doc(profile.profEmail).set({
        //GToken: token,
        avatar: profile.profAvatar,
        displayName: profile.profName,
        email: profile.profEmail,
        friends: profile.profFriends
    });
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