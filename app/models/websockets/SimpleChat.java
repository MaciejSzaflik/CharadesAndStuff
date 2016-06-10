package models.websockets;

import play.mvc.*;
import play.libs.*;
import play.libs.F.*;

import java.nio.channels.ClosedChannelException;
import java.util.*;

public class SimpleChat{

    // collect all websockets here
    private static List<WebSocket.Out<String>> connections = new ArrayList<WebSocket.Out<String>>();
    
    public static void start(WebSocket.In<String> in, WebSocket.Out<String> out){
        
        connections.add(out);
        
        in.onMessage(new Callback<String>(){
            public void invoke(String event){
                try {
					SimpleChat.notifyAll(event);
				} catch (ClosedChannelException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
        });
        
        in.onClose(new Callback0(){
            public void invoke(){
                try {
					SimpleChat.notifyAll("A connection closed");
				} catch (ClosedChannelException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
        });
    }
    
    // Iterate connection list and write incoming message
    public static void notifyAll(String message) throws java.nio.channels.ClosedChannelException{
        for (WebSocket.Out<String> out : connections) {
            out.write(message);
        }
    }
}