export default class User {
    constructor() {
        this.user = null;
        this.email = 'Email';
        this.displayName = 'Display Name';
        this.avatar = 'Avatar';
        this.friends = new Array;
        

    }

    //Getters
    get getUserEmail() {
        return this.getEmail();
    }

    get getUserName() {
        return this.getName();
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

    getName() {
        //this.getEmail.bind(this)
        var db = firebase.firestore();
        var userRef = db.collection("users").doc(this.getEmail());
        userRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                return doc.data().displayName;
            })
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    get getUserAvatar() {
        var db = firebase.firestore();

        var userRef = db.collection("users");
        userRef.where("email", "==", this.getUserEmail).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                return doc.data().avatar;
            })
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    get getUserFriends() {
        var db = firebase.firestore();

        var userRef = db.collection("users");
        userRef.where("email", "==", this.getUserEmail).get().then(function(querySnapshot) {
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