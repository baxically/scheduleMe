//import User from './user.js';
//ASK BRIAN ABOUT THIS, WHEN THE CLASS IS IN THE SCRIPT, OTHER FUNCTIONS FAIL

class User {
    constructor() {
        this.user = null;
        this.email = 'Email';
        this.displayName = 'Display Name';
        this.avatar = 'Avatar';
        this.friends = new Array;
        //IDEA HERE, WHAT IF I POPULATE THESE FIELDS FROM THE DATABASE IN THE CONSTRUCTOR SOMEHOW??????
        //THEN THE GETTERS JUST RETURN THIS.NAME OR WHATEVER
    }

    //Getters
    get getUserEmail() {
        return this.getEmail();
    }

    get getUserName() {
        return this.getName();
    }

    get getUserAvatar() {
        return this.getAvatar();
    }

    get getUserFriends() {
        return this.getFriends();
    }

    getEmail() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log('user is signed in');
                user = firebase.auth().currentUser;
                //console.log(user.email);
                var email = user.email;
                console.log(email);
                return email;
            } else {
                // No user is signed in.
                console.log('user is not signed in');
                return 'Error Obtaining Email';
            }
        }); 
    }

    getEmailCB(callback) {
        return new Promise(function(resolve) {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    console.log('in getEmailCB');
                    user = firebase.auth().currentUser;
                    var email = user.email;
                    resolve(callback(email));
                } else {
                    // No user is signed in.
                    console.log('user is not signed in');
                    return 'Error Obtaining Email';
                }
            }); 
        }
    )}

    getName() {
        console.log('in getName');
        this.displayName = this.getEmailCB(this.getNamePt2)
        return this.displayName;
    }

    getNamePt2(email) {
        return new Promise(function(resolve) {
            console.log('in getNamePt2');
            var db = firebase.firestore();
            var userRef = db.collection("users").doc(email);
            userRef.get().then(function(doc) {
                resolve(doc.data().displayName);
                //return doc.data().displayName;
            }).catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        })

    }

    getAvatar() {
        var email = this.getEmailCB(this.getAvatarPt2);
    }

    getAvatarPt2(email) {
        var db = firebase.firestore();
        var userRef = db.collection("users").doc(email);
        userRef.get().then(function(doc) {
                //debugger;
                return doc.data().avatar;
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    getFriends() {
        var email = this.getEmailCB(this.getFriendPt2);
    }

    getFriendsPt2() {
        var db = firebase.firestore();
        var userRef = db.collection("users").doc(email);
        userRef.get().then(function(doc) {
                //debugger;
                return doc.data().friends;
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    //Setters
    set setUserEmail(userEmail) {
            return null;
            //NOT GIVING ACCESS FOR MVP
    }

    set setUserName(userName) {
        var db = firebase.firestore();

        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email == this.getUserEmail) {
                    //doc.set(displayName: userName);
                }
            });
        });
    }
    
    set setUserAvatar(userAvatar) {
        var db = firebase.firestore();

        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().avatar == this.getUserAvatar){
                    //doc.set(displayName: userName);
                }
            });
        });
    }

    set setUserFriends(userFriends) {
        var db = firebase.firestore();

        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().friends == this.getUserFriends){
                    //doc.set(displayName: userName);
                }
            });
        });
    }
};

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

async function getUserData() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            // user = firebase.auth().currentUser;
            // var name = "User's Name";
            // if(user) {
            //     console.log('user signed in');
            //     name = user.displayName;
            // }
            let user1 = await new User();
            //debugger;
            var name = await user1.getUserName();
            //debugger;
            document.getElementById("username").innerHTML = name;
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
