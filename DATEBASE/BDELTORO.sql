CREATE DATABASE eltoro;
USE eltoro;


CREATE TABLE Usuario (
  id_Usuario Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar(20) NOT NULL
);

CREATE TABLE producto (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(15),
  precio_compra DECIMAL(8,2),
  precio_venta DECIMAL(8,2),
  descripcion VARCHAR(30),
  cantidad INT,
  imagen LONGTEXT,
  Categoria ENUM ('Electronico','VideosJuegos','Consumibles')
);

CREATE TABLE CLIENTE(
id_Cliente INT AUTO_INCREMENT PRIMARY KEY,
nombres VARCHAR(50),
apellidos varchar(50),
direccion varchar(100),
cedula varchar(16),
telefono integer,
correo varchar(40)
);


CREATE TABLE Venta (
  id_venta INT AUTO_INCREMENT PRIMARY KEY,
  fecha INT
);


CREATE TABLE Detalle_Venta (
  id_detalleventa INT AUTO_INCREMENT PRIMARY KEY,
  Monto INT, 
  Cantidad INT,
  tipo_pago ENUM('Efectivo','Dijital'),
  id_producto INT,
  id_Cliente INT,
  id_venta INT,
  CONSTRAINT FK_Produco1_Cli FOREIGN KEY (id_Cliente) REFERENCES CLIENTE(id_Cliente),
  CONSTRAINT FK_Produco2_ViJu FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
  CONSTRAINT FK_venta_venta2 FOREIGN KEY (id_venta) REFERENCES Venta(id_venta)
);