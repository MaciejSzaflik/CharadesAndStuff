package domains.exceptions;

public class GameNotFoundException extends IllegalArgumentException {
	public GameNotFoundException (String message) { 
		super(message); 
	}
}
