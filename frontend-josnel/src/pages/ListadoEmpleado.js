import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ListEmpleado({rol}) {
    const [empleados, setEmpleados] = useState([]);

    // Realiza una solicitud GET al servidor para obtener las ventas
    useEffect(() => {
        fetch('http://localhost:5000/crud/readEmpleado')
        .then((response) => response.json())
        .then((data) => setEmpleados(data))
        .catch((error) => console.error('Error al obtener los empleados:', error));
    }, []);

    return (
        <div>
        <Header rol={rol} />

        <Card className="margen-contenedor" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Empleados</Card.Title>

            <Table striped bordered hover className='table'>
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                </tr>
                </thead>
                <tbody>
                {empleados.map((empleado) => (
                    <tr key={empleado.id_Empleado}>
                    <td>{empleado.id_Empleado}</td>
                    <td>{empleado.nombre_Usuario}</td>
                    <td>{empleado.rol}</td>
                    <td>{empleado.telefono}</td>
                    <td>{empleado.correo}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Footer/>
        </div>
    );
}

export default ListEmpleado;
