import React, { useState, useEffect } from 'react';
import { Table, Card, Row, FloatingLabel, Col, Form } from 'react-bootstrap';
import Header from '../components/Header';

function ListEmpleado({rol}) {
    const [empleados, setEmpleados] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEmpleados = empleados.filter((empleado) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nombres = empleado.nombres.toLowerCase();
        const apellidos = empleado.apellidos.toLowerCase();
        const direccion = empleado.direccion.toLowerCase();
        const telefono = empleado.telefono.toLowerCase();
        const correo = empleado.correo.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nombres.includes(search) ||
        apellidos.includes(search) ||
        direccion.includes(search) ||
        telefono.includes(search) ||
        correo.includes(search) 
        );
    });

    // Realiza una solicitud GET al servidor para obtener las ventas
    useEffect(() => {
        fetch('http://localhost:5000/crud/readempleado')
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

            <Row className="mb-3">
            <Col sm="6" md="6" lg="12">
                <FloatingLabel controlId="search" label="Buscar">
                    <Form.Control
                    type="text"
                    placeholder="Buscar"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    />
                </FloatingLabel>
                </Col>
            </Row>

            <Table striped bordered hover className='table'>
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmpleados.map((empleado) => (
                    <tr key={empleado.id_Empleado}>
                    <td>{empleado.id_Empleado}</td>
                    <td>{empleado.nombres}</td>
                    <td>{empleado.apellidos}</td>
                    <td>{empleado.direccion}</td>
                    <td>{empleado.telefono}</td>
                    <td>{empleado.correo}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        </div>
    );
}

export default ListEmpleado;
