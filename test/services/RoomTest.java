package services;
import org.junit.Assert;
import org.junit.Test;

import models.Gamer;
import models.Room;
import play.test.*;
import static play.test.Helpers.*;

import java.util.ArrayList;
import java.util.Date;

public class RoomTest {
    Room room;
    RoomService service = new RoomService();
    
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