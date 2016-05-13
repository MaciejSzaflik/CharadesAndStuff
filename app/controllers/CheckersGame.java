package controllers;

import models.User;
import models.CheckersModel;
import models.CheckersMove;
import models.ChekersResponse;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import play.mvc.BodyParser;
import views.html.checkersBoard.index;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import play.cache.Cache;
import play.libs.Json;

import java.util.Arrays;


public class CheckersGame extends Controller {

    public String gameId = "wat";
    public String player = "white";
	
    public Result index() {
    	this.gameId = (String) Cache.get("gameId");
    	this.player = (String) Cache.get("player");
        return ok(index.render(this.gameId,this.player));
    }
    
    @BodyParser.Of(BodyParser.Json.class)
    public Result initGame() {
    	JsonNode data = request().body().asJson();

        if(data == null) {
            System.out.println("Game id is null!!!");
            return ok();
        }
        String gameId = data.get("gameIdInfo").textValue();
    	
        ChekersResponse response = CheckersModel.getInitialResponse(gameId);
        System.out.println("Recived init:"+ gameId + " " + response.toJSONReponse().toString());

        return ok(response.toJSONReponse());
    }
    
    @BodyParser.Of(BodyParser.Json.class)
    public Result getGameState() {
    	 JsonNode data = request().body().asJson();
    	 String gameId = data.get("gameIdInfo").textValue();
    	 
    	 ChekersResponse response = CheckersModel.getGameState(gameId);
    	 return ok(response.toJSONReponse());
    }
    
    
    private String stateTableToString(int [][] state) {
        String[] toReturn = new String[state.length];

        for(int i =0;i<state.length;i++)
        {
            toReturn[i] = Arrays.toString(state[i]);
        }

        return Arrays.toString(toReturn);
    }
    
    @BodyParser.Of(BodyParser.Json.class)
    public Result move() {
        JsonNode data = request().body().asJson();

        if(data == null) {
            System.out.println("null");

            return ok();
        }   
    	
	ChekersResponse response = CheckersModel.performoveTheMove(data.get("gameIdInfo").toString(), new CheckersMove(data.get("move")));
        
	return ok(response.toJSONReponse());
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
