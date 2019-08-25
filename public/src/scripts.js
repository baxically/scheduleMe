class User {
    constructor(email, username, avatar, events) {
        this.email = email;
        this.displayName = username;
        this.avatar = avatar;
        // this.friends = friends;
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

    // getUserFriends() {
    //     return this.friends;
    // }

    async getUserEvents() {
        return this.events;
    }
};

class userPersonalEvent {
    constructor(date, emails, hangout, attendees, location) {
        this.date = date;
        this.emails = emails;
        this.hangout = hangout;
        this.attendees = attendees;
        this.location = location;
    }

    getEventDate() {
        return this.date;
    }

    getEventEmails() {
        return this.emails;
    }

    getEventTitle() {
        return this.hangout;
    }

    getEventAttendees() {
        return this.attendees;
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
            // friends: doc.data().friends,
            events: doc.data().events
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})
    
    var user_class = new User(dataPassIn.email, dataPassIn.displayName, dataPassIn.avatar, /*dataPassIn.friends,*/ dataPassIn.events);
    //debugger;
    return user_class;
}

// This function populates and creates a Event object from firebase data
// Currently, eventRef is a string. Will adjust for reference when confirmed by others.
async function eventClass(eventRef) {

    var db = firebase.firestore();

    eventRef = db.collection("hangouts").doc(eventRef);
    await eventRef.get()
    .then((doc) => {
        dataEventPassIn = {
            date: doc.data().date,
            emails: doc.data().emails,
            hangoutName: doc.data().hangoutName,
            friend_names: doc.data().friend_names,
            location: doc.data().location
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})

    
    var event_class = await new userPersonalEvent(dataEventPassIn.date, dataEventPassIn.emails, dataEventPassIn.hangoutName, dataEventPassIn.friend_names, dataEventPassIn.location);
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

async function addHangout() {
    eventId = await $('#eventKey').val();
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
                for (i of eventCheck) {
                    if (i.id === eventId) {
                        eventFound = true;
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
                        eventRef.update ({
                            attendees: firebase.firestore.FieldValue.arrayUnion(db.doc('users/' + email))
                        });
    
                        // Get the modal for attendee to input time
                        var modal = document.getElementById("attendeeTimeInput");
                        modal.style.display = "block";
    
                        // Get the <span> element that closes the modal
                        var span = document.getElementsByClassName("close")[0];
    
                        // When the user clicks on <span> (x), close the modal
                        span.onclick = function() {
                            modal.style.display = "none";
                        }
    
                        // When the user clicks anywhere outside of the modal, close it
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }
                    }
                } else {
                    alert("Event Key not found");
                }
            });
        //}   
    }
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
    var eventId = await createEvent();
    await addEventReference(eventId);
    //setTimeout(function(){location.href = 'profile.html';} , 1000)
}

async function createEvent() {
    var db = firebase.firestore();
    //var email_ref = "users/" + document.getElementById("friend_email").value;
    var docId = "";
    //This will be returned to be used in the addEventReference function
    await db.collection("hangouts").add({
        // email: document.getElementById("friend_email").value,
        // event: $("#event_name").val(),
        hangoutName: $("#event_name").val(),
        location: $("#location_name").val(),
        date: $("#avail_date").val()
        //friend_name: document.getElementById("friend_name").value,
        //email: db.doc(email_ref)
        // Get the modal for attendee to input time
    })
    .then((docRef) => {
        docId = docRef.id;
        $("#eKey").html(docId);
        return docId;
    })
    //debugger;
    $("#eKey").html(docId);
    return docId;
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

class Availability {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }
};

$(function() { // Chrystal's date picker: once apply is pressed, start and end date are appended to a list of availble dates
  $('input[name="dates"]').daterangepicker({
        timePicker: true,
        startDate: moment(),
        endDate: moment().add(2, 'day'),
        locale: {
            format: 'M/DD hh:mm A'
        }
    }, 
    function(start, end, label) {
        // save current user's email (string)
        var userEmail;
        var user = firebase.auth().currentUser;
        userEmail = user.email;
        // var userEmail = 'sample@email.com'; (used for testing)
        //add to database
        var db = firebase.firestore();
        docRef = db.collection('test').doc('#sample')   //Will need to change from 'test/' when we change the collection
            .collection('userInputs').doc(userEmail);
        docRef.get().then(async (doc) => {
            // if document exists, update
            if (doc.exists) {
                db.collection('test').doc('#sample')
                .collection('userInputs').doc(userEmail).update({
                    startDates: firebase.firestore.FieldValue.arrayUnion(start.format('M/DD hh:mm A')),
                    endDates: firebase.firestore.FieldValue.arrayUnion(end.format('M/DD hh:mm A'))
                })    
            }
            // if document doesn't exist, create new document and add fields
            else {
                db.collection('test').doc('#sample')
                .collection('userInputs').doc(userEmail).set({
                    startDates: firebase.firestore.FieldValue.arrayUnion(start.format('M/DD hh:mm A')),
                    endDates: firebase.firestore.FieldValue.arrayUnion(end.format('M/DD hh:mm A')),
                    theyHaveInput: true
                })
            }
        // db.collection('test').doc(docId)
        // .collection('userInputs').doc(userEmail).get().
        })  .catch(function(error) {
            console.log("Error getting document:", error);
        });
        //list date
        var datesDiv = $(".dates_list");
        $(datesDiv).append('<li' + ' id=test>' +start.format('YYYY-MM-DD hh:mm A')+' to '+end.format('YYYY-MM-DD hh:mm A')+'</li>');
    });
});

function findOverlap( availA, availB ) {
	var overlapStart;
	var overlapEnd;
	if ( availA.getStartDate() >= availB.getEndDate() )
	{
		return;//No overlap

	}
	else if ( availB.getStartDate() >= availA.getEndDate() )
	{
		return;//No overlap
	}
	else if ( availA.getStartDate() <= availB.getStartDate() && availA.getEndDate() >= availB.getEndDate() )
	{
		overlapStart = availB;
		overlapEnd = availB;
	}
	else if ( availA.getStartDate() <= availB.getStartDate() && availA.getEndDate() < avialB.getEndDate() )
	{
		overlapStart = availB;
		overlapEnd = availA;
	}
	else if ( availA.getStartDate() >= availB.getStartDate() && availB.getEndDate() <= availA.getEndDate() )
	{
		overlapStart = availA;
		overlapEnd = availB;
	}
	else if ( availA.getStartDate() >= availB.getStartDate() && availA.getEndDate() < availB.getEndDate() )
	{
		overlapStart = availA;
		overlapEnd = availA;
    }

    return new Availability(overlapStart, overlapEnd);
}

function compareFriendsAvailability( arrOfAvailA, arrOfAvailB )
{
    var i, j;//For loop interators
    var commonTimes = []//Array of common times
    var overlapRange;//Availability
    for ( i = 0; i < arrOfAvailA.length; i++)
    {
        for ( j = 0; j < arrOfAvailB.length; j++ )
        {
            overlapRange = findOverlap(arrOfAvailA[i], arrOfAvailB[j]);
            if ( typeof overlapRange === 'Availability')
            {
                commonTimes.push(overlapRange);
            }
        }
    }
    return commonTimes;
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

function displayHangoutDetails(hangoutId) {
    eventModal.style.display = "block";
    var db = firebase.firestore();
    hangoutRef = db.collection('hangouts').doc(hangoutId);
    hangoutRef.get()
        .then(async (doc) => {
            $('#hangoutName').append(doc.data().hangoutName + ' Details');
            $('#location').append('Location: ' + doc.data().location);
            $('#date').append('Date: ' + doc.data().date);
            var people = await doc.data().attendees;
            console.log(people);
            debugger;
            var i = 0;
            for(i; i < people.length; i++) {
                var person = await people[i].get()
                    .then((doc) => {
                        return doc.data().displayName;
                    })
                $('#attendees').append('<li>' + person + '</li><br>');
            }
        })
}
// When the user clicks on <span> (x), close the modal
