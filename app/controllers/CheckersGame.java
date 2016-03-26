package controllers;

import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.checkersBoard.index;
import com.fasterxml.jackson.databind.JsonNode;


public class CheckersGame extends Controller {

    public enum  MoveType{
        m,
        s
    }
    
    
    public Result index() {
        return ok(index.render());
    }
    
    public Result test() {
        System.out.println("alfa");
        return ok(index.render());
    }
    
    public Result move() {
        JsonNode data = request().body().asJson();
        if(data == null){
            System.out.println("null");
            return ok();
        } else {
            System.out.println("Got data: "+data);
            return ok((new CheckersMove(data)).toString());
        }
        
    }
    
    public class CheckersMove{
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
    
   /* 
    
    public static class TestingForm {

        @Constraints.Required
        public String ;
        @Constraints.Required
        public String password;


        public String validate() {

            User user = null;
            try {
                user = User.authenticate(email, password);
            } catch (AppException e) {
                return Messages.get("error.technical");
            }
            if (user == null) {
                return Messages.get("invalid.user.or.password");
            } else if (!user.validated) {
                return Messages.get("account.not.validated.check.mail");
            }
            return null;
        }

    }
	*/
}
