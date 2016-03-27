package models;
import com.fasterxml.jackson.databind.JsonNode;


public class CheckersMove{
    
    public enum  MoveType{
        m,
        s
    }
    
    public MoveType moveType;
    public int x;
    public int y;
    public int xs;
    public int ys;
        
    public CheckersMove(JsonNode node)
    {
        this.x = node.get("x").intValue();
        this.y = node.get("y").intValue();
    }
    
    public String toString(){
        return String.format("x is: %1$d || y is %1$d !!!! wow" , x, y);
    }
}
    