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

function validateForm() {
    if (document.getElementById("eventName").value == "") {
        alert("Name must be filled out");
        return false;
    }
    // if (document.getElementById("").value) {
    //     alert("");
    //     return false;
    // }
}