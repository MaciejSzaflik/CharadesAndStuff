package models;
import com.fasterxml.jackson.databind.JsonNode;
import enums.MoveType;

public class CheckersMove{
    
    public MoveType moveType;
    public int x;
    public int y;
    public int xs;
    public int ys;
    public int fx;
    public int fy;
    public int p;
        
    public CheckersMove(JsonNode node)
    {
    	this.moveType = MoveType.valueOf(node.get("t").toString().replace("\"", ""));
        this.x = node.get("x").intValue();
        this.y = node.get("y").intValue();
        this.xs = node.get("xs").intValue();
        this.ys = node.get("ys").intValue();
        this.fx = node.get("fx").intValue();
        this.fy = node.get("fy").intValue();
        this.p = node.get("p").intValue();
    }
    
    public String toString(){
        return String.format("x is: %1$d || y is %1$d !!!! wow" , x, y);
    }
}
    