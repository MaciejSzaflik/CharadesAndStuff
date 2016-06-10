package services;

import java.util.Date;
import java.util.List;

import models.Gamer;
import models.Room;
import models.User;
import repositories.GamerRepository;
import repositories.RoomRepository;

public class RoomService {
	
	private RoomRepository repository;
	private GamerRepository gamerRepository;

	public RoomService() {
		repository = new RoomRepository();
		gamerRepository = new GamerRepository();
	}
	
	public Room get(long id) {
		return repository.get(id);
	}

	public Gamer getGamer(User user) {
		return gamerRepository.get(user.id);
	}

	public List<Room> get(Boolean isStaff) {
		return repository.get(isStaff);
	}

	public void insert(Room room) {
		repository.insert(room);
	}
	
	public void update(Room room) {
		repository.update(room);
	}
	
	public void delete(Room room) {
		repository.delete(room);
	}
	
	public void joinToRoom(Room room, User user) {
		if (checkUserInRoom(room, user)) {
			saveGamerInRoom(room, user);
		}
	}

	private  boolean checkUserInRoom(Room room, User user) {
		boolean inRoom = false;
		Room r = get(room.id);

		for (Gamer g : r.players) {
			if (g.user.id == user.id) {
				inRoom = false;
			}
		}

		return inRoom;
	}

	private void saveGamerInRoom(Room room, User user) {
		Gamer gamer = new Gamer();
		gamer.dateCreation = new Date();
		gamer.dateUpdate = new Date();
		gamer.room = room;
		gamer.user = user;

		gamerRepository.insert(gamer);
	}

	public void refreshRoomTime(Room room) {
		room.dateUpdate = new Date();
		repository.update(room);
	}

	public void refreshGamerTime(User user) {
		Gamer gamer = gamerRepository.get(user.id);
		gamer.dateUpdate = new Date();
		gamerRepository.update(gamer);
	}

	public void refreshRoomExisting(Boolean isStaff) {
		Date date = new Date(new Date().getTime() - (1000 * 5));
		List<Room> rooms = repository.get(isStaff);

		for (Room room : rooms) {
			if (room.dateUpdate.before(date)) {
				repository.delete(room);
			}
			else {
				for (Gamer g : room.players) {
					if (g.dateUpdate.before(date)) {
						gamerRepository.delete(g);
					}
				}
			}
		}
	}
}