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
        //startDate: moment().subtract(1, 'day'),
        //endDate: moment().subtract(1, 'day'),
        minDate: moment(),
        locale: {
            format: 'M/DD hh:mm A'
            //cancelLabel: 'Clear'
        }
    }, 
    function(start, end, label) {
        var hangoutID = sessionStorage.getItem('docId');
        
        // save current user's email (string)
        var userEmail;
        var user = firebase.auth().currentUser;
        userEmail = user.email;
        // var userEmail = 'sample@email.com'; (used for testing)
        //add to database
        var db = firebase.firestore();
        docRef = db.collection('hangouts').doc(hangoutID)   //Will need to change from 'test/' when we change the collection
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
                    // theyHaveInput: true
                })
            }
        // db.collection('hangouts').doc(docId)
        // .collection('userInputs').doc(userEmail).get().
        })  .catch(function(error) {
            console.log("Error getting document:", error);
        });
        //list date
        var datesDiv = $(".dates_list");
        $(datesDiv).append('<li' + ' id=test>' +start.format('YYYY-MM-DD hh:mm A')+' to '+end.format('YYYY-MM-DD hh:mm A')+'</li>');
    });
});

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
		overlapStart = availB.getStartDate();
		overlapEnd = availB.getEndDate();
	}
	else if ( availA.getStartDate() <= availB.getStartDate() && availA.getEndDate() < availB.getEndDate() )
	{
		overlapStart = availB.getStartDate();
		overlapEnd = availA.getEndDate();
	}
	else if ( availA.getStartDate() >= availB.getStartDate() && availB.getEndDate() <= availA.getEndDate() )
	{
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

function compareFriendsAvailability( arrOfAvailA, arrOfAvailB )
{
    var i, j;//For loop interators
    var commonTimes = new Array;//Array of common times
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
    return commonTimes;
}

function reduceAvailability(arrOfAllFriendsAvail)
{
    // var arr = await arrOfAllFriendsAvail.reduce(compareFriendsAvailability, Promise.resolve(arrOfAllFriendsAvail[0]));
    var arr = arrOfAllFriendsAvail.reduce(compareFriendsAvailability);
    // console.log('reduceAvailability Return:',arr);
    return arr;
}
