function aboutRedirect() {
    window.location.replace('about.html');
}

function friendsRedirect() {
    window.location.replace('friends.html');
}

function my_scheduleRedirect() {
    //window.location.replace('my_schedule.html');
    //
	//testing popups and methods
	var d = new Date();
	alert(d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() );
}

function settingsRedirect() {
    window.location.replace('settings.html');
}

function getUserData() {
    var name = user.name;

    document.getElementById("username").innerHTML = name;

    // window.onload = function(){
    //     // you do not need to initialize like this, but I like to
    //     var bar1 = new String('placeholder1');
    //     var bar2 = new String('placeholder2');
    //     var foo = new Array();

    //     // populate the Array with our Strings 
    //     foo.push(bar1);
    //     foo.push(bar2);

    //     // create an array containing all the p tags on the page 
    //     // (which is this case is only one, would be better to assign an id)
    //     pArray = document.getElementsByTagName('p');

    //     // create a text node in the document, this is the proper DOM method
    //     bar1TextNode = document.createTextNode(foo[0].toString());

    //     // append our new text node to the element in question
    //     pArray[0].appendChild(bar1TextNode);
    // };

} //ATTEMPTING TO DISPLAY THE USER'S NAME ON HEADER OF WEBSITE
