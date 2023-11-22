use eltoro;

CREATE TABLE Usuario (
  id_Usuario Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar(20) NOT NULL
);

INSERT INTO Usuario (nombre_Usuario, contrasena, rol)  VALUES ('Oreki','0524', 'admin');
INSERT INTO Usuario (nombre_Usuario, contrasena, rol)  VALUES ('javi','2023', 'vendedor');
SELECT * FROM Usuario;