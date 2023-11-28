CREATE DATABASE eltoro;
USE eltoro;

CREATE TABLE Usuario (
  id_Usuario Int PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar(20) NOT NULL
);

CREATE TABLE Empleado (
id_Empleado INT PRIMARY KEY AUTO_INCREMENT,
nombres VARCHAR(50) NOT NULL,
apellidos varchar(50) NOT NULL,
direccion varchar(100) NOT NULL,
telefono VARCHAR(8) NOT NULL,
correo varchar(40) NOT NULL
);

CREATE TABLE Categoria (
id_Categoria INT AUTO_INCREMENT PRIMARY KEY,
nom_categoria VARCHAR(30) NOT NULL
);

CREATE TABLE producto (
  id_Producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(15) not null,
  precio_compra DECIMAL(8,2) not null,
  precio_venta DECIMAL(8,2) not null,
  descripcion VARCHAR(30) not null,
  stock INT not null,
  imagen LONGTEXT,
  id_Categoria INT NOT NULL,
  FOREIGN KEY (id_Categoria) REFERENCES categoria (id_Categoria)
);

CREATE TABLE Cliente(
id_Cliente INT AUTO_INCREMENT PRIMARY KEY,
nombres VARCHAR(50) not null,
apellidos varchar(50) not null,
direccion varchar(100) not null,
cedula varchar(16) not null,
telefono VARCHAR(8) NOT NULL,
correo varchar(40) NOT NULL
);


CREATE TABLE Venta (
  id_Venta INT AUTO_INCREMENT PRIMARY KEY,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_Empleado INT NOT NULL,
  id_Cliente INT NOT NULL,
FOREIGN KEY (id_Empleado) REFERENCES empleado (id_Empleado),
FOREIGN KEY (id_Cliente) REFERENCES cliente (id_Cliente)
);


CREATE TABLE Detalle_Venta (
  id_Detalle INT AUTO_INCREMENT PRIMARY KEY,
  Cantidad INT not null,
  id_Producto INT not null,
  id_Venta INT not null,
 FOREIGN KEY (id_Producto) REFERENCES producto (id_Producto),
 FOREIGN KEY (id_Venta) REFERENCES venta (id_Venta)
);