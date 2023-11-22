USE eltoro;
/*tigger*/

-- Tabla Bitacora
CREATE TABLE bitacora (
	id_bitacora INT NOT NULL AUTO_INCREMENT,
    transaccion VARCHAR (10) NOT NULL,
    usuario VARCHAR (40) NOT NULL,
    fecha DATETIME NOT NULL,
    tabla VARCHAR (20) NOT NULL,
    PRIMARY KEY (id_bitacora)
);

/* Disparadores */

-- Disparador Insertar Cliente
CREATE TRIGGER InsertarCliente_bitacora
AFTER INSERT ON Cliente
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(),NOW(), 'Cliente');

-- Actualizar
CREATE TRIGGER ActualizarCliente_bitacora
AFTER UPDATE ON Cliente
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(),NOW(), 'Cliente');

-- Eliminar
CREATE TRIGGER EliminarCliente_bitacora
AFTER DELETE ON Cliente
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(),NOW(), 'Cliente');

-- Disparador Insertar Producto
CREATE TRIGGER InsertarProducto_bitacora
AFTER INSERT ON producto
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'producto');

-- Actualizar 
CREATE TRIGGER ActualizarProducto_bitacora
AFTER UPDATE ON producto
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'producto');

-- Eliminar 
CREATE TRIGGER EliminarProducto_bitacora
AFTER DELETE ON producto
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'producto');

-- Disparador Insertar Venta
CREATE TRIGGER InsertarVenta_bitacora
AFTER INSERT ON Venta
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'Venta');

-- Actualizacion
CREATE TRIGGER ActualizarVenta_bitacora
AFTER UPDATE ON Venta
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'Venta');

-- Eliminar 
CREATE TRIGGER EliminarVenta_bitacora
AFTER DELETE ON Venta
FOR EACH ROW
INSERT INTO bitacora(transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Venta');
