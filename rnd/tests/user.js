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

module.exports = User;