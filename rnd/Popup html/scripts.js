function initialize() {
    firebase.initializeApp(firebaseConfig);
}

function openPrompt() {
    var person = prompt("Please enter your name", "");
    if (person != null) {
      document.getElementById("demo").innerHTML =
      "Hello " + person + "! How are you today?";
    }
}

function togglePopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function confirmAction() {
    confirm("This popup notifies user of an action. User is allowed to cancel this action by pressing cancel (Note: it acts as a bool. True when pressing ok, false when pressing cancel)");
}

function alertAction() {
    alert("Similar to confirm. But this popup only gives info to user, does not allow a cancel. Only has an ok option");
}