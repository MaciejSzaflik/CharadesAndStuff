package providers;

import java.util.List;

import com.avaje.ebean.Model;

import models.Gamer;
import models.Room;

public class GamerDao implements Dao<Gamer> {
    private static Model.Finder<Long, Gamer> find;

    public GamerDao() {
    	find = new Model.Finder<Long, Gamer>(Long.class, Gamer.class);
    }
    
	@Override
	public Gamer get(long id) {
		return find
				.where()
				.eq("user_id", id)
				.findUnique();
	}

	@Override
	public List<Gamer> get(Boolean value) {
		return find.findList();
	}

	public List<Gamer> getByRoom(long id) {
		return find
				.where()
				.eq("room_id", id)
				.findList();
	}

	@Override
	public void insert(Gamer gamer) {
		gamer.insert();
	}

	@Override
	public void update(Gamer gamer) {
		gamer.update();
	}

	@Override
	public void delete(Gamer gamer) {
		gamer.delete();
	}

}
