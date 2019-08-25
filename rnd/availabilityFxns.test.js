const Availability = require ("./availabilityFxns.js")
//const compareFriendsAvailability = require ("./availabilityFxns.js")

test("Test constructor", function() {
    const a = new Date("8/24/19");
    const b = new Date("8/25/19");    
    const classInstance = new Availability.Availability(a, b);

    //const arr = [classInstance];
    //console.log(arr);
    expect(classInstance.getStartDate()).toEqual(a);
    expect(classInstance.getEndDate()).toEqual(b);
});

test("Test", async function() {
    const expected = [ new Availability.Availability( new Date ("8/19/19"),  new Date ("8/21/19") )];

    const person1 = [ new Availability.Availability( new Date ("8/18/19"), new Date ("8/25/19") ), 
                    /*new Availability(  new Date ("8/28/19"), new Date ("8/29/19") )*/];

    const person2 = [ new Availability.Availability( new Date ("8/19/19"), new Date ("8/21/19") )];

    const received = await Availability.compareFriendsAvailability(person1, person2);

    expect(received).toEqual(expected);
});