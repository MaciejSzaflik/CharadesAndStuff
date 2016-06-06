package models;

import play.data.format.Formats;
import com.avaje.ebean.Model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="gamer")
public class Gamer extends Model {

    @Id
    public Long id;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateCreation;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateUpdate;

    @ManyToOne
    @JoinColumn(name="room_id", referencedColumnName="room_id")
    public Room room;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName="user_id")
    public User user;
}
