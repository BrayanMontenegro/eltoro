const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.post('/login', (req, res) => {
    const { nombre_Usuario, contrasena } = req.body;

    if (!nombre_Usuario || !contrasena) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    // Realizar la consulta para verificar las credenciales en la base de datos
    const sql = `SELECT rol FROM usuario WHERE nombre_Usuario = ? AND contrasena = ?`;
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

  router.get('/readcategoria', (req, res) => {
    // Nombre del procedimiento almacenado
    const storedProcedure = 'MostrarCategoria';
  
    // Llama al procedimiento almacenado
    db.query(`CALL ${storedProcedure}`, (err, result) => {
      if (err) {
        console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
        res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result[0]); // Los resultados están en el primer elemento del array result
      }
    });
  });

  router.post('/createcategoria', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { nom_categoria } = req.body;
  
    // Verifica si se proporcionaron los datos necesarios
    if (!nom_categoria) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Nombre del procedimiento almacenado
    const storedProcedure = 'CrearCategoria';
  
    // Llama al procedimiento almacenado
    db.query(
      `CALL ${storedProcedure}(?)`,
      [nom_categoria],
      (err, result) => {
        if (err) {
          console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
          res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
        } else {
          // Devuelve un mensaje como respuesta
          res.status(200).json({ message: 'Registro agregado exitosamente' });
        }
      }
    );
  });

  router.put('/updatecategoria/:id_Categoria', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_Categoria = req.params.id_Categoria;
  
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { nom_categoria } = req.body;
  
    // Verifica si se proporcionaron los datos necesarios
    if (!nom_categoria) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Nombre del procedimiento almacenado
    const storedProcedure = 'ModificarCategoria';
  
    // Llama al procedimiento almacenado
    db.query(
      `CALL ${storedProcedure}(?, ?)`,
      [id_Categoria, nom_categoria],
      (err, result) => {
        if (err) {
          console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
          res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
        } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro actualizado exitosamente' });
        }
      }
    );
  });

  router.delete('/deleteCategoria/: id_Categoria', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_Categoria = req.params.id_Categoria;
  
    // Nombre del procedimiento almacenado
    const storedProcedure = 'EliminarCategoria';
  
    // Llama al procedimiento almacenado
    db.query(`CALL ${storedProcedure}(?)`, [id_Categoria], (err, result) => {
      if (err) {
        console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
        res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
      }
    });
  });

  router.get('/readEmpleado', (req, res) => {
    const sql = `
    select id_Empleado, usuario.nombre_Usuario, usuario.rol, telefono, correo
    from empleado inner join usuario
    on empleado.id_Usuario = usuario.id_Usuario;
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener empleado:', err);
        res.status(500).json({ error: 'Error al obtener empleado' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  router.post('/createEmpleado', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {
        nombre_Usuario,
        contrasena,
        rol,
        Correo,
        Telefono,
    } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombre_Usuario || !contrasena || !rol || !Correo || !Telefono) {
        return res.status(400).json({ error: 'Los campos "nombre_Usuario", "contrasena", "rol", "Correo" y "Telefono" son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Usuario"
    const usuarioSql = `
        INSERT INTO usuario (nombre_Usuario, contrasena, rol)
        VALUES (?, ?, ?)
    `;
    const usuarioValues = [nombre_Usuario, contrasena, rol];

    // Ejecuta la consulta para insertar en la tabla "Persona"
    db.query(usuarioSql, usuarioValues, (err, usuarioResult) => {
        if (err) {
            console.error('Error al insertar registro de Usuario:', err);
            res.status(500).json({ error: 'Error al insertar registro de Usuario' });
        } else {
            const id_Usuario = usuarioResult.insertId; // Obtenemos el IDUsuario recién insertado

            // Realiza la consulta SQL para insertar un nuevo registro de Empleado
            const empleadoSql = `INSERT INTO empleado (id_Usuario, Correo, Telefono)
                VALUES (?, ?, ?)
            `;
            const empleadoValues = [id_Usuario, Correo, Telefono];

            // Ejecuta la consulta para insertar en la tabla "Empleado"
            db.query(empleadoSql, empleadoValues, (err, empleadoResult) => {
                if (err) {
                    console.error('Error al insertar registro de Empleado:', err);
                    res.status(500).json({ error: 'Error al insertar registro de Empleado' });
                } else {
                    // Devuelve el ID del nuevo registro de Empleado como respuesta
                    res.status(201).json({ IDEmpleado: empleadoResult.insertId });
                }
            });
        }
    });
});

router.get('/readcliente', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM cliente';

  // Ejecutar la consulta
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer los registros de la tabla cliente:', err);
      res.status(500).json({ error: 'Error al leer los registros de la tabla cliente' });
    } else {
      // Devolver los registros en formato JSON como respuesta
      res.status(200).json(result);
    }
  });
});

router.post('/createcliente', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const {nombres, apellidos, direccion, cedula, telefono, correo } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombres || !apellidos || !direccion || !cedula || !telefono || !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO cliente (nombres, apellidos, direccion, cedula, telefono, correo) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [nombres, apellidos, direccion, cedula, telefono, correo];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar un registro en la tabla cliente:', err);
      res.status(500).json({ error: 'Error al insertar un registro en la tabla cliente' });
    } else {
      // Devuelve un mensaje como respuesta
      res.status(200).json({ message: 'Registro agregado exitosamente' });
    }
  });
});

router.put('/updatecliente/:id_Cliente', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Cliente = req.params.id_Cliente;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { nombres, apellidos, direccion, cedula, telefono, correo } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombres || !apellidos || !direccion || !cedula || !telefono ||  !correo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE cliente
    SET nombres = ?, apellidos = ?, direccion = ?, cedula = ?, telefono = ?, correo = ?
    WHERE id_Cliente = ?
  `;

  const values = [nombres, apellidos, direccion, cedula, telefono, correo, id_Cliente];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar un registro de la tabla cliente:', err);
      res.status(500).json({ error: 'Error al actualizar un registro de la tabla cliente' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro actualizado exitosamente' });
    }
  });
});

router.delete('/deletecliente/:id_Cliente', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Cliente = req.params.id_Cliente;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM cliente WHERE id_Cliente = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Cliente], (err, result) => {
    if (err) {
      console.error('Error al eliminar un registro de la tabla cliente:', err);
      res.status(500).json({ error: 'Error al eliminar un registro de la tabla cliente' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado exitosamente' });
    }
  });
});

router.get('/readproducto', (req, res) => {
  // Utiliza la instancia de la base de datos pasada como parámetro
  // Realizar una consulta SQL para seleccionar todos los registros
  const sql = 'SELECT * FROM producto';

  // Ejecutar la consulta
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer los registros de la tabla producto:', err);
      res.status(500).json({ error: 'Error al leer los registros de la tabla producto' });
    } else {
      // Devolver los registros en formato JSON como respuesta
      res.status(200).json(result);
    }
  });
});

router.post('/createproducto', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const {nombre, precio_compra, precio_venta, descripcion, stock, imagen, id_Categoria} = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombre || !precio_compra || !precio_venta || !descripcion || !stock || !imagen || !id_Categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro con ID específico
  const sql = `INSERT INTO producto (nombre, precio_compra, precio_venta, descripcion, stock, imagen, id_Categoria) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [nombre, precio_compra, precio_venta, descripcion, stock, imagen, id_Categoria];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar un registro en la tabla producto:', err);
      res.status(500).json({ error: 'Error al insertar un registro en la tabla producto' });
    } else {
      // Devuelve un mensaje como respuesta
      res.status(200).json({ message: 'Registro agregado exitosamente' });
    }
  });
});

router.put('/updateproducto/:id_Producto', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_Producto = req.params.id_Producto;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { nombre, precio_compra, precio_venta, descripcion, stock, imagen, id_Categoria } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombre || !precio_compra || !precio_venta || !descripcion || !stock || !imagen || !id_Categoria) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE producto
    SET nombre = ?, precio_compra = ?, precio_venta = ?, descripcion = ?, stock = ?, imagen = ?, id_Categoria = ?
    WHERE id_Producto = ?
  `;

  const values = [nombre, precio_compra, precio_venta, descripcion, stock, imagen, id_Categoria, id_Producto];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar un registro de la tabla producto:', err);
      res.status(500).json({ error: 'Error al actualizar un registro de la tabla producto' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro actualizado exitosamente' });
    }
  });
});

router.delete('/deleteproducto/:id_Producto', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id_Producto = req.params.id_Producto;

  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM producto WHERE id_Producto = ?';

  // Ejecuta la consulta
  db.query(sql, [id_Producto], (err, result) => {
    if (err) {
      console.error('Error al eliminar un registro de la tabla producto:', err);
      res.status(500).json({ error: 'Error al eliminar un registro de la tabla producto' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro eliminado exitosamente' });
    }
  });
});

router.get('/readventa', (req, res) => {
  const sql = `
  select detalle_venta.id_Detalle, usuario.nombre_Usuario, fecha, cliente.nombres, producto.nombre, 
  producto.precio_venta, detalle_venta.Cantidad, tipo_pago
  from venta inner join empleado
  on venta.id_Empleado = empleado.id_Empleado
  inner join usuario
  on empleado.id_Usuario = usuario.id_Usuario
  inner join cliente
  on venta.id_Cliente = cliente.id_Cliente
  inner join detalle_venta
  on venta.id_Venta = detalle_venta.id_Venta
  inner join producto
  on detalle_venta.id_Producto = producto.id_Producto;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener ventas:', err);
      res.status(500).json({ error: 'Error al obtener ventas' });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post('/createventa', (req, res) => {
  // Extraer datos de la solicitud
  const { id_Empleado, id_Cliente, tipo_pago, detalle } = req.body;

  // Realizar la inserción de la venta en la tabla Ventas
  const sqlVenta = 'INSERT INTO venta (id_Empleado, id_Cliente, tipo_pago) VALUES (?, ?, ?)';
  db.query(sqlVenta, [id_Empleado, id_Cliente, tipo_pago], (err, result) => {
    if (err) {
      console.error('Error al insertar venta:', err);
      return res.status(500).json({ error: 'Error al insertar venta' });
    }

    const id_Venta = result.insertId; // Obtener el ID de la venta insertada

    // Iterar sobre el detalle de la venta y realizar inserciones en DetalleVenta
    const sqlDetalle = 'INSERT INTO detalle_venta (Cantidad, id_Producto, id_Venta) VALUES ?';
    const values = detalle.map((item) => [ item.Cantidad, item.id_Producto, id_Venta]);
    db.query(sqlDetalle, [values], (err, result) => {
      if (err) {
        console.error('Error al insertar detalle de venta:', err);
        return res.status(500).json({ error: 'Error al insertar detalle de venta' });
      }

      // Devolver respuesta exitosa
      res.status(201).json({ message: 'Venta y detalle de venta agregados con éxito' });
    });
  });
});

//Sentencia
//curl -X PUT -H "Content-Type: application/json" -d "{\"NombreCategoria\":\"Biológico\"}" http://localhost:5000/crud/updateCategoria/1
//-------------------------------------------------------------------------------------

    return router;
};
