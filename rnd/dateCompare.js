function compareDates( date1, date2 ) {
	if ( date1 > date2 )
	{
		return "Date 2 occurs first";
	}
	else
	{
		return "Date 1 occurs first";
	}
}

module.exports = compareDates;