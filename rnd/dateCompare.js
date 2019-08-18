function compareDates( startA, endA, startB, endB ) {
	if ( startA >= endB )
	{
		return "No overlap.";
	}
	else if ( startB >= endA )
	{
		return "No overlap.";
	}
	else if ( startA <= startB && endA >= endB )
	{
		return "Overlap!!!";
	}
	else if ( startA <= startB && endA < endB )
	{
		return "Overlap!!!";
	}
	else if ( startA >= startB && endB <= endA )
	{
		return "Overlap!!!";
	}
	else if ( startA >= startB && endA < endB )
	{
		return "Overlap!!!";
	}
}

module.exports = compareDates;