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

  router.get('/readCategoria', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM categoria';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla categoria' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  router.post('/createCategoria', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {nom_categoria } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nom_categoria) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO categoria (nom_categoria) VALUES (?)`;
    const values = [nom_categoria];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar un registro en la tabla categoria:', err);
        res.status(500).json({ error: 'Error al insertar un registro en la tabla categoria' });
      } else {
        // Devuelve un mensaje como respuesta
        res.status(200).json({ message: 'Registro agregado exitosamente' });
      }
    });
  });

  router.put('/updateCategoria/:id_Categoria', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_Categoria = req.params.id_Categoria;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { nom_categoria } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nom_categoria) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE categoria
      SET nom_categoria = ?
      WHERE id_Categoria = ?
    `;

    const values = [nom_categoria, id_Categoria];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro de la tabla categoria:', err);
        res.status(500).json({ error: 'Error al actualizar el registro de la tabla categoria' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado exitosamente' });
      }
    });
  });

  router.delete('/deleteCategoria/:id_Categoria', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_Categoria = req.params.id_Categoria;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM categoria WHERE id_Categoria = ?';

    // Ejecuta la consulta
    db.query(sql, [id_Categoria], (err, result) => {
      if (err) {
        console.error('Error al eliminar un registro de la tabla categoria:', err);
        res.status(500).json({ error: 'Error al eliminar un registro de la tabla categoria' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado exitosamente' });
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

    return router;
};
