package repositories;

import java.util.List;
import com.avaje.ebean.Model;
import models.Room;

public class RoomRepository implements RepositoryBase<Room> {
    @SuppressWarnings("unchecked")
    private static Model.Finder<Long, Room> find;
    
    public RoomRepository() {
    	find = new Model.Finder<Long, Room>(Long.class, Room.class);
    }
    
    public List<Room> get(Boolean isCheckers) {
    	return
    			find
    			.where()
    			.eq("isCheckers", isCheckers)
    			.findList();
    }
    
    public Room get(long id) {
    	return find.byId(id);
    }
    
	public void insert(Room room) {
		room.save();
	}
	
	public void update(Room room) {
		room.save();
	}
	
	public void delete(Room room) {
		room.delete();
	}
}
