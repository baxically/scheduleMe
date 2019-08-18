//dont worry about export stuff for now, will worry about it after webpack is installed 
export default class User {
    constructor(email, username, avatar, friends) {
        this.email = email;
        this.displayName = username;
        this.avatar = avatar;
        this.friends = friends;
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

    getUserFriends() {
        return this.friends;
    }
};

//This function populates and creates a User object
export async function userClass() {
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
            friends: doc.data().friends
        }
    }).catch((err) => {console.error("Error getting documents: ", err)})
    
    var user_class = new User(dataPassIn.email, dataPassIn.displayName, dataPassIn.avatar, dataPassIn.friends);
    //debugger;
    return user_class;
}