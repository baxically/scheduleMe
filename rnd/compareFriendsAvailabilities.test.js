const compareFriendsAvailabilities = require ("./compareFriendsAvailabilities.js")

test("Test", function() {
    expect(compareFriendsAvailabilities([new Date("8/18/19"), new Date("8/28/19")],
                                        [new Date("8/25/19"), new Date("8/29/19")],
                                        [new Date("8/19/19")],
                                        [new Date("8/21/19")]))
                                        .toBe("Mon Aug 19 2019 to Wed Aug 21 2019" + '\n')
});

test("Test", function() {
    expect(compareFriendsAvailabilities([new Date("8/18/19"), new Date("8/28/19")],
                                        [new Date("8/25/19"), new Date("8/29/19")],
                                        [new Date("8/19/19")],
                                        [new Date("8/30/19")]))
                                        .toBe("Mon Aug 19 2019 to Wed Aug 21 2019" + '\n' +
                                              "Mon Aug 19 2019 to Sun Aug 25 2019" + '\n' +
                                              "Wed Aug 28 2019 to Thu Aug 29 2019" + '\n')
});