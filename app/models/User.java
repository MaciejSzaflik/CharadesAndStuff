package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User extends Model {

    @Id
    @Column(name="user_id")
    public Long id;

    @Constraints.Required
    @Formats.NonEmpty
    public String name;

    @Constraints.Required
    @Formats.NonEmpty
    public String cookie;
}