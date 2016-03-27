package controllers;

import models.User;
import models.CheckersModel;
import models.CheckersMove;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import play.mvc.BodyParser;
import views.html.checkersBoard.index;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;


public class CheckersGame extends Controller {

    public Result index() {
        return ok(index.render());
    }
    
    public Result test() {
        System.out.println("alfa");
        return ok(index.render());
    }
    
    public Result initGame()
    {
        int[][] boardState = CheckersModel.getStartState();
        String playerId = CheckersModel.generateNewUUID();
        return ok();
    }
    
    @BodyParser.Of(BodyParser.Json.class)
    public Result move() {
        JsonNode data = request().body().asJson();
        if(data == null){
            System.out.println("null");
            return ok();
        } else {
            String info = (new CheckersMove(data)).toString();
            ObjectNode result = Json.newObject();
            result.put("data", info);
            
            return ok(result);
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
