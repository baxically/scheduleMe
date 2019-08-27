function initialize() {
    firebase.initializeApp(firebaseConfig);
}

function homeRedirect() {
    location.href = 'home.html';
}

function create_eventsRedirect() {
    location.href = 'create_hangouts.html';
}

function settingsRedirect() {
    location.href = 'settings.html';
}

function profileRedirect() {
    location.href = 'profile.html';
}

function inputTimeRedirect() {
    location.href = 'input_availabilities.html';
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

                    setTimeout(function(){profileRedirect();}, 2000);
                }
                else {
                    profileRedirect(); // no need to create new class
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
    }).catch(function(error) {
        console.error(error);
    });
}

async function addHangout() {
    eventId = await $('#eventKey').val();
    sessionStorage.setItem('docId', eventId);
    var db = firebase.firestore();
    if (eventId === "") {
        alert("There is no event key");
    }
    else {
        eventRef = db.collection("hangouts").doc(eventId)
        eventRef.get()
        .then(async (docSnapshot) => {
            if (docSnapshot.exists) {
                let currUser = await userClass();
                // console.log("Big Check");
                let eventCheck = await currUser.getUserEvents();
                let i;
                let eventFound = false;
                // console.log(eventCheck);
                if (eventCheck != null) {
                    for (i of eventCheck) {
                        if (i.id === eventId) {
                            eventFound = true;
                        }
                    }
                }
                
                if (eventFound) {
                    alert("Event already added");
                }
                else {
                    await addEventReference(eventId);
                    var email;
                        var user = firebase.auth().currentUser;
                        email = user.email;
                        await eventRef.update ({
                            attendees: firebase.firestore.FieldValue.arrayUnion(db.doc('users/' + email))
                        });
                        
                        inputTimeRedirect();

                        // // Get the modal for attendee to input time
                        // var modal = document.getElementById("attendeeTimeInput");
                        // modal.style.display = "block";
    
                        // // Get the <span> element that closes the modal
                        // var span = document.getElementsByClassName("close")[0];
    
                        // // When the user clicks on <span> (x), close the modal
                        // span.onclick = function() {
                        //     modal.style.display = "none";
                        // }
    
                        // // When the user clicks anywhere outside of the modal, close it
                        // window.onclick = function(event) {
                        //     if (event.target == modal) {
                        //         modal.style.display = "none";
                        //     }
                        // }
                    }
                } 
            else {
                    alert("Event Key not found");
                }
            });
        //}   
    }
}

async function getProfileData() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            let user1 = await userClass();
            var name = await user1.getUserName();
            var avatar = await user1.getUserAvatar();
            //debugger;
            $("#username").html(name);
            $("#profilepic").attr("src", avatar);
            listEvents(user1);
            // listFriends(user1);
        } else {
            console.error('user state is broken');
        }
    });
}

async function getCreateEventPageData() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            let user1 = await userClass();
            var name = await user1.getUserName();
            $("#username").html(name);
        } else {
            console.error('user state is broken');
        }
    });
}

async function getCreateEventPage2Data() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            let user1 = await userClass();
            var name = await user1.getUserName();
            $("#username").html(name);
            $("#eKey").html(sessionStorage.getItem('docId'));
        } else {
            console.error('user state is broken');
        }
    });
}

async function getBlogPageData() {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            let user1 = await userClass();
            var name = await user1.getUserName();
            $("#username").html(name);
        } else {
            console.error('user state is broken');
        }
    });
}

//I don't think we're using this popup prompt anymore so we should consider taking it out 
function openPrompt() {
    var event = prompt("Please enter the name of your event", "");
    if (event != null) {
        $("#demo").html("When are you free to host '" + event + "'?");
    }
}

// async function listFriends(user) {
//     var staticFriends = await user.getUserFriends();
    
//     var person = "";
//     if(staticFriends != null)
//     {
//         for(var i = 0; i < staticFriends.length; i++)
//         {
//             var name = await staticFriends[i].get().then((doc) => {
//                 return doc.data().displayName;
//             });
//             person += "<li>" + name + "</li> <br>";
//         }
        
//         document.getElementById("fList").innerHTML = person;
//     }
//     else
//     {
//         person += "You have no friends";
//         document.getElementById("fList").innerHTML = person;
//     }
// }


//This function doesn't work anymore??
async function listEvents(user) {
    var staticEvents = await user.getUserEvents();
    
    //var events = "";
    
    if(staticEvents != null)
    {
        for(var i = 0; i < staticEvents.length; i++)
        {
            var hangoutId;
            var eventName = await staticEvents[i].get().then((doc) => {
                hangoutId = doc.id;
                return doc.data().hangoutName;
            });
            $("#eList").append("<li>" + eventName + "              <button type=\"popup\" onclick=\"displayHangoutDetails('" + hangoutId + "');\">Show Details</button></li> <br>");
        }
    }
    else
    {
        $("#eList").html("You have no hangouts");
    }
}

// async function addFriends() {
//     var db = firebase.firestore();
//     var fEmail = document.getElementById("friendsEmail").value;
//     var docRef = db.collection('users').doc(fEmail);
    
//     docRef.get().then(async (doc) => {
//         if(doc.exists) {
//             var friendRef = 'users/' + fEmail;
                      
//             let user1 = await userClass();
//             var myEmail = user1.getUserEmail();
//             var myRef = db.collection('users').doc(myEmail);
            
//             myRef.update({
//             friends: firebase.firestore.FieldValue.arrayUnion(db.doc(friendRef))
//             });
//         }
//         else
//         {
//             alert("This user doesn't exist!");
//         }
//     });
// }

async function addEvent() {
    await createEvent();
    await addEventReference(sessionStorage.getItem('docId'));
    inputTimeRedirect();
}

async function createEvent() {
    var db = firebase.firestore();
    //var email_ref = "users/" + document.getElementById("friend_email").value;
    var eventId = "";
    var user = firebase.auth().currentUser;
    userRef =  "users/" + user.email;
    //This will be returned to be used in the addEventReference function
    await db.collection("hangouts").add({
        // email: document.getElementById("friend_email").value,
        // event: $("#event_name").val(),
        hangoutName: $("#event_name").val(),
        location: $("#location_name").val(),
        attendees: firebase.firestore.FieldValue.arrayUnion(db.doc(userRef))
        // date: $("#avail_date").val()
        //friend_name: document.getElementById("friend_name").value,
        //email: db.doc(email_ref)
        // Get the modal for attendee to input time
    })
    .then((docRef) => {
        eventId = docRef.id;
        //debugger;
        sessionStorage.setItem('docId', eventId);
        return sessionStorage.getItem('docId');
    });
    //debugger;
}

async function addEventReference(eventId) {
    var email;
    var user = firebase.auth().currentUser;
    email = user.email;

    var db = firebase.firestore();
    var userRef = db.collection('users').doc(email);

    var eventRef = "hangouts/" + eventId;  //Will need to change from 'test/' when we change the collection
    userRef.update({
        events: firebase.firestore.FieldValue.arrayUnion(db.doc(eventRef))
    });
}

// $(document).ready(function() {
//     var max_fields      = 10; //maximum input boxes allowed
//     var wrapper           = $(".input_fields_wrap"); //Fields wrapper
//     var add_button      = $(".add_field_button"); //Add button ID
    
//     var x = 1; //initlal text box count
//     $(add_button).click(function(e){ //on add input button click
//                         e.preventDefault();
//                         if(x < max_fields){ //max input box allowed
//                         x++; //text box increment
//                         $(wrapper).append('<div> Name:<input type="text" id="friend_name" name="mytext[]"/> Email:<input type="text" id="friend_email"/> <a href="#" class="remove_field">Remove</a></div>'); //add input box
//                         }
//                         });
    
//     $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
//                   e.preventDefault(); $(this).parent('div').remove(); x--;
//                   })
//     }); 

// Function that displays the popup when this is called
function openPopup() {
    modal.style.display = "block";
}

function showKey() {
    $("#eKeyPrompt").html("<p>Share the following event key with the friends you want to invite!</p>");
}

async function blogPostInput() {
    let user1 = await userClass();
    var userName = user1.getUserName();
    var avatar = user1.getUserAvatar();
    var blogPost = $('#userStory').val();
    var time = new Date($.now())
    var db = firebase.firestore();

    db.collection('blogPosts').add({
        poster: userName,
        posterPic: avatar,
        blogPost: blogPost,
        timeStamp: time
    })

    setTimeout(() => {location.reload();}, 1000);
}

function displayBlogPosts() {
    var db = firebase.firestore();
    db.collection('blogPosts').orderBy('timeStamp', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //$("#profilepic").attr("src", doc.data().posterPic);
                $('#blogPost').append("<h4>" + doc.data().blogPost + "</h4>");
                $('#blogPost').append("<p>" + doc.data().timeStamp.toDate() + "</p><br>");
            })
        })
}

async function displayHangoutDetails(hangoutId) {
    var newHangout = await hangoutClass(hangoutId);
    var matchingDates = await reduceAvailability(newHangout.getHangoutAvailabilities());
    eventModal.style.display = "block";
    var db = firebase.firestore();
    hangoutRef = db.collection('hangouts').doc(hangoutId);
    hangoutRef.get()
        .then(async (doc) => {
            $('#hangoutName').append(doc.data().hangoutName + ' Details');
            $('#location').append('Location: ' + doc.data().location);
            console.log(matchingDates.length)
            if (matchingDates.length > 0) {
                $('#date').append('Dates: ');
                for (var i = 0; i < matchingDates.length; i++) {
                    var avail = matchingDates[i];
                    // console.log(matchingDates[i]);
                    var startDate = avail.getStartDate();
                    var endDate = avail.getEndDate();
                    // console.log(startDate);
                    // console.log(typeof startDate);
                    if (typeof startDate === 'object') {
                        $('#date').append('<li>' + 'From ' + startDate.getStartDate() + ' to ' + endDate.getEndDate() + '</li><br>');
                    }
                    else {
                        $('#date').append('<li>' + 'From ' + startDate + ' to ' + endDate + '</li><br>');
                    }
                }
            }
            else {
                $('#date').append("No matching dates found");
            }
            var people = await doc.data().attendees;
            console.log(people);
            var i = 0;
            for(i; i < people.length; i++) {
                var person = await people[i].get()
                    .then((doc) => {
                        return doc.data().displayName;
                    })
                $('#attendees').append('<li>' + person + '</li><br>');
            }
        })

        $('#hangoutDeleteBtn').append("<button type=\"button\" onclick=\"deleteHangoutDoc('" + hangoutId + "');\">Cancel Attendance</button>");
}
// When the user clicks on <span> (x), close the modal
async function deleteHangoutDoc(hangoutId)
{
    console.log('deleteHangoutDoc function called ' + hangoutId);
    var db = firebase.firestore();
    var hangoutRef = db.collection('hangouts').doc(hangoutId);
    var user = firebase.auth().currentUser;
    var email = user.email;
    var userInputRef = hangoutRef.collection('userInputs').doc(email);
    var userRef = db.collection('users').doc(email);

    userInputRef.delete();
    console.log('input deleted');
    await hangoutRef.get().then((doc) => {
        var attendeeArray = doc.data().attendees;
        if(attendeeArray.length === 1) {
            console.log('attendees length is 1');
            hangoutRef.delete();
        }
        else {
            // console.log('else called');
            // var removeMe = '/users/' + email;
            // hangoutRef.update({
            //     attendees: firebase.firestore.FieldValue.arrayRemove(removeMe)
            // })
            var i = 0; 
            for(i; i < attendeeArray.length; i++) {
                //if(=== email)
            }
        }
    })
    
    console.log('outside of hangoutRef')
    var removeHangout = '/hangouts/' + hangoutId;
    userRef.update({
        events: firebase.firestore.FieldValue.arrayRemove(removeHangout)
    })
}