import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';

function DetalleVenta({ rol })  {
  const [Monto, setMonto] = useState('');
  const [tipo_pago, setTipoPago] = useState('');
  const [Cantidad, setCantidad] = useState('');
  const [id_producto, setIdProducto] = useState('');
  const [id_Cliente, setIdCliente] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Monto,
      tipo_pago,
      Cantidad,
      id_producto,
      id_Cliente,
      fecha,
    };

    console.log('Datos a enviar al servidor:', formData);

    try {
      const response = await fetch('http://localhost:5000/crud/insertDventa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Respuesta del servidor:', responseData);
        alert('Detalle de Venta registrado exitosamente');
        // Limpiar los estados después de la inserción exitosa
        setMonto('');
        setTipoPago('');
        setCantidad('');
        setIdProducto('');
        setIdCliente('');
        setFecha('');
      } else {
        console.log('Error en la respuesta del servidor:', response.status);
        alert(`Error: ${responseData.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return (
    <div>
      <Header rol={rol} />
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Detalle de Venta</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Monto" label="Monto">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el monto"
                      value={Monto}
                      onChange={(e) => setMonto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="tipo_pago" label="Tipo de Pago">
                    <Form.Select
                      value={tipo_pago}
                      onChange={(e) => setTipoPago(e.target.value)}
                    >
                      <option value="">Seleccione el tipo de pago</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Dijital">Dijital</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Cantidad" label="Cantidad">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese la cantidad"
                      value={Cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="id_producto" label="ID del Producto">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el ID del producto"
                      value={id_producto}
                      onChange={(e) => setIdProducto(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="id_Cliente" label="ID del Cliente">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el ID del cliente"
                      value={id_Cliente}
                      onChange={(e) => setIdCliente(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="fecha" label="Fecha">
                    <Form.Control
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
                  Registrar Detalle de Venta
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DetalleVenta;
