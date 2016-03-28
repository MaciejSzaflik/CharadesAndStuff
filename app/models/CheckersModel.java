package models;

import com.avaje.ebean.Model;

import java.io.File;
import java.util.UUID;

public class CheckersModel extends Model {
	
	public enum GameState{
        NewGame,
        JoinToGame,
        Spectator
    }
	
	
    public static final int numberOfRows = 8;
    
    public static String generateNewUUID(){
        return UUID.randomUUID().toString();
    }
    
    public static ChekersResponse getInitialResponse(String gameId){
    	
    	ChekersResponse response = decideGameState(gameId);
    	response.saveToDatabase();
		return response;
    }
    public static ChekersResponse getGameState(String gameId){
    	
    	ChekersResponse response = decideGameState(gameId);
		return response;
    }
    
    public static ChekersResponse performoveTheMove(String gameId,CheckersMove move)
    {
    	ChekersResponse response = ChekersResponse.loadFromdatabase(gameId);
    	response.performeMoveOnMe(move);
    	response.saveToDatabase();
		return response;
    }
    
    private static ChekersResponse decideGameState(String gameId)
    {
    	if(checkKey(gameId))
    	{
    		ChekersResponse response = ChekersResponse.loadFromdatabase(gameId);
    		if(response.white !=null && response.black!=null)
    			return response;
    		else
    			return response;
    	}
    	return new ChekersResponse(gameId, "a", "b", true, getStartState());
    }
    
    private static boolean checkKey(String key)
    {
    	//pfffffffffffffffffffff
    	return fileExistanceCheck(key);
    }
    private static boolean fileExistanceCheck(String key)
    {
    	File f = new File(key + ".txt");
    	return f.exists();
    }
    
    public static ChekersResponse tryingToPlay(String gameId)
    {
		return null;
    	
    }
    
    public static int[][] getStartState(){
        int [][] toReturn = new int[numberOfRows][numberOfRows];
        for(int i = 0;i<numberOfRows;i++)
        {
            for(int j = 0;j<numberOfRows;j++)
            {
                int val = (i<5)?1:2;
				val = (i == 3 || i == 4)?0:val;
					if(i%2 == 1)
						toReturn[i][j] =  j%2==1?val:0;
					else 
						toReturn[i][j] =  j%2==1?0:val;

            }
        }
        return toReturn;
    }
}