function compareDates( startA, endA, startB, endB ) {
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
	return [overlapStart, overlapEnd];

}

module.exports = compareDates;