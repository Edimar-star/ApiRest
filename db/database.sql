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
    tipoDocumento int,
    cantidad int,
    precio float,
    tipo varchar(50),
    descripcion varchar(100),
  	primary key (id),
  	foreign key (id) references tipoDocumento (id)
);

CREATE TABLE clientes (
    id int auto_increment,
    username varchar(50) not null,
    userPassword varchar(50) not null,
    rol varchar(50) not null,
  	primary key (id)
);

CREATE TABLE compras (
    id int auto_increment,
    idCliente int,
    idDocumento int,
    cantidad int,
    total float,
    fecha DateTime,
  	primary key(id),
  	foreign key (idCliente) references clientes (id),
  	foreign key (idDocumento) references documentos (id)
);

CREATE TABLE alquiles (
    id int auto_increment,
    idCliente int,
    idDocumento int,
    cantidad int,
    total float,
    fechaInicioAlquile DateTime,
    fechaInicioFinAlquile DateTime,
  	primary key (id),
  	foreign key (idCliente) references clientes (id),
  	foreign key (idDocumento) references documentos (id)
);