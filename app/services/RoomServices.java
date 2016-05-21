package services;

import java.util.Date;
import java.util.List;

import models.Game;
import models.Gamer;
import models.Room;
import models.User;
import providers.Dao;
import providers.GamerDao;
import providers.RoomDao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

public class RoomServices {
	
	private Dao<Room> provider;
	private Dao<Gamer> gamerProvider;

	public RoomServices() {
		provider = new RoomDao();
		gamerProvider = new GamerDao();
	}
	
	public Room get(long id) {
		return provider.get(id);
	}

	public Gamer getGamer(User user) {
		return gamerProvider.get(user.id);
	}

	public List<Room> get(Boolean isStaff) {
		return provider.get(isStaff);
	}

	public void insert(Room room) {
		provider.insert(room);
	}
	
	public void update(Room room) {
		provider.update(room);
	}
	
	public void delete(Room room) {
		provider.delete(room);
	}
	
	public void joinToRoom(Room room, User user) {
		Gamer gamer = new Gamer();
		gamer.dateCreation = new Date();
		gamer.dateUpdate = new Date();
		gamer.room = room;
		gamer.user = user;

		gamerProvider.insert(gamer);
	}

	public void refreshRoomTime(Room room) {
		room.dateUpdate = new Date();
		provider.update(room);
	}

	public void refreshGamerTime(User user) {
		Gamer gamer = gamerProvider.get(user.id);
		gamer.dateUpdate = new Date();
		gamerProvider.update(gamer);
	}

	public void refreshRoomExisting(Boolean isStaff) {
		Date date = new Date(new Date().getTime() - (1000 * 60));
		List<Room> rooms = provider.get(isStaff);

		for (Room room : rooms) {
			if (room.dateUpdate.before(date)) {
				for (Gamer g : room.players) {
					gamerProvider.delete(g);
				}

				provider.delete(room);
			}
			else {
				for (Gamer g : room.players) {
					if (g.dateUpdate.before(date)) {
						gamerProvider.delete(g);
					}
				}
			}
		}
	}
}