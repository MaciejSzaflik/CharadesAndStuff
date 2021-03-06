package controllers;

import models.User;
import models.utils.AppException;
import models.websockets.LobbyWebSocket;
import models.websockets.SimpleChat;
import models.websockets.SimplePaint;
import play.Logger;
import play.cache.Cache;
import play.data.Form;
import play.data.validation.Constraints;
import play.i18n.Messages;
import play.libs.Akka;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;
import views.html.index;
import static play.data.Form.form;

import akka.actor.ActorRef;
import akka.actor.Props;
import scala.concurrent.duration.Duration;
import java.util.concurrent.TimeUnit;

public class Application extends Controller {

    public static Result GO_HOME = redirect(
            routes.Application.index()
    );

    public static Result GO_CHECKERS = redirect(
            routes.CheckersGame.index()
    );

    public Result index() {
    	return ok(index.render(form(GameId.class), form(ChatRedirector.class), form(PaintRedirector.class)));
    }
    
    public WebSocket<String> wsInterface(){
        return new WebSocket<String>(){ 
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out){
                    SimpleChat.start(in, out);
            }
        };   
    }
    
    public WebSocket<String> wsPaintInterface(){
        return new WebSocket<String>(){ 
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out){
                    SimplePaint.start(in, out);
            }
        };   
    }
    
    
    public Result goToChat() {
        return ok(views.html.chat.render());
    }
    
    public Result wsJs() {
        return ok(views.js.ws.render());
    }
    
    public Result goToPaint() {
        return ok(views.html.paintScreen.render());
    }
    
    public Result wsPaintJs() {
        return ok(views.js.wsPaint.render());
    }

    public static class GameId {

    	@Constraints.Required
        public String gameId;

        public Result validate() {
            return null;
        }

    }
    
    public static class ChatRedirector {

        public Result validate() {
            return null;
        }
    }
    
    public static class PaintRedirector {

        public Result validate() {
            return null;
        }
    }

    public Result goToCheckers(){
        Form<GameId> checkersForm = form(GameId.class).bindFromRequest();
        
        String[] dataToProcess = checkersForm.get().gameId.split(";");
        if(dataToProcess.length == 2 && (dataToProcess[1].equals("black") || dataToProcess[1].equals("white")))
        {
	        Cache.set("gameId",dataToProcess[0]);
	        Cache.set("player",dataToProcess[1]);
	        return redirect(routes.CheckersGame.index());
        }
        else
        {
        	System.out.println("error bad params");
        	return GO_HOME;
        }

    }
    
    public WebSocket<String> LobbyWebSocket(){
        return new WebSocket<String>() { 
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out){
                    LobbyWebSocket.start(in, out);
            }
        };   
    }
    
    public WebSocket<String> RoomWebSocket(){
        return new WebSocket<String>() { 
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out){
                    models.websockets.RoomWebSocket.start(in, out);
            }
        };   
    }
}