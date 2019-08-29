const User = require ("./user.js")
const Hangout = require ("./hangout.js")
const Availability = require ("./availability.js")

test("getUserEmail()", function () {
    const email = "bmpgotcha@gmail.com";
    const userInstance = new User();
    userInstance.email = email;
    expect(userInstance.getUserEmail()).toEqual(email);
})

test("getUserName()", function () {
    const name = "Brandon Porter";
    const userInstance = new User();
    userInstance.displayName = name;
    expect(userInstance.getUserName()).toEqual(name);
})

test("getUserAvatar()", function () {
    const dp = "howard.png"; // usually a URL of an image
    const userInstance = new User();
    userInstance.avatar = dp;
    expect(userInstance.getUserAvatar()).toEqual(dp);
})

test("getUserEvents()", function () {
    //create first event
    const hangoutName = "ScheduleMe Pitch";
    const team = ['Howard', 'Ally', 'Kevin', 'Chrystal', 'Brandon'];
    const loc = "Gallery";
    const dateA = new Date("8/26/19");
    const dateB = new Date("8/27/19");
    const dates = new Availability(dateA, dateB);
    const hangoutOne = new Hangout(hangoutName, team, loc, dates);
    //create second event
    const hangoutName2 = "A++ Pitch";
    const team2 = ['Tinghui', 'Noah', 'Hongtao', 'Siyi', 'Sahil'];
    const loc2 = "Gallery";
    const dateC = new Date("8/26/19");
    const dateD = new Date("8/27/19");
    const dates2 = new Availability(dateC, dateD);
    const hangoutTwo = new Hangout(hangoutName2, team2, loc2, dates2);
    //create third event
    const hangoutName3 = "CheckMates Pitch";
    const team3 = ['Nick', 'Mina', 'Morgan', 'Andre', 'Jesse'];
    const loc3 = "Gallery";
    const dateE = new Date("8/26/19");
    const dateF = new Date("8/27/19");
    const dates3 = new Availability(dateE, dateF);
    const hangoutThree = new Hangout(hangoutName3, team3, loc3, dates3);
    //create event references – usually a firebase reference, but changed to object references in this test
    const hangoutRefOne = hangoutOne;
    const hangoutRefTwo = hangoutTwo;
    const hangoutRefThree = hangoutThree;
    //store references in array
    var hangouts = [hangoutRefOne, hangoutRefTwo, hangoutRefThree];
    //create class, store hangouts[] in .events, test
    const userInstance = new User();
    userInstance.events = hangouts;
    expect(userInstance.getUserEvents()).toEqual(hangouts);
})

test("Create Hangout", function () {

    const email = "cchen277@ucr.edu";
    const name = "Howard Chen";
    const avatar = "howard.png";

        //create first event
        const hangoutName = "ScheduleMe Pitch";
        const team = ['Howard', 'Ally', 'Kevin', 'Chrystal', 'Brandon'];
        const loc = "Gallery";
        const dateA = new Date("8/26/19");
        const dateB = new Date("8/27/19");
        const dates = new Availability(dateA, dateB);
        const hangoutOne = new Hangout(hangoutName, team, loc, dates);
        //create second event
        const hangoutName2 = "A++ Pitch";
        const team2 = ['Tinghui', 'Noah', 'Hongtao', 'Siyi', 'Sahil'];
        const loc2 = "Gallery";
        const dateC = new Date("8/26/19");
        const dateD = new Date("8/27/19");
        const dates2 = new Availability(dateC, dateD);
        const hangoutTwo = new Hangout(hangoutName2, team2, loc2, dates2);
        //create third event
        const hangoutName3 = "CheckMates Pitch";
        const team3 = ['Nick', 'Mina', 'Morgan', 'Andre', 'Jesse'];
        const loc3 = "Gallery";
        const dateE = new Date("8/26/19");
        const dateF = new Date("8/27/19");
        const dates3 = new Availability(dateE, dateF);
        const hangoutThree = new Hangout(hangoutName3, team3, loc3, dates3);
        //create event references – usually a firebase reference, but changed to object references in this test
        const hangoutRefOne = hangoutOne;
        const hangoutRefTwo = hangoutTwo;
        const hangoutRefThree = hangoutThree;
        //store references in array
        var hangouts = [hangoutRefOne, hangoutRefTwo, hangoutRefThree];

    const userInstance = new User(email, name, avatar, hangouts);
    expect(userInstance.getUserEmail()).toEqual(email);
    expect(userInstance.getUserName()).toEqual(name);
    expect(userInstance.getUserAvatar()).toEqual(avatar);
    expect(userInstance.getUserEvents()).toEqual(hangouts);
})