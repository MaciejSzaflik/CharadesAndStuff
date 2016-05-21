package controllers;

import play.cache.Cache;
import play.mvc.Controller;
import play.mvc.Result;
import services.DatabaseOperation;
import services.RoomServices;
import views.html.Lobby.index;
import views.html.Lobby.error;
import views.html.Lobby.insert;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import commons.GameNameValidation;
import domains.exceptions.GameNotFoundException;
import play.libs.Json;
import models.Gamer;
import models.Room;
import models.User;
import viewModels.*;

public class Lobby extends Controller {

	RoomServices service = new RoomServices();
	
    public Result index(String name) {
    	if (!GameNameValidation.Validation(name)) {
    		throw new GameNotFoundException("Not found game");
    	}
		List<Room> rooms = service.get(GameNameValidation.isStuff(name));
		LobbyViewModel model = new LobbyViewModel(name, rooms);

    	System.out.print(model.toString());

        return 
        		ok(index.render(model));
    }
    
    public Result createRoom(String name) {
    	if (!GameNameValidation.Validation(name)) {
    		throw new GameNotFoundException("Not found game");
    	}
    	
    	if (roomSave(name)) {
    		return 
        			ok(insert.render("aaa1"));
    	}
    	
    	return 
    			ok(insert.render("dd1"));	
    }
    
    private boolean roomSave(String gameName) {
    	if (!GameNameValidation.isStuff(gameName)) {
    		if (!GameNameValidation.isCharades(gameName)) {
        		throw new GameNotFoundException("Not found game");
        	}
    	}
    	
    	try {
    		boolean isStuff = GameNameValidation.isStuff(gameName);
	    	Room room = newRoom(1, 0, isStuff);
	    	System.out.println(room);
	    	service.insert(room);
	    	return true;
    	}
    	catch (Exception ex) {
    		System.out.println(ex);
    	}
    	
    	return false;
    }
    
    public static void joinToRoom(long id) {
    	
    }
    
    public static void refreshRoom() {
    
    }
    
    public static void getRooms() {
    	
    }
    
    public Result getRoom(Long id) {
    	return 
    			ok("ok");
    }
    
    public Result error() {
    	//throw new GameNotFoundException("Not found game");
    	return 
    			ok(error.render());
    }
    
    private Result updateRooms(Room room) {
    	service.update(room);
    	return 
    			ok("ok");
    }
    
    private Result deleteRoom(Room room) {
    	service.delete(room);
    	return 
    			ok("ok");
    }
    
    private Room newRoom(long chatId, long gameId, boolean iStuff) {
    	Room room = new Room();
    	room.id = new Long(0);
    	room.chatId = chatId;
    	room.dateCreation = new Date();
    	room.dateUpdate =  new Date();
    	room.gameId = gameId;
    	room.isRunning = false;
    	room.iStuff = iStuff;
    	room.params = "NO PARAMS";  	
    	room.isRunning = false;
    	room.players = new ArrayList<Gamer>();
    	
    	System.out.println(room);
    	return room;
    }
}