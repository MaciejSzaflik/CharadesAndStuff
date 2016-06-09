package test.models;

import org.junit.Assert;
import org.junit.Test;

import models.Gamer;
import models.Room;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

import play.test.*;
import static play.test.Helpers.*;

public class GameRoomTests {
    Room room;
    
    @Test
    public void GameRoomTests_AddRoom() {
        running(fakeApplication(), new Runnable() {
            public void run() {
              room = getRoom();
              room.save();
              
              Assert.assertNotNull(room.id);
            }
          });
    }
    
    private Room getRoom() {
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
}