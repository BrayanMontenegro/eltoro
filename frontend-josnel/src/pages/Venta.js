import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Form, Row, Col, Modal, FloatingLabel } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';

function VentaComponent() {
  const [clientes, setClientes] = useState([]);
  const [Cliente, setCliente] = useState('');
  const [id_Cliente, setIDCliente] = useState('');

  const [productos, setProductos] = useState([]);

  const [fechaVenta, setFechaVenta] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [productoId, setProductoId] = useState('');
  const [monto, setMonto] = useState('');
  const [tipoPago, setTipoPago] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleFechaChange = (e) => {
    setFechaVenta(e.target.value);
  };

  const handleClienteChange = (e) => {
    setClienteId(e.target.value);
  };

  const handleProductoChange = (e) => {
    setProductoId(e.target.value);
  };

  const handleMontoChange = (e) => {
    setMonto(e.target.value);
  };

  const handleTipoPagoChange = (e) => {
    setTipoPago(e.target.value);
  };

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  const handleSubmit = async () => {
    // Realizar la solicitud HTTP para insertar la venta y el detalle de la venta en el backend
    try {
      const response = await fetch('http://localhost:5000/crud/insertVenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: fechaVenta,
        }),
      });

      if (response.ok) {
        // Obtener el ID de la venta recién insertada
        const ventaData = await response.json();
        const idVenta = ventaData.id; // Asegúrate de ajustar esto según la respuesta real del servidor

        // Insertar el detalle de la venta
        await fetch('http://localhost:5000/crud/insertDventa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Monto: monto,
            tipo_pago: tipoPago,
            Cantidad: cantidad,
            id_producto: productoId,
            id_venta: idVenta,
            id_Cliente: clienteId,
          }),
        });

        // Cerrar el modal y recargar datos si es necesario
        setShowModal(false);
      } else {
        console.error('Error al insertar venta:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

useEffect(() => {
  // Realiza una solicitud a tu ruta para obtener 
  fetch('http://localhost:5000/crud/readclientes')
    .then(response => response.json())
    .then(data => {
      // Actualiza el estado c
      setClientes(data);
    })
    .catch(error => {
      console.error('Error al obtener los clientes', error);
    });
}, []);

  return (
    <Container>
      <Card className="mt-5">
        <Card.Body>
          <Card.Title className="mt-3">Nueva Venta</Card.Title>
          <Form className="mt-4">
            {/* Campos para la venta */}
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="fechaVenta" label="Fecha de Venta">
                  <Form.Control type="date" value={fechaVenta} onChange={handleFechaChange} />
                </FloatingLabel>
              </Col>
              <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="id_Cliente" label="Cliente">
                    <Form.Select
                      aria-label="Cliente"
                      value={id_Cliente}
                      onChange={(e) => setCliente(e.target.value)}
                    >
                      <option>Seleccione el cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id_Cliente} value={cliente.id_Cliente}>
                          {cliente.nombres}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
            </Row>

            {/* Campos para el detalle de la venta */}
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="producto" label="Producto">
                  <Form.Select value={productoId} onChange={handleProductoChange}>
                    <option value="">Seleccione un producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="monto" label="Monto">
                  <Form.Control type="text" value={monto} onChange={handleMontoChange} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="tipoPago" label="Tipo de Pago">
                  <Form.Control type="text" value={tipoPago} onChange={handleTipoPagoChange} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="cantidad" label="Cantidad">
                  <Form.Control type="text" value={cantidad} onChange={handleCantidadChange} />
                </FloatingLabel>
              </Col>
            </Row>

            {/* Botón para abrir el modal */}
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <FaPlus /> Nueva Venta
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Modal para confirmar la venta */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Desea confirmar la venta?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirmar Venta
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default VentaComponent;