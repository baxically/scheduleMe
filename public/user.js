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
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log('user is signed in');
                user = firebase.auth().currentUser;
                //console.log(user.email);
                var email = user.email;
                console.log(email);
                return callback(email);
                //return email;
            } else {
                // No user is signed in.
                console.log('user is not signed in');
                return 'Error Obtaining Email';
            }
        }); 
    }

    getName() {
        var email = this.getEmailCB(this.getNamePt2);
    }

    getNamePt2(email) {
        var db = firebase.firestore();
        var userRef = db.collection("users").doc(email);
        userRef.get().then(function(doc) {
                //debugger;
                return doc.data().displayName;
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
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