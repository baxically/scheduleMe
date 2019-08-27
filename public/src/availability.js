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

$(function() { // Chrystal's date picker: once apply is pressed, start and end date are appended to a list of availble dates
  $('input[name="dates"]').daterangepicker({
        autoUpdateInput: false,
        timePicker: true,
        minDate: moment(),
        locale: {
            format: 'M/DD hh:mm A'
        }
    }, 
    function(start, end, label) {
        var hangoutID = sessionStorage.getItem('docId');
        
        // save current user's email (string)
        var userEmail;
        var user = firebase.auth().currentUser;
        userEmail = user.email;
        //add to database
        var db = firebase.firestore();
        docRef = db.collection('hangouts').doc(hangoutID)
            .collection('userInputs').doc(userEmail);
        docRef.get().then(async (doc) => {
            // if document exists, update
            if (doc.exists) {
                db.collection('hangouts').doc(hangoutID)
                .collection('userInputs').doc(userEmail).update({
                    startDates: firebase.firestore.FieldValue.arrayUnion(start.format('M/DD hh:mm A')),
                    endDates: firebase.firestore.FieldValue.arrayUnion(end.format('M/DD hh:mm A'))
                })    
            }
            // if document doesn't exist, create new document and add fields
            else {
                db.collection('hangouts').doc(hangoutID)
                .collection('userInputs').doc(userEmail).set({
                    startDates: firebase.firestore.FieldValue.arrayUnion(start.format('M/DD hh:mm A')),
                    endDates: firebase.firestore.FieldValue.arrayUnion(end.format('M/DD hh:mm A')),
                })
            }
        })  .catch(function(error) {
            console.log("Error getting document:", error);
        });
        //list date
        var datesDiv = $(".dates_list");
        $(datesDiv).append('<li' + ' id=test>' +start.format('YYYY-MM-DD hh:mm A')+' to '+end.format('YYYY-MM-DD hh:mm A')+'</li>');
    });
});

/*
    Param: Two Availability objects
    Compares both Availability objects to look for any existing overlaps
    Return: Nothing or new Availability object of overlapping time
*/
function findOverlap( availA, availB ) {
	var overlapStart;
	var overlapEnd;
	if ( availA.getStartDate() >= availB.getEndDate() )
	{
		return;//No overlap

	}
	else if ( availB.getStartDate() >= availA.getEndDate() )
	{
		return;//No overlap
	}
	else if ( availA.getStartDate() <= availB.getStartDate() && availA.getEndDate() >= availB.getEndDate() )
	{
        //AvailB is within AvailA
		overlapStart = availB.getStartDate();
		overlapEnd = availB.getEndDate();
	}
	else if ( availA.getStartDate() <= availB.getStartDate() && availA.getEndDate() < availB.getEndDate() )
	{
        //AvailB starts in AvailA, but AvailB ends after AvailA
		overlapStart = availB.getStartDate();
		overlapEnd = availA.getEndDate();
	}
	else if ( availA.getStartDate() >= availB.getStartDate() && availB.getEndDate() <= availA.getEndDate() )
	{
        //AvailA starts in AvailB, but AvailB ends before Avail 
		overlapStart = availA.getStartDate();
		overlapEnd = availB.getEndDate();
	}
	else if ( availA.getStartDate() >= availB.getStartDate() && availA.getEndDate() < availB.getEndDate() )
	{
		overlapStart = availA.getStartDate();
		overlapEnd = availA.getEndDate();
    }

    return new Availability(overlapStart, overlapEnd);
}

/*
    Param: Two arrays of Availability that need to be compared.
    compareFriendsAvailability() loops through the first array,
    and loops through the second array to findOverlap() between
    the two Availability. If overlap exists, then it is pushed into
    an array that holds all common Availability.
    Return: Array of all shared Availability
*/
function compareFriendsAvailability( arrOfAvailA, arrOfAvailB )
{
    var i, j;//For loop interators
    var commonTimes = new Array;//Array of Availability
    for ( i = 0; i < arrOfAvailA.length; i++)
    {
        for ( j = 0; j < arrOfAvailB.length; j++ )
        {
            var overlapRange = findOverlap(arrOfAvailA[i], arrOfAvailB[j]);
            if ( typeof overlapRange === 'object')
            {
                commonTimes.push(overlapRange);
            }
        }
    }
    return commonTimes;//returns array of all Availability
}

/*
    Param: Array of Array.
    The array hold arrays of each person's availability.
    reduce() accumulator is an array of Availabilities that each person is available for.
    It is then compared to the next person's Availabilities. If a common time is found then the accumulator
    will still have the Availability, else it will be taken out. reduce() works so well with compareFriendsAvailability()
    because the parameter would take in the accumulator and then the next array to be compared.
    Returns: Array of Availability or Availability object.
*/
function reduceAvailability(arrOfAllFriendsAvail)
{
    var arr = arrOfAllFriendsAvail.reduce(compareFriendsAvailability);
    return arr;
}
