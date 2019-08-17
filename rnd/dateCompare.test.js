const dateCompare = require ("./dateCompare.js")

test("Date 1 occurs first TRUE", function() {
	expect(compareDates(Date(), Date(1566075453163))).toBe("Date 1 occurs first");
});
