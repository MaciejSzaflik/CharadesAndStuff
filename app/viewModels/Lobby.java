package viewModels;

import java.util.Date;
import java.util.List;

import commons.GameNameValidation;
import models.Room;
import services.RoomService;

public class Lobby {
	
	String gameType;
	Date lastUpdate;
	boolean isValid;
	int maxPlayer;
	List<Room> rooms;
	
	private RoomService service = new RoomService();
	
	public Lobby(String gameType) {
		if (validateGameType(gameType)) {
			this.gameType = gameType;
			this.lastUpdate = new Date();
			this.isValid = true;
			
			if (GameNameValidation.isCheckers(gameType)) {
				this.maxPlayer = 2;
			}
			else {
				this.maxPlayer = 10;
			}
			
			rooms = service.get(GameNameValidation.isCheckers(gameType));
			
		}
		else {
			this.gameType = gameType;
			this.isValid = false;
		}
	}
	
	private boolean validateGameType(String gameType) {
		if (GameNameValidation.validation(gameType)) {
			return true;
		}
		
		return false;
	}

	@Override
	public String toString() {
		return "Lobby [gameType=" + gameType + ", lastUpdate=" + lastUpdate + ", isValid=" + isValid + ", maxPlayer="
				+ maxPlayer + ", rooms=" + rooms + ", service=" + service + "]";
	}
	
}
