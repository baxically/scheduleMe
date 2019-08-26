const Availability = require ("./availabilityFxns.js")
const compareFriendsAvailability = require ("./availabilityFxns.js")

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
                      new Availability.Availability(  new Date ("8/28/19"), new Date ("8/29/19") )];

    const person2 = [ new Availability.Availability( new Date ("8/19/19"), new Date ("8/21/19") )];

    const received = await Availability.compareFriendsAvailability(person1, person2);

    expect(received).toEqual(expected);
});

test("Reduce Test One Overlap", async function() {
    var f1 = [ new Availability.Availability( new Date ("8/18/19"), new Date ("8/25/19") ), 
               new Availability.Availability(  new Date ("8/28/19"), new Date ("8/29/19") )];

    var f2 = [ new Availability.Availability( new Date ("8/19/19"), new Date ("8/24/19") )];

    var f3 = [ new Availability.Availability( new Date ("8/19/19"), new Date ("8/20/19") )];

    var allF = [ f1, f2, f3 ];

    const expected = [ new Availability.Availability( new Date ("8/19/19"), new Date ("8/20/19") )];

    const received = await Availability.reduceAvailability(allF);
    //console.log(received);

    expect(received).toEqual(expected);
});

test("Reduce Test No Overlap", async function() {
    var f1 = [ new Availability.Availability( new Date ("1/18/19"), new Date ("1/25/19") ), 
               new Availability.Availability(  new Date ("2/28/19"), new Date ("2/29/19") )];

    var f2 = [ new Availability.Availability( new Date ("3/19/19"), new Date ("3/24/19") )];

    var f3 = [ new Availability.Availability( new Date ("4/19/19"), new Date ("4/20/19") )];

    var allF = [ f1, f2, f3 ];

    const expected = [];

    const received = await Availability.reduceAvailability(allF);
    //console.log(received);

    expect(received).toEqual(expected);
});

test("Reduce Test Multiple Overlap", async function() {
    var f1 = [
              new Availability.Availability( new Date ("8/18/19"), new Date ("8/25/19") ), 
              new Availability.Availability(  new Date ("8/28/19"), new Date ("8/29/19") ),
              new Availability.Availability( new Date ("7/1/19"), new Date ("7/2/19") )
             ];

    var f2 = [
              new Availability.Availability( new Date ("8/19/19"), new Date ("8/24/19") ),
              new Availability.Availability( new Date ("7/1/19"), new Date ("7/2/19") ),
             ];

    var f3 = [ new Availability.Availability( new Date ("8/19/19"), new Date ("8/20/19") ),
               new Availability.Availability( new Date ("7/1/19"), new Date ("7/2/19") )
             ];

    var allF = [ f1, f2, f3 ];

    const expected = [ new Availability.Availability( new Date ("8/19/19"), new Date ("8/20/19") ),
                       new Availability.Availability( new Date ("7/1/19"), new Date ("7/2/19") ) ];

    const received = await Availability.reduceAvailability(allF);

    expect(received).toEqual(expected);
});