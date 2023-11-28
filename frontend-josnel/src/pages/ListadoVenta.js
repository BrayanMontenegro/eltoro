import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import Header from '../components/Header';

function ListVenta({rol}) {
    const [detalle_ventas, setVentas] = useState([]);

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
                    <th>Nombre de producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                </tr>
                </thead>
                <tbody>
                {detalle_ventas.map((detalle_venta) => (
                    <tr key={detalle_venta.id_Detalle}>
                    <td>{detalle_venta.id_Detalle}</td>
                    <td>{detalle_venta.nombre}</td>
                    <td>C$ {detalle_venta.precio_venta}</td>
                    <td>{detalle_venta.Cantidad} Unidades</td>
                    <td>{detalle_venta.fecha}</td>
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
