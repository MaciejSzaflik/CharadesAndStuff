package controllers;

import com.google.gson.Gson;
import play.mvc.Controller;
import play.mvc.Result;
import services.UserService;

public class User extends Controller {
	private UserService service = new UserService();
	
    public Result index() {
    	return ok("ok");
    }
    
    public Result create(String name) {
    	models.User user = makeUser(name);
    	service.insert(user);
    	Gson gson = new Gson();
    	String json = gson.toJson(user);
    	return ok(json);
    }
    
    private models.User makeUser(String name) {
    	models.User user = new models.User();
    	user.name = name;
    	user.cookie = "dadad";
    	return user;
    }
    
    public Result get(String cookie) {
    	models.User user = service.get(cookie);
    	Gson gson = new Gson();
    	String json = gson.toJson(user);
    	return ok(json);
    }
}