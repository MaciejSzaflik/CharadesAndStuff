package models;

import play.mvc.*;
import play.libs.*;
import play.libs.F.*;

import java.nio.channels.ClosedChannelException;
import java.util.*;

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
    	System.out.println(message);
        for (WebSocket.Out<String> out : connections) {
            out.write(message);
        }
    }
    
    private class LobbyWebSocketCloseException extends java.nio.channels.ClosedChannelException {
    	public LobbyWebSocketCloseException() {
    		super();
    	}
    }
}