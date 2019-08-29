class Hangout {
    constructor(hangout, attendees, location, compiledAvailabilities) {
        this.hangout = hangout;
        this.attendees = attendees;
        this.location = location;
        this.compiledAvailabilities = compiledAvailabilities;
    }

    getHangoutTitle() {
        return this.hangout;
    }

    getHangoutAttendees() {
        return this.attendees;
    }

    getHangoutLocation() {
        return this.location;
    }
    
    getHangoutAvailabilities() {
        return this.compiledAvailabilities;
    }

};

module.exports = Hangout;