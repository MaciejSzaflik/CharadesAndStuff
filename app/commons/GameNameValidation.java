package commons;

import enums.GameName;

public class GameNameValidation {
	public static boolean Validation(String name) {
		if (name.equals(GameName.charades.toString()) || name.equals(GameName.stuff.toString())) {
			return true;
		}
		
		return false;
	}
	
	public static boolean isStuff(String name) {
		if (name.equals(GameName.stuff.toString())) {
			return true;
		}
		
		return false;
	}
	
	public static boolean isCharades(String name) {
		if (name.equals(GameName.charades.toString())) {
			return true;
		}
		
		return false;
	}
}
