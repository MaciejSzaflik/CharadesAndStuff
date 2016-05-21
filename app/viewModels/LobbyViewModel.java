package viewModels;

import models.Room;

import java.util.List;

public class LobbyViewModel {
	private String game;
	private List<Room> rooms;
	
	public LobbyViewModel(String  game, List<Room> rooms) {
		this.game = game;
		this.rooms = rooms;
	}

	public String getGame() {
		return game;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public Room getRoom(int index) {
		return rooms.get(index);
	}

	@Override
	public String toString() {
		return "LobbyViewModel{" +
				"game='" + game + '\'' +
				", rooms=" + rooms +
				'}';
	}
}
