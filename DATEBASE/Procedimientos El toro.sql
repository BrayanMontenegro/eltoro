USE eltoro;

/*procedimientos de tipo de pago*/

/*insertar tipo de pago*/
DELIMITER //

CREATE PROCEDURE InsertarTipoPago(
    IN p_nombre VARCHAR(50)
)
BEGIN
    INSERT INTO TipoPago (nombre)
    VALUES (p_nombre);
END //

DELIMITER ;

-- Ejemplo de inserción de un nuevo tipo de pago
INSERT INTO TipoPago (nombre) VALUES ('Efectivo');

/*actualizar tipo de pago*/
DELIMITER //

CREATE PROCEDURE ActualizarTipoPago(
    IN p_id_tipo_pago INT,
    IN p_nombre VARCHAR(50)
)
BEGIN
    UPDATE TipoPago
    SET nombre = p_nombre
    WHERE id_tipo_pago = p_id_tipo_pago;
END //

DELIMITER ;

-- Ejemplo de actualización del nombre de un tipo de pago
UPDATE TipoPago SET nombre = 'Tarjeta de Crédito' WHERE id_tipo_pago = 1;

/*eliminar tipo de pago*/
DELIMITER //

CREATE PROCEDURE EliminarTipoPago(
    IN p_id_tipo_pago INT
)
BEGIN
    DELETE FROM TipoPago WHERE id_tipo_pago = p_id_tipo_pago;
END //

DELIMITER ;

-- Ejemplo de eliminación de un tipo de pago por ID
DELETE FROM TipoPago WHERE id_tipo_pago = 1;

/*buscar tipo de pago*/
DELIMITER //

CREATE PROCEDURE BuscarTipoPago(
    IN p_id_tipo_pago INT
)
BEGIN
    SELECT *
    FROM TipoPago
    WHERE id_tipo_pago = p_id_tipo_pago;
END //

DELIMITER ;

-- Ejemplo de búsqueda de un tipo de pago por ID
SELECT * FROM TipoPago WHERE id_tipo_pago = 1;


/*procedimientos de cliente*/

/*procedimientos de insertar*/

DELIMITER //

CREATE PROCEDURE InsertarCliente(
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(15),
    IN p_id_tipo_pago INT
)
BEGIN
    INSERT INTO Cliente (nombre, apellido, telefono, id_tipo_pago)
    VALUES (p_nombre, p_apellido, p_telefono, p_id_tipo_pago);
END //

DELIMITER ;

CALL InsertarCliente('Juan', 'Pérez', '123456789', 2);

/*procedimiento de actualizar*/

DELIMITER //

CREATE PROCEDURE ActualizarCliente(
    IN p_id_cliente INT,
    IN p_nombre VARCHAR(50),
    IN p_apellido VARCHAR(50),
    IN p_telefono VARCHAR(15),
    IN p_id_tipo_pago INT
)
BEGIN
    UPDATE Cliente
    SET 
        nombre = p_nombre,
        apellido = p_apellido,
        telefono = p_telefono,
        id_tipo_pago = p_id_tipo_pago
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;

CALL ActualizarCliente(1, 'NuevoNombre', 'NuevoApellido', '987654321', 2);

/*procedimiento de eliminar*/

DELIMITER //

CREATE PROCEDURE EliminarCliente(
    IN p_id_cliente INT
)
BEGIN
    DELETE FROM Cliente WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;

CALL EliminarCliente(1);

/*procedimiento de buscar*/

DELIMITER //

CREATE PROCEDURE BuscarCliente(
    IN p_id_cliente INT
)
BEGIN
    SELECT *
    FROM Cliente
    WHERE id_cliente = p_id_cliente;
END //

DELIMITER ;

CALL BuscarCliente(2);

/* fin de procedimientos de cliente*/

/*procedimientos de alquiler*/
/* insertar alquiler */
DELIMITER //

CREATE PROCEDURE InsertarAlquiler(
    IN p_costo_hora DECIMAL(8,2),
    IN p_horas_alquilado INT,
    IN p_id_cliente INT,
    IN p_id_tipo_pago INT
)
BEGIN
    INSERT INTO Alquiler (costo_hora, horas_alquilado, id_cliente, id_tipo_pago)
    VALUES (p_costo_hora, p_horas_alquilado, p_id_cliente, p_id_tipo_pago);
END //

DELIMITER ;

CALL InsertarAlquiler(15.5, 3, 2, 2);

/*procedimiento de actualizar*/
DELIMITER //

CREATE PROCEDURE ActualizarAlquiler(
    IN p_id_alquiler INT,
    IN p_costo_hora DECIMAL(8,2),
    IN p_horas_alquilado INT,
    IN p_id_cliente INT,
    IN p_id_tipo_pago INT
)
BEGIN
    UPDATE Alquiler
    SET 
        costo_hora = p_costo_hora,
        horas_alquilado = p_horas_alquilado,
        id_cliente = p_id_cliente,
        id_tipo_pago = p_id_tipo_pago
    WHERE id_alquiler = p_id_alquiler;
END //

DELIMITER ;

CALL ActualizarAlquiler(20.0, 4, 2, 2, 1);

/*procedimiento eliminar*/
DELIMITER //

CREATE PROCEDURE EliminarAlquiler(
    IN p_id_alquiler INT
)
BEGIN
    DELETE FROM Alquiler WHERE id_alquiler = p_id_alquiler;
END //

DELIMITER ;

CALL EliminarAlquiler(1);

/*procedimiento de buscar*/
DELIMITER //

CREATE PROCEDURE BuscarAlquiler(
    IN p_id_alquiler INT
)
BEGIN
    SELECT *
    FROM Alquiler
    WHERE id_alquiler = p_id_alquiler;
END //

DELIMITER ;

CALL BuscarAlquiler(2);

/* fin de procedimientos de alquiler*/

/*procedimientos de producto*/

/*Incertar producto*/
DELIMITER //

CREATE PROCEDURE InsertarProducto(
    IN p_nombre VARCHAR(15),
    IN p_precio_compra DECIMAL(8,2),
    IN p_precio_venta DECIMAL(8,2),
    IN p_descripcion VARCHAR(30),
    IN p_cantidad INT,
    IN p_categoria VARCHAR(40),
    IN p_id_cliente INT
)
BEGIN
    INSERT INTO producto (nombre, precio_compra, precio_venta, descripcion, cantidad, Categoria, id_cliente)
    VALUES (p_nombre, p_precio_compra, p_precio_venta, p_descripcion, p_cantidad, p_categoria, p_id_cliente);
END //

DELIMITER ;

CALL InsertarProducto('coca cola', 50.0, 100.0, 'Refresco', 10, 'Electrónicos', 2);

/*procedimiento de actualizar*/
DELIMITER //

CREATE PROCEDURE ActualizarProducto(
    IN p_id_producto INT,
    IN p_nombre VARCHAR(15),
    IN p_precio_compra DECIMAL(8,2),
    IN p_precio_venta DECIMAL(8,2),
    IN p_descripcion VARCHAR(30),
    IN p_cantidad INT,
    IN p_categoria VARCHAR(40),
    IN p_id_cliente INT
)
BEGIN
    UPDATE producto
    SET 
        nombre = p_nombre,
        precio_compra = p_precio_compra,
        precio_venta = p_precio_venta,
        descripcion = p_descripcion,
        cantidad = p_cantidad,
        Categoria = p_categoria,
        id_cliente = p_id_cliente
    WHERE id_producto = p_id_producto;
END //

DELIMITER ;

CALL ActualizarProducto(1, 'Fresca', 60.0, 120.0, 'No le gusto xd', 15, 'CategoríaActualizada', 2);

/*procedimiento de eliminar*/
DELIMITER //

CREATE PROCEDURE EliminarProducto(
    IN p_id_producto INT
)
BEGIN
    DELETE FROM producto WHERE id_producto = p_id_producto;
END //

DELIMITER ;

CALL EliminarProducto(1);

/*procedimiento de buscar*/
DELIMITER //

CREATE PROCEDURE BuscarProducto(
    IN p_id_producto INT
)
BEGIN
    SELECT *
    FROM producto
    WHERE id_producto = p_id_producto;
END //

DELIMITER ;

CALL BuscarProducto(2);

/* fin de procedimientos de producto*/

/*procedimientos de consumibles*/

/*procedimiento de incertar*/
DELIMITER //

CREATE PROCEDURE InsertarConsumible(
    IN p_id_producto INT,
    IN p_fecha_vencimiento DATETIME
)
BEGIN
    INSERT INTO consumibles (id_producto, fecha_vencimiento)
    VALUES (p_id_producto, p_fecha_vencimiento);
END //

DELIMITER ;

CALL InsertarConsumible(2, '2023-12-31 23:59:59');

/*actualizar consumible*/
DELIMITER //

CREATE PROCEDURE ActualizarConsumible(
    IN p_id_consumible INT,
    IN p_id_producto INT,
    IN p_fecha_vencimiento DATETIME
)
BEGIN
    UPDATE consumibles
    SET 
        id_producto = p_id_producto,
        fecha_vencimiento = p_fecha_vencimiento
    WHERE id_Consumible = p_id_consumible;
END //

DELIMITER ;

CALL ActualizarConsumible(1, 2, '2023-12-31 23:59:59');

/*eliminar consumible*/
DELIMITER //

CREATE PROCEDURE EliminarConsumible(
    IN p_id_consumible INT
)
BEGIN
    DELETE FROM consumibles WHERE id_Consumible = p_id_consumible;
END //

DELIMITER ;

CALL EliminarConsumible(1);

/*buscar consumible*/
DELIMITER //

CREATE PROCEDURE BuscarConsumible(
    IN p_id_consumible INT
)
BEGIN
    SELECT *
    FROM consumibles
    WHERE id_Consumible = p_id_consumible;
END //

DELIMITER ;

CALL BuscarConsumible(2);

/* fin de procedimientos de consumibles*/

/*procedimientos de videojuegos*/
/*incertar videojuego*/
DELIMITER //

CREATE PROCEDURE InsertarVideojuego(
    IN p_id_producto INT,
    IN p_plataforma VARCHAR(10)
)
BEGIN
    INSERT INTO Videojuegos (id_producto, plataforma)
    VALUES (p_id_producto, p_plataforma);
END //

DELIMITER ;

CALL InsertarVideojuego(2, 'PS5');

/*procedimiento de actualizar*/
DELIMITER //

CREATE PROCEDURE ActualizarVideojuego(
    IN p_id_videojuego INT,
    IN p_id_producto INT,
    IN p_plataforma VARCHAR(10)
)
BEGIN
    UPDATE Videojuegos
    SET 
        id_producto = p_id_producto,
        plataforma = p_plataforma
    WHERE id_videojuegos = p_id_videojuego;
END //

DELIMITER ;

CALL ActualizarVideojuego(2, 2, 'Xbox Series X');/*corregir*/

/*procedimiento de eliminar*/
DELIMITER //

CREATE PROCEDURE EliminarVideojuego(
    IN p_id_videojuego INT
)
BEGIN
    DELETE FROM Videojuegos WHERE id_videojuegos = p_id_videojuego;
END //

DELIMITER ;

CALL EliminarVideojuego(1);

/*procedimiento de buscar*/
DELIMITER //

CREATE PROCEDURE BuscarVideojuego(
    IN p_id_videojuego INT
)
BEGIN
    SELECT *
    FROM Videojuegos
    WHERE id_videojuegos = p_id_videojuego;
END //

DELIMITER ;

CALL BuscarVideojuego(2);

/* fin de procedimientos de videojuegos*/

/*procedimeintos de electronicos*/

/*incertar electronico*/
DELIMITER //

CREATE PROCEDURE InsertarElectronico(
    IN p_id_producto INT,
    IN p_marca VARCHAR(15)
)
BEGIN
    INSERT INTO Electronicos (id_producto, marca)
    VALUES (p_id_producto, p_marca);
END //

DELIMITER ;

CALL InsertarElectronico(2, 'Samsung');

/*actualizar electronico*/
DELIMITER //

CREATE PROCEDURE ActualizarElectronico(
    IN p_id_electronico INT,
    IN p_id_producto INT,
    IN p_marca VARCHAR(15)
)
BEGIN
    UPDATE Electronicos
    SET 
        id_producto = p_id_producto,
        marca = p_marca
    WHERE id_electronicos = p_id_electronico;
END //

DELIMITER ;

CALL ActualizarElectronico(1, 2, 'Sony');

/*eliminar electronico*/
DELIMITER //

CREATE PROCEDURE EliminarElectronico(
    IN p_id_electronico INT
)
BEGIN
    DELETE FROM Electronicos WHERE id_electronicos = p_id_electronico;
END //

DELIMITER ;

CALL EliminarElectronico(1);

/*buscar electronico*/
DELIMITER //

CREATE PROCEDURE BuscarElectronico(
    IN p_id_electronico INT
)
BEGIN
    SELECT *
    FROM Electronicos
    WHERE id_electronicos = p_id_electronico;
END //

DELIMITER ;

CALL BuscarElectronico(2);

/*fin de procedimeintos de electronicos*/

/*procedimeintos de venta*/

/*incertar venta*/
DELIMITER //

CREATE PROCEDURE InsertarVenta(
    IN p_fecha INT
)
BEGIN
    INSERT INTO Venta (fecha)
    VALUES (p_fecha);
END //

DELIMITER ;

CALL InsertarVenta(20231006);

/*actualizar venta*/
DELIMITER //

CREATE PROCEDURE ActualizarVenta(
    IN p_id_venta INT,
    IN p_fecha INT
)
BEGIN
    UPDATE Venta
    SET 
        fecha = p_fecha
    WHERE id_venta = p_id_venta;
END //

DELIMITER ;

CALL ActualizarVenta(1, 20231007);

/*eliminar venta*/
DELIMITER //

CREATE PROCEDURE EliminarVenta(
    IN p_id_venta INT
)
BEGIN
    DELETE FROM Venta WHERE id_venta = p_id_venta;
END //

DELIMITER ;

CALL EliminarVenta(1);

/*buscar venta*/
DELIMITER //

CREATE PROCEDURE BuscarVenta(
    IN p_id_venta INT
)
BEGIN
    SELECT *
    FROM Venta
    WHERE id_venta = p_id_venta;
END //

DELIMITER ;

CALL BuscarVenta(2);

/*procedimientos de detalle venta*/

/*Incertar detalle venta*/
DELIMITER //

CREATE PROCEDURE InsertarDetalleVenta(
    IN p_cantidad INT,
    IN p_id_consumible INT,
    IN p_id_videojuego INT,
    IN p_id_electronico INT,
    IN p_id_venta INT
)
BEGIN
    INSERT INTO Detalle_Venta (Cantidad, id_Consumible, id_videojuegos, id_electronicos, id_venta)
    VALUES (p_cantidad, p_id_consumible, p_id_videojuego, p_id_electronico, p_id_venta);
END //

DELIMITER ;

CALL InsertarDetalleVenta(5, 2, 2, 2, 1);
 
 
/*Actualizar detalle venta*/
DELIMITER //

CREATE PROCEDURE ActualizarDetalleVenta(
    IN p_id_detalleventa INT,
    IN p_cantidad INT,
    IN p_id_consumible INT,
    IN p_id_videojuego INT,
    IN p_id_electronico INT,
    IN p_id_venta INT
)
BEGIN
    UPDATE Detalle_Venta
    SET 
        Cantidad = p_cantidad,
        id_Consumible = p_id_consumible,
        id_videojuegos = p_id_videojuego,
        id_electronicos = p_id_electronico,
        id_venta = p_id_venta
    WHERE id_detalleventa = p_id_detalleventa;
END //

DELIMITER ;

CALL ActualizarDetalleVenta(1, 8, 4, 5, 6, 15);


/*Eliminar detalle venta*/
DELIMITER //

CREATE PROCEDURE EliminarDetalleVenta(
    IN p_id_detalleventa INT
)
BEGIN
    DELETE FROM Detalle_Venta WHERE id_detalleventa = p_id_detalleventa;
END //

DELIMITER ;

CALL EliminarDetalleVenta(1);
 
/*Buscar detalle venta*/
DELIMITER //

CREATE PROCEDURE BuscarDetalleVenta(
    IN p_id_detalleventa INT
)
BEGIN
    SELECT *
    FROM Detalle_Venta
    WHERE id_detalleventa = p_id_detalleventa;
END //

DELIMITER ;

CALL BuscarDetalleVenta(2);

/* fin de procedimientos de detalle venta*/
