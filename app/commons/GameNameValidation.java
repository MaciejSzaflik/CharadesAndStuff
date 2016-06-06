package commons;

import enums.GameName;

public class GameNameValidation {
	public static boolean validation(String name) {
		if (name.equals(GameName.charades.toString()) || name.equals(GameName.checkers.toString())) {
			return true;
		}
		
		return false;
	}
	
	public static boolean isCheckers(String name) {
		if (name.equals(GameName.checkers.toString())) {
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
