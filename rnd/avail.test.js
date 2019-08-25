const Availability = require ("./availabilityFxns.js")

test("Test", function() {
    const a = new Date("8/24/19");
    const b = new Date("8/25/19");    
    const classInstance = new Availability(a, b);
    expect(classInstance.getStartDate()).toBe(a);
    expect(classInstance.getEndDate()).toBe(b);
});