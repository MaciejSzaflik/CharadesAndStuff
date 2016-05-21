package controllers;

import models.Game;
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
import javax.persistence.EntityNotFoundException;

public class Lobby extends Controller {

	RoomServices service = new RoomServices();
	
    public Result index(String name) {
    	if (!GameNameValidation.Validation(name)) {
    		throw new GameNotFoundException("Not found game");
    	}
		try {
			List<Room> rooms = service.get(GameNameValidation.isStuff(name));
			LobbyViewModel model = new LobbyViewModel(name, rooms);
			service.refreshRoomExisting(GameNameValidation.isStuff(name));
			return ok(index.render(model));
		}
		catch (EntityNotFoundException ex) {
			return index(name);
		}
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
	    	Room room = newRoom(0, 0, isStuff);
	    	service.insert(room);
	    	return true;
    	}
    	catch (Exception ex) {
    		System.out.println(ex.getStackTrace());
    	}
    	
    	return false;
    }
    
    public void joinToRoom(long id) {
		Room room = service.get(id);
		User user = User.findByEmail(request().username());
		service.joinToRoom(room, user);
    }
    
    public void refreshRoom(Boolean isStuff) {
    	service.refreshRoomExisting(isStuff);
    }

	public void refreshUser() {
		User user = User.findByEmail(request().username());
		service.refreshGamerTime(user);
		service.refreshGamerTime(user);
	}
    
    public void getRooms(String gameName) {
		if (!GameNameValidation.isStuff(gameName)) {
			if (!GameNameValidation.isCharades(gameName)) {
				throw new GameNotFoundException("Not found game");
			}
		}

		List<Room> rooms = service.get(GameNameValidation.isStuff(gameName));
	}
    
    public Result getRoom(Long id) {
		Room room = service.get(id);

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
    	room.dateUpdate = new Date();
    	room.gameId = gameId;
    	room.isRunning = false;
    	room.iStuff = iStuff;
    	room.params = "NO PARAMS";  	
    	room.isRunning = false;
    	room.players = new ArrayList<Gamer>();
		Gamer gamer = new Gamer();
		gamer.dateUpdate = new Date();
		gamer.dateCreation = new Date();
		gamer.user = User.findByEmail(session("email"));
		room.players.add(gamer);
		return room;
    }
}