CREATE DATABASE IF NOT EXISTS gestionDocumental;

USE gestionDocumental;

CREATE TABLE administradores (
    id int auto_increment,
    nombre varchar(50),
    contraseña varchar(50),
    primary key (id)
);

CREATE TABLE tipoDocumento (
    id int auto_increment,
    nombre varchar(50),
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

CREATE TABLE documentosFisicos (
    id int auto_increment,
    codigo int,
    nombre varchar(50),
    autor varchar(50),
    tipoDocumento int,
    cantidad int,
    precio float,
    descripcion varchar(100),
  	primary key (id),
  	foreign key (id) references tipoDocumento (id),
  	foreign key (codigo) references documentos (id)
);

CREATE TABLE documentosElectronicos (
    id int auto_increment,
    codigo int,
    nombre varchar(50),
    autor varchar(50),
    tipoDocumento int,
    cantidad int,
    precio float,
    descripcion varchar(100),
  	primary key (id),
  	foreign key (id) references tipoDocumento (id),
  	foreign key (codigo) references documentos (id)
);

CREATE TABLE clientes (
    id int auto_increment,
    nombre varchar(50) not null,
    contraseña varchar(50) not null,
  	primary key (id)
);

CREATE TABLE compras (
    id int auto_increment,
    idCliente int,
    idDocumento int,
    medioPago varchar(50),
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
    idDocumentoElectronico int,
    medioPago varchar(50),
    cantidad int,
    total float,
    fechaInicioAlquile DateTime,
    fechaInicioFinAlquile DateTime,
  	primary key (id),
  	foreign key (idCliente) references clientes (id),
  	foreign key (idDocumentoElectronico) references documentos (id)
);