
export default class User {
    constructor() {
        this.db = firebase.firestore();
        //this.userRef = db.collection("users");
    }

    //Getters
    get getUserEmail() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                user = firebase.auth().currentUser;
                return user.email;
            } else {
                // No user is signed in.
                return 'Error Obtaining Email';
            }
        });
    }

    get getUserName() {
        var userRef = db.collection("users");
        userRef.where("email", "==", getUserEmail()).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                return doc.data().displayName;
            })
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    get getUserAvatar() {
        var userRef = db.collection("users");
        userRef.where("email", "==", getUserEmail()).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                return doc.data().avatar;
            })
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    get getUserFriends() {
        var userRef = db.collection("users");
        userRef.where("email", "==", getUserEmail()).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                return doc.data().friends;
            })
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
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().email == this.getUserEmail) {
                    //doc.set(displayName: userName);
                }
            });
        });
    }
    
    set setUserAvatar(userAvatar) {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().avatar == this.getUserAvatar){
                    //doc.set(displayName: userName);
                }
            });
        });
    }

    set setUserFriends(userFriends) {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().friends == this.getUserFriends){
                    //doc.set(displayName: userName);
                }
            });
        });
    }
};