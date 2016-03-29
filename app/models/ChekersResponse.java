package models;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import enums.MoveType;
import play.libs.Json;

public class ChekersResponse {
	public String gameId;
	public String black;
	public String white;
	public boolean isWhiteTurn;
	public int[][] gameState;
	
	public ChekersResponse(String gameId,String white,String black,boolean isWhiteTurn,int[][] state)
	{
		this.gameId = gameId;
		this.black = black.replace("\"", "").replace("\\", "");
		this.white = white.replace("\"", "").replace("\\", "");
		this.isWhiteTurn = isWhiteTurn;
		this.gameState = state;
	}
	
	public ObjectNode toJSONReponse()
	{
		ObjectNode result = Json.newObject();
		result.put("gameId", this.gameId);
        result.put("black", this.black);
        result.put("white",this.white);
        result.put("isWhiteTurn",this.isWhiteTurn);
        result.put("gameState",stateTableToString(this.gameState));
        
		return result;
	}
	
	public void performeMoveOnMe(CheckersMove move)
	{
		if(move.moveType == MoveType.m)
		{
			this.gameState[move.fx][move.fy] = 0;
			this.gameState[move.x][move.y] = move.p;
		}
		else if(move.moveType == MoveType.s)
		{
			this.gameState[move.fx][move.fy] = 0;
			this.gameState[move.x][move.y] = move.p;
			this.gameState[move.xs][move.ys] = 0;
		}
	}
	
	
	
	
	
	public void saveToDatabase()
	{
		//pfffffffffffffffffffffff
		saveToFile();
	}
	
	public static ChekersResponse loadFromdatabase(String key)
	{
		//pfffffffffffffffffffffff
		return loadFromFile(key);
	}
	
	private static int[][] convertThisUglySomething(String ugly)
	{
		String uglyState = ugly.replaceAll("[^-?0-9]+", " "); 
		java.util.List<String> values = (java.util.List) Arrays.asList(uglyState.trim().split(" "));
		int[][] toReturn = new int[CheckersModel.numberOfRows][CheckersModel.numberOfRows];
		for(int i =0;i<toReturn.length;i++)
        {
			for(int j =0;j<toReturn[i].length;j++)
	        {
	            toReturn[i][j] = Integer.parseInt(values.get(i*CheckersModel.numberOfRows + j));
	        }
        }
		return toReturn;
	}
	
	
	private static ChekersResponse loadFromFile(String path)
	{
		path = path.replace("\"","");
		System.out.println("loading game id: "  + path);
		try {
			String content = readFile(path.replace("\"","") + ".txt", Charset.defaultCharset());
			
			System.out.println("Reading constent:" + content);
			JsonNode alfa = Json.parse(content);			
			System.out.println("Game id:" + alfa.get("gameId"));

			return new ChekersResponse(
					alfa.get("gameId").toString(),
					alfa.get("black").toString(),
					alfa.get("white").toString(),
					alfa.get("isWhiteTurn").asBoolean(),
					convertThisUglySomething( alfa.get("gameState").toString())
					);
			
		
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	private static String readFile(String path, Charset encoding)  throws IOException 
	{
	  byte[] encoded = Files.readAllBytes(Paths.get(path));
	  return new String(encoded, encoding);
	}
	
	private void saveToFile()
	{
		this.gameId = this.gameId.replace("\"", "");
		this.gameId = this.gameId.replace("\\", "");
		System.out.println("Saving game id: "  + this.gameId);
		try {
			PrintWriter outputFile= new PrintWriter(new FileWriter(this.gameId +".txt"));
			outputFile.println(this.toJSONReponse().toString());
			outputFile.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	private String stateTableToString(int [][] state)
    {
        String[] toReturn = new String[state.length];
        for(int i =0;i<state.length;i++)
        {
            toReturn[i] = Arrays.toString(state[i]);
        }
        return Arrays.toString(toReturn);
    }
	
}
