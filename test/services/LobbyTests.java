package services;
import org.junit.Assert;
import org.junit.Test;

import models.Gamer;
import models.Room;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

import play.test.*;
import static play.test.Helpers.*;

public class LobbyTests {
    Room room;
    RoomServices service = new RoomServices();
    
    private static Room getRoom() {
        Room room = new Room();
        room.dateCreation = new Date();
        room.dateUpdate = new Date();
        room.isCheckers = true;
        room.isRunning = false;
        room.gameId = new Long(1);
        room.chatId = new Long(1);
        room.params = "";
    	room.players = new ArrayList<Gamer>();
    	
    	return room;
    }
    
    @Test
    public void AddRoom_ShouldReturnGoodId() {
        running(fakeApplication(), new Runnable() {
            public void run() {
              room = getRoom();
              service.insert(room);
                            
              Assert.assertNotNull(room.id);
            }
          });
    }
    
    @Test
    public void GetRoom_ShouldReturnGoodId() {
        running(fakeApplication(), new Runnable() {
            public void run() {
              room = getRoom();
              service.insert(room);
              room = service.get(room.id);
            		  
              Assert.assertNotNull(room.id);
            }
          });
    }
    
    
    @Test
    public void DeleteRoom_ShouldReturnGoodId() {
        running(fakeApplication(), new Runnable() {
            public void run() {
              room = getRoom();
              service.insert(room);
              service.delete(room);
              room = service.get(room.id);

              Assert.assertNull(room);
            }
          });
    }
}