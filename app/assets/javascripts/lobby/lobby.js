var CREATE_ROOM_URL = "http://localhost:9000/room/create/";

$(document).ready(function() {
    console.log( "ready!" );
    var url = document.URL.split("/");
    var game = url[url.length - 1];
    var isValid = false;

    if (game == "stuff" || game == "charades") {
        isValid = true;
    }

    var lobby = new Lobby(game, isValid);
    var button = document.getElementById("create-room");
    button.addEventListener('click', function() {
        lobby.addRoom();
    }, false);

});

function Lobby(game, isValid) {
    this.game = game;
    this.isValid = isValid;

    this.addRoom = function() {
        $.get(CREATE_ROOM_URL + game, function(data) {
            location.reload();
        });
    }
}