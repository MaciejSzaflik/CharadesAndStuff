var CREATE_ROOM_URL = "http://localhost:9000/room/create/";
var ROOM_URL = "http://localhost:9000/room/:id";

var lobby;

$(document).ready(function() {
    var url = document.URL.split("/");
    var game = url[url.length - 1];
    var isValid = false;

    if (game == "stuff" || game == "charades") {
        isValid = true;
    }

    lobby = new Lobby(game, isValid);
    var button = document.getElementById("create-room");
    button.addEventListener('click', function() {
        lobby.addRoom();
    }, false);

});

function join(id) {
	lobby.join(id);
}

function Lobby(game, isValid) {
    this.game = game;
    this.isValid = isValid;

    this.addRoom = function() {
        $.get(CREATE_ROOM_URL + game, function(data) {
			window.open(ROOM_URL.replace(":id", data.split(" ")[1]));
            location.reload();
        });
    };

    this.join = function(id) {
		window.open(ROOM_URL.replace(":id", id));
    };
}