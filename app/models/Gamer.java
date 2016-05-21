package models;

import models.utils.AppException;
import models.utils.Hash;
import play.data.format.Formats;
import play.data.validation.Constraints;
import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="gamer")
public class Gamer extends Model {

    @Id
    public Long id;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateCreation;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateUpdate;
    
    public Long roomId;
    public Long userId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="room_id", referencedColumnName="room_id")
    public Room room;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id", referencedColumnName="user_id")
    public User user;
}
