import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import Header from '../components/Header';

function ListVenta({rol}) {
    const [ventas, setVentas] = useState([]);

    // Realiza una solicitud GET al servidor para obtener las ventas
    useEffect(() => {
        fetch('http://localhost:5000/crud/readventa')
        .then((response) => response.json())
        .then((data) => setVentas(data))
        .catch((error) => console.error('Error al obtener las categorias:', error));
    }, []);

    return (
        <div>
        <Header rol={rol} />

        <Card className="margen-contenedor" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Ventas</Card.Title>

            <Table striped bordered hover className='table'>
                <thead>
                <tr>
                    <th>N°</th>
                    <th>Empleado</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Tipo de pago</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {ventas.map((venta) => (
                    <tr key={venta.id_Detalle}>
                    <td>{venta.id_Detalle}</td>
                    <td>{venta.nombre_Usuario}</td>
                    <td>{venta.fecha}</td>
                    <td>{venta.nombres}</td>
                    <td>{venta.nombre}</td>
                    <td>C$ {venta.precio_venta}</td>
                    <td>{venta.Cantidad} Unidades</td>
                    <td>{venta.tipo_pago}</td>
                    <td>C$ {venta.Cantidad * venta.precio_venta}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        </div>
    );
}

export default ListVenta;
