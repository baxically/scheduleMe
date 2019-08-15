"use strict";

function addDate() {
    let d = document.getElementById("date_selected").value;
    document.getElementById("s-date").innerHTML= d;
} //add selected date to list

function confirmCancel() {
    confirm("Are you sure you want to cancel this event? All changes will not be saved.")
}

function confirmReset() {
    confirm("Are you sure you want to res this event? All changes will be reverted.")
}

function verify() {
    let eventName = document.getElementById("id1");
    if (!eventName.checkValidity()) {
    //   document.getElementById("demo").innerHTML = inpObj.validationMessage;
        alert("event name not created")
    }
}