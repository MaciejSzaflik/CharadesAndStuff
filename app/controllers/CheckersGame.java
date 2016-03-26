package controllers;

import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.checkersBoard.index;


public class CheckersGame extends Controller {

    public Result index() {
        return ok(index.render());
    }
    
    public Result test() {
        System.out.println("alfa");
        return ok(index.render());
    }
    
    public Result move() {
        return ok();
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
