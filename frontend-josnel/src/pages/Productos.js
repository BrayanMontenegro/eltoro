import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';

function Producto({ rol })  {
  const [nombre, setNombre] = useState('');
  const [precio_compra, setPrecioCompra] = useState('');
  const [precio_venta, setPrecioVenta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [imagen, setImagen] = useState('');
  const [Categoria, setCategoria] = useState('');

  const handleImagenChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      setImagen(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nombre,
      precio_compra,
      precio_venta,
      descripcion,
      cantidad,
      imagen,
      Categoria,
    };

    console.log('Datos a enviar al servidor:', formData);

    try {
      const response = await fetch('http://localhost:5000/crud/createProduc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Respuesta del servidor:', response);
        alert('Registro exitoso');
        setNombre('');
        setPrecioCompra('');
        setPrecioVenta('');
        setDescripcion('');
        setCantidad('');
        setImagen('');
        setCategoria('');
      } else {
        console.log('Error en la respuesta del servidor:', response.status);
        alert('Error al registrar el producto');
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
            <Card.Title>Registro de Producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="nombre" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="precioCompra" label="Precio de Compra">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el precio de compra"
                      value={precio_compra}
                      onChange={(e) => setPrecioCompra(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="precioVenta" label="Precio de Venta">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el precio de venta"
                      value={precio_venta}
                      onChange={(e) => setPrecioVenta(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="descripcion" label="Descripción">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la descripción"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="cantidad" label="Cantidad">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la cantidad"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="imagen" label="Imagen">
                    <Form.Control
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      size="lg"
                      onChange={handleImagenChange}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="categoria" label="Categoría">
                    <Form.Control
                      as="select"
                      value={Categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="">Seleccionar Categoría</option>
                      <option value="Electronico">Electrónico</option>
                      <option value="VideosJuegos">Videojuegos</option>
                      <option value="Consumibles">Consumibles</option>
                    </Form.Control>
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
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

export default Producto;
