package models;

import models.utils.AppException;
import play.data.format.Formats;
import play.data.validation.Constraints;
import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class User extends Model {

    @Id
    @Column(name="user_id")
    public Long id;

    @Constraints.Required
    @Formats.NonEmpty
    public String name;

    public String confirmationToken;

    @Constraints.Required
    @Formats.NonEmpty
    public String cookie;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateCreation;

    public static Model.Finder<Long, User> find = new Model.Finder<Long, User>(Long.class, User.class);

    public static User findByEmail(String email) {
        return find.where().eq("name", email).findUnique();
    }
}