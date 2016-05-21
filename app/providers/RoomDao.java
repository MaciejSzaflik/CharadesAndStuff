package providers;

import java.util.List;

import com.avaje.ebean.Model;

import models.Room;
import models.User;

public class RoomDao implements Dao<Room> {
    @SuppressWarnings("unchecked")
    private static Model.Finder<Long, Room> find;
    
    public RoomDao() {
    	find = new Model.Finder<Long, Room>(Long.class, Room.class);
    }
    
    public List<Room> get(Boolean iStuff) {
    	return 
    			find
    			.where()
    			.eq("iStuff", iStuff)
    			.findList();
    }
    
    public Room get(long id) {
    	return find.byId(id);
    }
    
	public void insert(Room room) {
		System.out.println("Save room in database");
		System.out.println(room.toString());
		room.save();
		System.out.println("Success, yeah! Saved room in database");
	}
	
	public void update(Room room) {
		room.save();
	}
	
	public void delete(Room room) {
		room.delete();
	}
}
