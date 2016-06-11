package controllers;

import models.Game;
import play.Configuration;
import play.i18n.Messages;
import play.cache.Cache;
import play.mvc.Controller;
import play.mvc.Result;
import services.DatabaseOperation;
import services.RoomService;
import services.UserService;
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
	private RoomService service = new RoomService();
	private UserService userService = new UserService();
	
    public Result index(String name) {
    	if (!GameNameValidation.validation(name)) {
    		throw new GameNotFoundException(Messages.get("lobby.not.found.game"));
    	}
		try {
			List<Room> rooms = service.get(GameNameValidation.isCheckers(name));
			LobbyViewModel model = new LobbyViewModel(name, rooms);
			service.refreshRoomExisting(GameNameValidation.isCheckers(name));
			return ok(index.render(model));
		}
		catch (DatabaseInUseException ex) {
			return index(name);
		}
    }
    
    public Result createRoom(String name) {
    	if (!GameNameValidation.validation(name)) {
    		throw new GameNotFoundException(Messages.get("lobby.not.found.game"));
    	}
    	
    	Room room = roomSave(name);

    	if (room.id != null || room.id != 0) {
    		return ok(insert.render(room.id.toString()));
    	}
    	
    	return ok(insert.render("0"));
    }
    
    private Room roomSave(String gameName) {
    	if (!GameNameValidation.validation(gameName)) {
    		throw new GameNotFoundException(Messages.get("lobby.not.found.game"));
    	}
    	
    	try {
    		boolean isCheckers = GameNameValidation.isCheckers(gameName);
	    	Room room = newRoom(0, 0, isCheckers);
	    	service.insert(room);
	    	return room;
    	}
    	catch (Exception ex) {
    		System.out.println(ex.getStackTrace());
    	}
    	
    	return new Room();
    }
    
    public void joinToRoom(long id, String cookie) {
		Room room = service.get(id);
		User user = userService.get(cookie);
		service.joinToRoom(room, user);
    }
    
    public void refreshRoom(Boolean isStuff) {
    	service.refreshRoomExisting(isStuff);
    }

	public void refreshUser(String cookie) {
		User user = userService.get(cookie);
		service.refreshGamerTime(user);
		service.refreshRoomTime(service.getGamer(user).room);
	}
    
    public void getRooms(String gameName) {
		if (!GameNameValidation.isCheckers(gameName)) {
			if (!GameNameValidation.isCharades(gameName)) {
				throw new GameNotFoundException(Messages.get("lobby.not.found.game"));
			}
		}

		List<Room> rooms = service.get(GameNameValidation.isCheckers(gameName));
	}
    
    public Result getRoom(Long id) {
		Room room = service.get(id);

    	return 
    			ok("ok");
    }
    
    public Result error() {
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
    
    private Room newRoom(long chatId, long gameId, boolean iCheckers) {
    	Room room = new Room();
    	room.id = new Long(0);
    	room.chatId = chatId;
    	room.dateCreation = new Date();
    	room.dateUpdate = new Date();
    	room.gameId = gameId;
    	room.isRunning = false;
    	room.isCheckers = iCheckers;
    	room.params = "NO PARAMS";  	
    	room.isRunning = false;
    	room.players = new ArrayList<Gamer>();
		Gamer gamer = new Gamer();
		gamer.dateUpdate = new Date();
		gamer.dateCreation = new Date();
		gamer.user = userService.get("gracz-1");
		room.players.add(gamer);
		return room;
    }
    
    private class DatabaseInUseException extends EntityNotFoundException {
    	public DatabaseInUseException() { 
    		super(); 
    	}
    }
}