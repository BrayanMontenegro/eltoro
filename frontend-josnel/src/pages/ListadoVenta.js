import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ListVenta({rol}) {
    const [ventas, setVentas] = useState([]);

    function formatFechaForInput(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatHoraForInput(dateTimeString) {
        const date = new Date(dateTimeString);
        const hrs = String(date.getHours());
        const min = String(date.getMinutes());
        const seg = String(date.getSeconds());
        return `${hrs}:${min}:${seg}`;
    }

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
                    <th>Hora</th>
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
                    <td>{formatFechaForInput(venta.fecha)}</td>
                    <td>{formatHoraForInput(venta.fecha)}</td>
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

        <Footer/>
        </div>
    );
}

export default ListVenta;
