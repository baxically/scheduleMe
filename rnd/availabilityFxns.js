class Availability {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }
};

//async function findOverlap( availA, availB ) {
function findOverlap( availA, availB ) {
  	var overlapStart;
    var overlapEnd;
    // console.log("Array A");
    // console.log(availA.startDate);
    // console.log(availA.endDate);
    // console.log("Array B");
    // console.log(availB.startDate);
    // console.log(availB.endDate);
	if ( availA.startDate >= availB.endDate )
	{
		return;//No overlap

	}
	else if ( availB.startDate >= availA.endDate )
	{
		return;//No overlap
	}
	else if ( availA.startDate <= availB.startDate && availA.endDate >= availB.endDate )
	{
		overlapStart = availB.startDate;
		overlapEnd = availB.endDate;
	}
	else if ( availA.startDate <= availB.startDate && availA.endDate < avialB.endDate )
	{
		overlapStart = availB.startDate;
		overlapEnd = availA.endDate;
	}
	else if ( availA.startDate >= availB.startDate && availB.endDate <= availA.endDate )
	{
		overlapStart = availA.startDate;
		overlapEnd = availB.endDate;
	}
	else if ( availA.startDate >= availB.startDate && availA.endDate < availB.endDate )
	{
		overlapStart = availA.startDate;
		overlapEnd = availA.endDate;
    }
    
    var a = new Availability(overlapStart, overlapEnd);
    // console.log("Availability");
    // console.log(a);
    return a;
}

// async function compareFriendsAvailability( arrOfAvailApromise, arrOfAvailB )
function compareFriendsAvailability( arrOfAvailA, arrOfAvailB )
{
    // console.log(arrOfAvailApromise)
    // // var arrOfAvailA = await arrOfAvailApromise;
    // var arrOfAvailA = arrOfAvailApromise;
    // console.log('arrOfAvailA:',arrOfAvailA)
    // console.log(arrOfAvailA.length);
    // console.log('arrOfAvailB:',arrOfAvailB)
    // console.log(arrOfAvailB.length);
    var i, j;//For loop interators
    var commonTimes = new Array;//Array of common times
    //var overlapRange;//Availability
    for ( i = 0; i < arrOfAvailA.length; i++)
    {
        for ( j = 0; j < arrOfAvailB.length; j++ )
        {
            // var overlapRange = await findOverlap(arrOfAvailA[i], arrOfAvailB[j]);
            var overlapRange = findOverlap(arrOfAvailA[i], arrOfAvailB[j]);
            if ( typeof overlapRange === 'object')
            {
                commonTimes.push(overlapRange);
            }
        }
    }
    // console.log("Common Times");
    // console.log(commonTimes);
    // return Promise.resolve(commonTimes);
    return commonTimes;
}

// async function reduceAvailability(arrOfAllFriendsAvail)
function reduceAvailability(arrOfAllFriendsAvail)
{
    // var arr = await arrOfAllFriendsAvail.reduce(compareFriendsAvailability, Promise.resolve(arrOfAllFriendsAvail[0]));
    var arr = arrOfAllFriendsAvail.reduce(compareFriendsAvailability);
    // console.log('reduceAvailability Return:',arr);
    return arr;
}

module.exports.Availability = Availability;
module.exports.compareFriendsAvailability = compareFriendsAvailability;
module.exports.reduceAvailability = reduceAvailability;