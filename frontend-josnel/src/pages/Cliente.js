import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';

function InsertarCliente({ rol })  {
  const [clienteData, setClienteData] = useState({
    nombres: '',
    apellidos: '',
    direccion: '',
    cedula: '',
    telefono: '',
    correo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteData({
      ...clienteData,
      [name]: value,
    });
  };

  const handleInsertCliente = async () => {
    try {
      const response = await fetch('http://localhost:5000/crud/insertcliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });

      if (response.ok) {
        alert('Cliente ingresado exitosamente');
        setClienteData({
          nombres: '',
          apellidos: '',
          direccion: '',
          cedula: '',
          telefono: '',
          correo: '',
        });
      } else {
        alert('Error al registrar Cliente');
      }
    } catch (error) {
      console.error('Error in the request:', error);
      alert('Error in the server request');
    }
  };

  return (
    <div>
      <Header rol={rol} />
      <Container className="mt-3">
        <Card>
          <Card.Body>
            <Card.Title>Registro de Cliente</Card.Title>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombres" label="Nombres">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese los nombres"
                      name="nombres"
                      value={clienteData.nombres}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="apellidos" label="Apellidos">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese los apellidos"
                      name="apellidos"
                      value={clienteData.apellidos}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="12" lg="12">
                  <FloatingLabel controlId="direccion" label="Dirección">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la dirección"
                      name="direccion"
                      value={clienteData.direccion}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="cedula" label="Cédula">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la cédula"
                      name="cedula"
                      value={clienteData.cedula}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="telefono" label="Teléfono">
                    <Form.Control
                      type="number"
                      placeholder="Ingrese el teléfono"
                      name="telefono"
                      value={clienteData.telefono}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="correo" label="Correo">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el correo"
                      name="correo"
                      value={clienteData.correo}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button mt-3">
                <Button variant="primary" onClick={handleInsertCliente} size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default InsertarCliente;
