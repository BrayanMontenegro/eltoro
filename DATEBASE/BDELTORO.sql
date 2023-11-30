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
telefono VARCHAR(8) NOT NULL,
correo varchar(40) NOT NULL,
id_Usuario INT UNIQUE,
FOREIGN KEY (id_Usuario) REFERENCES usuario (id_Usuario)
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
  tipo_pago VARCHAR(30) NOT NULL,
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

/*Procedimientos para la tabla categoria*/
DELIMITER //
CREATE PROCEDURE MostrarCategoria()
BEGIN
    SELECT id_Categoria, nom_categoria
    FROM categoria;
END;
//

DELIMITER //
CREATE PROCEDURE CrearCategoria(
    IN nom_categoria VARCHAR(30)
)
BEGIN
    INSERT INTO categoria(nom_categoria)
    VALUES (nom_categoria);
END;
//

DELIMITER //
CREATE PROCEDURE ModificarCategoria(
    IN id_Categoria INT,
    IN nom_categoria VARCHAR(30)
)
BEGIN
    UPDATE categoria
    SET
        nom_categoria = nom_categoria
    WHERE id_Categoria = id_Categoria;
END;
//

DELIMITER //
CREATE PROCEDURE EliminarCategoria (IN id_Categoria INT)
BEGIN
    DELETE FROM categoria WHERE id_Categoria = id_Categoria;
END;
//