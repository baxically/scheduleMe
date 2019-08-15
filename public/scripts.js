//import User from './user.js';
//ASK BRIAN ABOUT THIS, WHEN THE CLASS IS IN THE SCRIPT, OTHER FUNCTIONS FAIL

// class User {
//     constructor() {
//         this.user = null;
//         this.email = 'Email';
//         this.displayName = 'Display Name';
//         this.avatar = 'Avatar';
//         this.friends = new Array;
        

//     }

//     //Getters
//     get getUserEmail() {
//         return this.getEmail();
//     }

//     get getUserName() {
//         return this.getName();
//     }

//     getEmail() {
//         firebase.auth().onAuthStateChanged(function(user) {
//             if (user) {
//                 // User is signed in.
//                 console.log('user is signed in');
//                 user = firebase.auth().currentUser;
//                 //console.log(user.email);
//                 var email = user.email;
//                 console.log(email);
//                 return email;
//             } else {
//                 // No user is signed in.
//                 console.log('user is not signed in');
//                 return 'Error Obtaining Email';
//             }
//         });
//     }

//     getName() {
//         //this.getEmail.bind(this)
//         var db = firebase.firestore();
//         var userRef = db.collection("users").doc(this.getEmail());
//         userRef.get().then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 return doc.data().displayName;
//             })
//         }).catch(function(error) {
//             console.log("Error getting documents: ", error);
//         });
//     }

//     get getUserAvatar() {
//         var db = firebase.firestore();

//         var userRef = db.collection("users");
//         userRef.where("email", "==", this.getUserEmail).get().then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 return doc.data().avatar;
//             })
//         }).catch(function(error) {
//             console.log("Error getting documents: ", error);
//         });
//     }

//     get getUserFriends() {
//         var db = firebase.firestore();

//         var userRef = db.collection("users");
//         userRef.where("email", "==", this.getUserEmail).get().then(function(querySnapshot) {
//             querySnapshot.forEach(function(doc) {
//                 return doc.data().friends;
//             })
//         }).catch(function(error) {
//             console.log("Error getting documents: ", error);
//         });
//     }

//     //Setters
//     set setUserEmail(userEmail) {
//             return null;
//             //NOT GIVING ACCESS FOR MVP
//     }

//     set setUserName(userName) {
//         var db = firebase.firestore();

//         db.collection("users").get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 if(doc.data().email == this.getUserEmail) {
//                     //doc.set(displayName: userName);
//                 }
//             });
//         });
//     }
    
//     set setUserAvatar(userAvatar) {
//         var db = firebase.firestore();

//         db.collection("users").get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 if(doc.data().avatar == this.getUserAvatar){
//                     //doc.set(displayName: userName);
//                 }
//             });
//         });
//     }

//     set setUserFriends(userFriends) {
//         var db = firebase.firestore();

//         db.collection("users").get().then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 if(doc.data().friends == this.getUserFriends){
//                     //doc.set(displayName: userName);
//                 }
//             });
//         });
//     }
// };

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
            //let user1 = new User();
            //var name = user1.getUserName();
            document.getElementById("username").innerHTML = name; //FIXME BACK TO 'name'
            // User is signed in.
        } else {
            // No user is signed in.
            console.log('user state is broken');
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
