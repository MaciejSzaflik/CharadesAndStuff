# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table game (
  id                        bigint not null,
  constraint pk_game primary key (id))
;

create table gamer (
  id                        bigint not null,
  date_creation             timestamp,
  date_update               timestamp,
  room_id                   bigint,
  user_id                   bigint,
  constraint pk_gamer primary key (id))
;

create table room (
  room_id                   bigint not null,
  date_creation             timestamp,
  date_update               timestamp,
  is_checkers               boolean,
  is_running                boolean,
  game_id                   bigint,
  chat_id                   bigint,
  params                    varchar(255),
  constraint pk_room primary key (room_id))
;

create table user (
  user_id                   bigint not null,
  name                      varchar(255),
  confirmation_token        varchar(255),
  cookie                    varchar(255),
  date_creation             timestamp,
  constraint pk_user primary key (user_id))
;

create sequence game_seq;

create sequence gamer_seq;

create sequence room_seq;

create sequence user_seq;

alter table gamer add constraint fk_gamer_room_1 foreign key (room_id) references room (room_id) on delete restrict on update restrict;
create index ix_gamer_room_1 on gamer (room_id);
alter table gamer add constraint fk_gamer_user_2 foreign key (user_id) references user (user_id) on delete restrict on update restrict;
create index ix_gamer_user_2 on gamer (user_id);



# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists game;

drop table if exists gamer;

drop table if exists room;

drop table if exists user;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists game_seq;

drop sequence if exists gamer_seq;

drop sequence if exists room_seq;

drop sequence if exists user_seq;

