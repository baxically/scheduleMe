const Availability = require ("./availabilityFxns.js")

// test("Test", function() {
//     const a = new Date("8/24/19");
//     const b = new Date("8/25/19");    
//     const classInstance = new Availability(a, b);
//     expect(classInstance.startDate).toBe(a);
//     expect(classInstance.endDate).toBe(b);
// });

test("Test", function() {
    const a = new Date ("8/24/19");
    const b = new Date ("8/25/19");    
    const classInstance = new Availability(a, b);

    const arr = [classInstance];
    //console.log(arr);
    expect(classInstance.getStartDate()).toEqual(a);
    expect(classInstance.getEndDate()).toEqual(b);
});