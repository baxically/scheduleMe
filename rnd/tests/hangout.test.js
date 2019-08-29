const Hangout = require ("./hangout.js")
const Availability = require ("./availability.js")

test("getHangoutTitle()", function () {
    const hangoutInstance = new Hangout();
    const hangoutName = "pitch";
    hangoutInstance.hangout = hangoutName;
    expect(hangoutInstance.getHangoutTitle()).toEqual(hangoutName);
})

test("getHangoutAttendees()", function () {
    const hangoutInstance = new Hangout();
    const team = ['Howard', 'Ally', 'Kevin', 'Chrystal', 'Brandon'];
    hangoutInstance.attendees = team;
    expect(hangoutInstance.getHangoutAttendees()).toEqual(team);
})

test("getHangoutLocation()", function () {
    const hangoutInstance = new Hangout();
    const loc = "Gallery";
    hangoutInstance.location = loc;
    expect(hangoutInstance.getHangoutLocation()).toEqual(loc);
})

test("getHangoutAvailabilities()", function () {
    const hangoutInstance = new Hangout();
    const dateA = new Date("8/26/19");
    const dateB = new Date("8/27/19");
    const dates = new Availability(dateA, dateB);
    hangoutInstance.compiledAvailabilities = dates;
    expect(hangoutInstance.getHangoutAvailabilities()).toEqual(dates);
})

test("Create Hangout", function () {
    const hangoutName = "pitch";
    const team = ['Howard', 'Ally', 'Kevin', 'Chrystal', 'Brandon'];
    const loc = "Gallery";
    const dateA = new Date("8/26/19");
    const dateB = new Date("8/27/19");
    const dates = new Availability(dateA, dateB);

    const hangoutInstance = new Hangout(hangoutName, team, loc, dates);
    expect(hangoutInstance.getHangoutTitle()).toEqual(hangoutName);
    expect(hangoutInstance.getHangoutAttendees()).toEqual(team);
    expect(hangoutInstance.getHangoutLocation()).toEqual(loc);
    expect(hangoutInstance.getHangoutAvailabilities()).toEqual(dates);
})