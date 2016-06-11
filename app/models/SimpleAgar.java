package models;

import play.mvc.*;
import play.libs.*;
import play.libs.F.*;

import java.nio.channels.ClosedChannelException;
import java.util.*;

public class SimpleAgar{

	/*private class Ball
	{
		int x;
		int y;
		int type;
	}*/
    // collect all websockets here
    private static List<WebSocket.Out<String>> connections = new ArrayList<WebSocket.Out<String>>();
	//private static List<Ball> = new ArrayList<Ball>();
    public static void start(WebSocket.In<String> in, WebSocket.Out<String> out){
        
        connections.add(out);
        System.out.println("Connection started");
        in.onMessage(new Callback<String>(){
            public void invoke(String event){
				
				System.out.println("count:" + connections.size());
				
                try {
					SimpleAgar.notifyAll(event);
				} catch (ClosedChannelException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
        });
        
        in.onClose(new Callback0(){
            public void invoke(){
                try {
					SimpleAgar.notifyAll("A connection closed");
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