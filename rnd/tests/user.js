class User {
    constructor(email, username, avatar, events) {
        this.email = email;
        this.displayName = username;
        this.avatar = avatar;
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

    getUserEvents() {
        return this.events;
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
            events: doc.data().events
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})
    
    var user_class = new User(dataPassIn.email, dataPassIn.displayName, dataPassIn.avatar, dataPassIn.events);
    return user_class;
}

module.exports = User;