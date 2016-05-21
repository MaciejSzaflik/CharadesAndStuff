package services;

import java.util.List;
import models.Room;
import models.User;
import providers.Dao;
import providers.RoomDao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

public class RoomServices {
	
	private Dao<Room> provider;
	
	public RoomServices() {
		provider = new RoomDao();
	}
	
	public Room get(long id) {
		return provider.get(id);
	}

	public List<Room> get(Boolean isStaff) {
		return provider.get(isStaff);
	}

	public void insert(Room room) {
		System.out.println("Send model Room to provider");
		provider.insert(room);
	}
	
	public void update(Room room) {
		provider.update(room);
	}
	
	public void delete(Room room) {
		provider.delete(room);
	}
	
	public void joinToRoom(Room room, User user) {
		// TODO
	}
	
	private void refreshRoom() {
		// TODO
	}
}