package repositories;

import java.util.List;
import com.avaje.ebean.Model;
import models.User;

public class UserRepository implements RepositoryBase<User> {
    @SuppressWarnings("unchecked")
    private static Model.Finder<Long, User> find;
    
    public UserRepository() {
    	find = new Model.Finder<Long, User>(Long.class, User.class);
    }
    
    public User get(long id) {
    	return find.byId(id);
    }
    
	public void insert(User user) {
		user.save();
	}
	
	public void update(User user) {
		user.save();
	}
	
	public void delete(User user) {
		user.delete();
	}

	public User get(String cookie) {
		return null;
	}
	
    public static User findByCookie(String cookie) {
        return find.where().eq("cookie", cookie).findUnique();
    }
}
