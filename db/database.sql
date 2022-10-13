CREATE DATABASE IF NOT EXISTS gestionDocumental;

USE gestionDocumental;

CREATE TABLE tipoDocumento (
    id int auto_increment,
    nombreTipo varchar(50),
  	primary key (id)
);

CREATE TABLE documentos (
    id int auto_increment,
    nombre varchar(50),
    autor varchar(50),
    tipoDoc int,
    cantidad int,
    precio float,
    tipo varchar(50),
    descripcion varchar(100),
  	primary key (id),
  	foreign key (tipoDoc) references tipoDocumento (id)
);

CREATE TABLE clientes (
    id int auto_increment,
    username varchar(50) not null,
    userPassword varchar(70) not null,
    rol varchar(50) not null default 'user',
  	primary key (id)
);

CREATE TABLE compras (
    id int auto_increment,
    idCliente int,
    idDocumento int,
    total float,
    fecha DateTime not null default now(),
  	primary key(id),
  	foreign key (idCliente) references clientes (id),
  	foreign key (idDocumento) references documentos (id)
);

CREATE TABLE alquiles (
    id int auto_increment,
    idCliente int,
    idDocumento int,
    total float,
    fechaInicioAlquile DateTime not null default now(),
    fechaFinAlquile DateTime not null default now(),
  	primary key (id),
  	foreign key (idCliente) references clientes (id),
  	foreign key (idDocumento) references documentos (id)
);