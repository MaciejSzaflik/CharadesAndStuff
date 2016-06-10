package services;
import org.junit.Assert;
import org.junit.Test;
import play.test.*;
import static play.test.Helpers.*;

public class UserTest {
	static models.User user;
	UserService service = new UserService();

	private static models.User getUser() {
		user = new models.User();
		user.cookie = "panda5";
		user.name = "indyk";

		return user;
	}

	@Test
	public void AddUser_ShouldReturnGoodId() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				user = getUser();
				service.insert(user);

				Assert.assertNotNull(user.id);
			}
		});
	}

	@Test
	public void GetRoom_ShouldReturnGoodId() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				user = getUser();
				service.insert(user);
				user = service.get(user.id);

				Assert.assertNotNull(user.id);
			}
		});
	}


	@Test
	public void DeleteRoom_ShouldReturnGoodId() {
		running(fakeApplication(), new Runnable() {
			public void run() {
				user = getUser();
				service.insert(user);
				service.delete(user);
				user = service.get(user.id);

				Assert.assertNull(user);
			}
		});
	}
}