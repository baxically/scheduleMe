const Hangout = require ("./hangout.js")

test ("Create Hangout", function () {
    const hangoutName = "pitch";
    const team = ['Howard', 'Ally', 'Kevin', 'Chrystal', 'Brandon'];
    const loc = "Gallery";
    const dateA = new Date("8/26/19");
    const dateB = new Date("8/27/19");
    const dates = [dateA, dateB];

    const hangoutInstance = new Hangout(hangoutName, team, loc, dates);
    expect(hangoutInstance.getHangoutTitle()).toEqual(hangoutName);
    expect(hangoutInstance.getHangoutAttendees()).toEqual(team);
    expect(hangoutInstance.getHangoutLocation()).toEqual(loc);
    expect(hangoutInstance.getHangoutAvailabilities()).toEqual(dates);
})