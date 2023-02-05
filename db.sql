create database blog_db;

create table users(
    user_id varchar(25) primary key,
    user_name TEXT NOT NULL,
    user_password TEXT NOT NULL
);

create table blog(
    blog_id serial primary key,
    img varchar(255),
    title text ,
    desp text,
    likes int,
    user_id varchar(25)
);
create table test(
    blog_id serial primary key,
    img varchar(255),
    title text ,
    desp text,
    likes int,
    user_id varchar(25)
);
create table post(
    user_id varchar(25),
    blog_id int
);