const express = require('express');
const router = express.Router();


module.exports = (db) => {

router.get('/readproducto', (req, res) => {
  const sql = 'SELECT * FROM producto';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de producto:', err);
      res.status(500).json({ error: 'Error al leer registros de producto' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para crear un nuevo registro en la tabla producto
router.post('/createProduc', (req, res) => {
  const { nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria} = req.body;

  if (!nombre || !precio_compra || !precio_venta|| !descripcion|| !cantidad) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const sql = `INSERT INTO producto (nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [nombre, precio_compra, precio_compra, descripcion, cantidad, imagen, Categoria];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro en producto:', err);
      res.status(500).json({ error: 'Error al insertar registro en producto' });
    } else {
      res.status(201).json({ message: 'creado exitosamente' });
    }
  });
});

// Ruta para actualizar un producto por ID
router.put('/updateProduct/:id_producto', (req, res) => {
  const id_producto = req.params.id_producto;
  const { nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria } = req.body;

  if (!nombre || !precio_compra || !precio_venta || !descripcion || !cantidad) {
    return res.status(400).json({ error: 'Nombre, precio de compra, precio de venta, descripción y cantidad son obligatorios' });
  }

  const sql = `
    UPDATE producto
    SET nombre = ?, precio_compra = ?, precio_venta = ?, descripcion = ?,
        cantidad = ?, imagen = ?, Categoria = ?
    WHERE id_producto = ?;
  `;

  const values = [nombre, precio_compra, precio_venta, descripcion, cantidad, imagen, Categoria, id_producto];

  try {
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en producto:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en producto' });
      } else {
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error inesperado:', error);
    res.status(500).json({ error: 'Error inesperado al actualizar el registro en producto' });
  }
});

// Ruta para eliminar un registro existente en la tabla producto por ID
router.delete('/deleteproducto/:id_producto', (req, res) => {
  const id_producto = req.params.id_producto;

  const sql = 'DELETE FROM producto WHERE id_producto = ?';

  db.query(sql, [id_producto], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro en producto:', err);
      res.status(500).json({ error: 'Error al eliminar el registro en producto' });
    } else {
      res.status(200).json({ message: 'producto eliminado exitosamente' });
    }
  });
});

//----------------------------------------------------------------------------------------------------------

// Ruta para verificar las credenciales y obtener el rol del usuario
router.post('/login', (req, res) => {
  const { nombre_Usuario, contrasena } = req.body;

  if (!nombre_Usuario || !contrasena) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
  }

  // Realizar la consulta para verificar las credenciales en la base de datos
  const sql = `SELECT rol FROM Usuario WHERE nombre_Usuario = ? AND contrasena = ?`;
  db.query(sql, [nombre_Usuario, contrasena], (err, result) => {
    if (err) {
      console.error('Error al verificar credenciales:', err);
      return res.status(500).json({ error: 'Error al verificar credenciales' });
    }

    if (result.length === 1) {
      const { rol } = result[0];
      res.json({ rol }); // Devolver el rol si las credenciales son correctas
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});
//-------------------------------------------------------------------------------------------------------------------

// Rutas CRUD para la tabla "Cliente"
router.post('/insertcliente', (req, res) => {
  const {
nombres,
apellidos,
direccion,
cedula,
telefono,
correo,
} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombres || !apellidos || !direccion || !cedula || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Cliente"
  const clientesSql = `
      INSERT INTO CLIENTE (nombres, apellidos, direccion, cedula, telefono, correo)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  const clientesValues = [nombres, apellidos, direccion, cedula, telefono, correo];

  // Ejecuta la consulta para insertar en la tabla "Abogados"
  db.query(clientesSql, clientesValues, (err, casoResult) => {
      if (err) {
          console.error('Error al insertar cliente:', err);
          res.status(500).json({ error: 'Error al insertar cliente' });
      } else {
          // Devuelve un mensaje de éxito como respuesta
          res.status(200).json({ message: 'Cliente insertado exitosamente' });
      }
  });
});

// Ruta para actualizar un registro existente en la tabla Clientes por ID
router.put('/updateclientes/:id_Cliente', (req, res) => {
  const id_Cliente = req.params.id_Cliente;
  const { nombres, apellidos, direccion, cedula, telefono, correo } = req.body;

  if (!nombres || !apellidos || !direccion || !cedula || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
    UPDATE CLIENTE
    SET nombres = ?, apellidos = ?, direccion = ?, cedula = ?, telefono = ?, correo = ?
    WHERE id_Cliente = ?
  `;

  const values = [nombres, apellidos, direccion, cedula, telefono, correo, id_Cliente];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro en Clientes:', err);
      res.status(500).json({ error: 'Error al actualizar el registro en Clientes' });
    } else {
      res.status(200).json({ message: 'Cliente actualizado exitosamente' });
    }
  });
});


// Ruta para eliminar un registro existente en la tabla Casos por ID
router.delete('/deleteclientes/:id_Cliente', (req, res) => {
  const id_Cliente  = req.params.id_Cliente;

  const sql = 'DELETE FROM CLIENTE WHERE id_Cliente  = ?';

  db.query(sql, [id_Cliente ], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro en Cliente:', err);
      res.status(500).json({ error: 'Error al eliminar el registro en Cliente' });
    } else {
      res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    }
  });
});

// Ruta para leer registros de la tabla Clientes
router.get('/readclientes', (req, res) => {
  const sql = 'SELECT * FROM CLIENTE';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de cliente:', err);
      res.status(500).json({ error: 'Error al leer registros de cliente' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Rutas CRUD para la tabla "Venta"
router.post('/insertVenta', (req, res) => {
  const {
fecha,

} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!fecha) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Venta"
  const VentaSql = `
      INSERT INTO venta (fecha)
      VALUES (?)
  `;
  const VentaValues = [fecha];

  // Ejecuta la consulta para insertar en la tabla "Venta"
  db.query(VentaSql, VentaValues, (err, casoResult) => {
      if (err) {
          console.error('Error al insertar:', err);
          res.status(500).json({ error: 'Error al insertar Venta' });
      } else {
          // Devuelve un mensaje de éxito como respuesta
          res.status(200).json({ message: 'Venta insertada exitosamente' });
      }
  });
});

// Ruta para actualizar un registro existente en la tabla Venta por ID
router.put('/updateVenta/:id_venta', (req, res) => {
  const id_venta = req.params.id_venta;
  const {fecha} = req.body;

  if (!fecha) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
    UPDATE venta
    SET fecha = ?,
    WHERE id_venta = ?
  `;

  const values = [fecha,id_venta];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro en Venta:', err);
      res.status(500).json({ error: 'Error al actualizar el registro en Venta' });
    } else {
      res.status(200).json({ message: 'Venta actualizado exitosamente' });
    }
  });
});

// Ruta para eliminar un registro existente en la tabla Venta por ID
router.delete('/deleteVenta/:id_venta', (req, res) => {
  const id_venta = req.params.id_venta;

  const sql = 'DELETE FROM Venta WHERE id_venta  = ?';

  db.query(sql, [id_venta], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro en Venta:', err);
      res.status(500).json({ error: 'Error al eliminar el registro en Venta' });
    } else {
      res.status(200).json({ message: 'Venta eliminada exitosamente' });
    }
  });
});

// Ruta para leer registros de la tabla Venta
router.get('/readventa', (req, res) => {
  const sql = 'SELECT * FROM Venta';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de Venta:', err);
      res.status(500).json({ error: 'Error al leer registros de Venta' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Rutas CRUD para la tabla "Detalle_Venta"
router.post('/insertDventa', (req, res) => {
  const {
    Monto, 
    tipo_pago,
    Cantidad,
    id_producto,
    fecha,
    id_Cliente,

} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!Monto || !tipo_pago || !Cantidad || !id_producto || !fecha || !id_Cliente) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios B' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Detalle_Venta"
  const DVentaSql = `
      INSERT INTO Detalle_Venta (Monto, tipo_pago, Cantidad, id_producto, fecha, id_Cliente)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  const DVentaValues = [Monto, tipo_pago, Cantidad, id_producto, fecha, id_Cliente];

  // Ejecuta la consulta para insertar en la tabla "Venta"
  db.query(DVentaSql, DVentaValues, (err, casoResult) => {
      if (err) {
          console.error('Error al insertar Detalle_Venta:', err);
          res.status(500).json({ error: 'Error al insertar Detalle_Venta' });
      } else {
          // Devuelve un mensaje de éxito como respuesta
          res.status(200).json({ message: 'Detalle_Venta insertada exitosamente' });
      }
  });
});

// Ruta para leer registros de la tabla Detalle_Venta
router.get('/readdventa', (req, res) => {
  const sql = 'SELECT * FROM Detalle_Venta';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de Detalle_Venta:', err);
      res.status(500).json({ error: 'Error al leer registros de Detalle_Venta' });
    } else {
      res.status(200).json(result);
    }
  });
});
    return router;
};
