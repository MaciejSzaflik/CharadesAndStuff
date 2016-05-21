create table room (
  id                        bigint not null,
  date_creation             timestamp,
  date_update	            timestamp,
  iStuff					boolean,
  isRunning					boolean,
  game_id					varchar(255),
  chat_id					varchar(255),
  params					text,
  constraint pk_room primary key (id))
;

create table room_gamer (
  id                        bigint not null,
  date_update	            timestamp,
  room_id					bigint,
  user_id					bigint,
  constraint pk_gamer primary key (id))
;

create sequence room_seq;

create sequence room_gamer_seq;

alter table room_gamer add constraint fk_room_gamer foreign key (room_id) references room (id) on delete restrict on update restrict;
create index ix_room_gamer on room_gamer (room_id);

alter table room_gamer add constraint fk_room_user foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_room_user on room_gamer (user_id);

# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists room;

drop table if exists room_gamer;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists room_seq;

drop sequence if exists room_gamer_seq;

