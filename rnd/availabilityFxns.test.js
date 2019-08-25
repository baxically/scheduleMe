const compareFriendsAvailabilities = require ("./availabilityFxns.js")
const Availability = require ("./availabilityFxns.js")


test("Test", function() {
    var expected = [ new Availability(new Date("8/19/19"), new Date("8/21/19"))];
    expect(compareFriendsAvailabilities([ new Availability( new Date("8/18/19"), new Date("8/25/19") ), 
                                          new Availability( new Date("8/28/19"), new Date("8/29/19") )], 
                                       ([ new Availability( new Date("8/19/19"), new Date("8/21/19"))])))
                                        .toBe(expected);
});