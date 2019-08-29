const Availability = require("./availability.js")

test("getStartDate()", function () {
    const availabilityInstance = new Availability();
    const start = new Date("8/5/19");
    availabilityInstance.startDate = start;
    expect(availabilityInstance.getStartDate()).toEqual(start);
})

test("getEndDate()", function () {
    const availabilityInstance = new Availability();
    const end = new Date("8/30/19");
    availabilityInstance.endDate = end;
    expect(availabilityInstance.getEndDate()).toEqual(end);
})

test("Create Availability", function () {
    const start = new Date("8/5/19");
    const end = new Date("8/30/19");
    const availabilityInstance = new Availability(start, end);
    expect(availabilityInstance.getStartDate()).toEqual(start);
    expect(availabilityInstance.getEndDate()).toEqual(end);
})