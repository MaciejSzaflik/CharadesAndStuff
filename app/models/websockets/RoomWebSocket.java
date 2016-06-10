package models.websockets;

import play.mvc.*;
import services.RoomService;
import services.UserService;
import viewModels.RoomViewModel;
import play.libs.*;
import play.libs.F.*;

import java.nio.channels.ClosedChannelException;
import java.util.*;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.google.gson.Gson;
import com.typesafe.config.ConfigException.Parse;

import models.Room;
import models.User;

public class RoomWebSocket {

    private static List<WebSocket.Out<String>> connections = new ArrayList<WebSocket.Out<String>>();
    
    public static void start(WebSocket.In<String> in, WebSocket.Out<String> out) {
        connections.add(out);
        
        in.onMessage(new Callback<String>(){
            public void invoke(String event){
                try {
					RoomWebSocket.notifyAll(event);
				} catch (ClosedChannelException e) {
					e.printStackTrace();
				}
            }
        });
         
        in.onClose(new Callback0(){
            public void invoke(){
                try {
					RoomWebSocket.notifyAll("A connection closed");
				} catch (ClosedChannelException e) {
					e.printStackTrace();
				}
            }
        });
    }
    
    public static void notifyAll(String message) throws LobbyWebSocketCloseException {
    	RoomViewModel model = fromJson(message);
    	
    	RoomService roomService = new RoomService();
    	UserService userService = new UserService();
    	
    	Room room = roomService.get((long) model.getRoom().id);
    	User user = userService.get(model.getUser().cookie);
    	roomService.refreshGamerTime(user);
    	roomService.refreshRoomTime(roomService.getGamer(user).room);
		
    	model = new RoomViewModel(room, user);
    	
        for (WebSocket.Out<String> out : connections) {
            out.write(toJson(model));
        }
    }
    
    private static RoomViewModel fromJson(String json) {
    	Gson gson = new Gson();
    	RoomViewModel model = gson.fromJson(json, RoomViewModel.class);
    	return model;
    }
    
    private static String toJson(RoomViewModel model) {
    	Gson gson = new Gson();
    	String json = gson.toJson(model);
    	return json;
    }
    
    private class LobbyWebSocketCloseException extends java.nio.channels.ClosedChannelException {
    	public LobbyWebSocketCloseException() {
    		super();
    	}
    }
}