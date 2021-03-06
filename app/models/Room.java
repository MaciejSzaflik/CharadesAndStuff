package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.Table;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="room")
public class Room extends Model {

    @Id
    @Column(name="room_id")
    public Long id;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateCreation;
    
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateUpdate;

    @Constraints.Required
    public Boolean isCheckers;
    
    @Constraints.Required
    public Boolean isRunning;
     
    @Constraints.Required
    public Long gameId;
    
    @Constraints.Required
    public Long chatId;
   
    @Constraints.Required
    public String params;

    @OneToMany(mappedBy = "room", cascade=CascadeType.ALL)
    public List<Gamer> players;

    private SimpleDateFormat dateFormat;

    public String getDateCreation() {
        dateFormat = new SimpleDateFormat("hh:mm:ss");
        return dateFormat.format(dateCreation);
    }

    public String getDateUdaten() {
        dateFormat = new SimpleDateFormat("hh:mm:ss");
        return dateFormat.format(dateUpdate);
    }

    @Override
	public String toString() {
		return "Room [id=" + id + ", dateCreation=" + dateCreation + ", dateUpdate=" + dateUpdate + ", iStuff=" + isCheckers
				+ ", isRunning=" + isRunning + ", gameId=" + gameId + ", chatId=" + chatId + ", params=" + params
				+ ", players=" + players + "]";
	}
}
