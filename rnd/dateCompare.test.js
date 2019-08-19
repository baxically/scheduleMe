const compareDates = require ("./dateCompare.js")

test("Enclosing", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/19/19"), new Date("8/22/19"))).toBe("Overlap!!!");
});
test("Start Inside", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/15/19"), new Date("8/20/19"))).toBe("Overlap!!!");
});
test("Inside Start Touching", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/18/19"), new Date("8/25/19"))).toBe("Overlap!!!");
});
test("Enclosing Start Touching", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/18/19"), new Date("8/22/19"))).toBe("Overlap!!!");
});
test("Enclosing End Touching", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/19/19"), new Date("8/23/19"))).toBe("Overlap!!!");
});
test("Exact Match", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/18/19"), new Date("8/23/19"))).toBe("Overlap!!!");
});
test("Inside", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/15/19"), new Date("8/25/19"))).toBe("Overlap!!!");
});
test("Inside End Touching", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/15/19"), new Date("8/23/19"))).toBe("Overlap!!!");
});
test("End Inside", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/22/19"), new Date("8/25/19"))).toBe("Overlap!!!");
});
test("No Overlap 1", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/10/19"), new Date("8/15/19"))).toBe("No overlap.");
});
test("No Overlap 2", function() {
	expect(compareDates(new Date("8/18/19"), new Date("8/23/19"), new Date("8/24/19"), new Date("8/26/19"))).toBe("No overlap.");
});