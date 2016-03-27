package models;

import com.avaje.ebean.Model;
import java.util.UUID;

public class CheckersModel extends Model {
    private static final int numberOfRows = 8;
    
    public static String generateNewUUID(){
        return UUID.randomUUID().toString();
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