package models.websockets;

import play.mvc.*;
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
import viewModels.Lobby;

public class LobbyWebSocket {

    private static List<WebSocket.Out<String>> connections = new ArrayList<WebSocket.Out<String>>();
    
    public static void start(WebSocket.In<String> in, WebSocket.Out<String> out) {
        connections.add(out);
        
        in.onMessage(new Callback<String>(){
            public void invoke(String event){
                try {
					LobbyWebSocket.notifyAll(event);
				} catch (ClosedChannelException e) {
					e.printStackTrace();
				}
            }
        });
         
        in.onClose(new Callback0(){
            public void invoke(){
                try {
					LobbyWebSocket.notifyAll("A connection closed");
				} catch (ClosedChannelException e) {
					e.printStackTrace();
				}
            }
        });
    }
    
    public static void notifyAll(String message) throws LobbyWebSocketCloseException {
    	viewModels.Lobby lobby = new viewModels.Lobby(message);
    	System.out.println("lobby: " + toJson(lobby));

        for (WebSocket.Out<String> out : connections) {
            out.write(toJson(lobby));
        }
    }
    
    private static String toJson(viewModels.Lobby lobby) {
    	Gson gson = new Gson();
    	String json = gson.toJson(lobby);

    	return json;
    }
    
    private class LobbyWebSocketCloseException extends java.nio.channels.ClosedChannelException {
    	public LobbyWebSocketCloseException() {
    		super();
    	}
    }
}