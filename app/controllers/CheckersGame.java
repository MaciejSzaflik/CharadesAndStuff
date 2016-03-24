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
}
