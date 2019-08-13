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