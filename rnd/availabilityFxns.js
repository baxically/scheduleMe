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

async function findOverlap( availA, availB ) {
	var overlapStart;
    var overlapEnd;
    // console.log(availA.startDate);
    // console.log(availA.endDate);
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
    //console.log(a);
    return a;
}

async function compareFriendsAvailability( arrOfAvailA, arrOfAvailB )
{
    // console.log(arrOfAvailA[0]);
    // console.log(arrOfAvailB[0]);
    var i, j;//For loop interators
    var commonTimes = new Array;//Array of common times
    //var overlapRange;//Availability
    for ( i = 0; i < arrOfAvailA.length; i++)
    {
        for ( j = 0; j < arrOfAvailB.length; j++ )
        {
            var overlapRange = await findOverlap(arrOfAvailA[i], arrOfAvailB[j]);
            console.log(overlapRange);
            if ( typeof overlapRange === 'object')
            {
                console.log("hewwo");
                commonTimes.push(overlapRange);
            }
        }
    }
    //console.log(commonTimes);
    return commonTimes;
}

module.exports.Availability = Availability;
module.exports.compareFriendsAvailability = compareFriendsAvailability;