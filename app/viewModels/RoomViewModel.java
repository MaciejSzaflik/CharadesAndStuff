package viewModels;

import models.Room;
import models.User;

public class RoomViewModel {
	Room room;
	User user;
	
	public RoomViewModel(Room room, User user) {
		this.room = room;
		this.user = user;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
