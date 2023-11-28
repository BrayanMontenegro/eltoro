const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(express.json({limit: '50mb'}));

app.use((err, req, res, next)=> {
    if(err instanceof SyntaxError && 'body' in err) {
        res.status(400).send({error: 'Error en el análisis de JSON'});
    }else{
        next();
    }
});

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dayana2005',
    database: 'eltoro'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.use(cors());
const crudRoutes = require('./routes/crudRoutes')(db); //Pasa la instancia de la base de datos a crudRoutes
app.use('/crud', crudRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).send({ error: 'Error en el análisis de JSON' });
    } else {
      next();
    }
  });

app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});
