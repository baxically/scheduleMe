function compareDates( startA, endA, startB, endB ) {
    // console.log(startA);
    // console.log(endA);
    // console.log(startB);
    // console.log(endB);

	var overlapStart;
	var overlapEnd;
	if ( startA >= endB )
	{
		//return "No overlap.";
		return;

	}
	else if ( startB >= endA )
	{
		//return "No overlap.";
		return;
	}
	else if ( startA <= startB && endA >= endB )
	{
		//return "Overlap!!!";
		overlapStart = startB;
		overlapEnd = endB;
	}
	else if ( startA <= startB && endA < endB )
	{
		//return "Overlap!!!";
		overlapStart = startB;
		overlapEnd = endA;
	}
	else if ( startA >= startB && endB <= endA )
	{
		//return "Overlap!!!";
		overlapStart = startA;
		overlapEnd = endB;
	}
	else if ( startA >= startB && endA < endB )
	{
		//return "Overlap!!!";
		overlapStart = startA;
		overlapEnd = endA;
    }
    // console.log(overlapStart);
    // console.log(overlapEnd);

    //var options = { year: '2-digit', month: '2-digit', day: 'numeric' };

	return overlapStart.toDateString() + " to " + overlapEnd.toDateString();

}

var arrStartA = [Date("8/18/19"), Date("8/28/19")];
var arrEndA = [Date("8/25/19"), Date("8/29/19")];
var arrStartB = [Date("8/19/19")];
var arrEndB = [Date("8/21/19")];
var commonTimes = "";
var allCommonTimes = "";
function compareFriendsAvailabilities(arrStartA, arrEndA, arrStartB, arrEndB)
{
    var i, j;
    for ( i = 0; i < arrStartA.length; i++)
    {
        for ( j = 0; j < arrStartB.length; j++ )
        {
            commonTimes = compareDates(arrStartA[i], arrEndA[i], arrStartB[j], arrEndB[j]);
            console.log(commonTimes);
            if ( typeof commonTimes === 'undefined')
            {

            }
            else
            {
                allCommonTimes = allCommonTimes + commonTimes + '\n';
            }
        }
    }
    return allCommonTimes;
}

module.exports = compareFriendsAvailabilities;