$( document ).ready(function() {
    console.log( "ready!" );
    var lobby = new Lobby();

    var button = document.getElementById("create-room");
    button.addEventListener('click', function() {
        lobby.addRoom("");
    }, false);

});

function Lobby() {
    this.addRoom = function(name) {
        console.log("ll");
    }
}