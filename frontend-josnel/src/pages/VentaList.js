import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, FloatingLabel, Form, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';

function ClienteList({ rol }) {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState({});
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    direccion: '',
    cedula: '',
    telefono: '',
    correo: '',
  });

  const openModal = (cliente) => {
    setSelectedCliente(cliente);

    setFormData({
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      direccion: cliente.direccion,
      cedula: cliente.cedula,
      telefono: cliente.telefono,
      correo: cliente.correo,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateclientes/${selectedCliente.id_Cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadClientes();
        }
      })
      .catch((error) => console.error('Error al actualizar el cliente:', error));
  };

  const handleDelete = (idCliente) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteclientes/${idCliente}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadClientes();
          }
        })
        .catch((error) => console.error('Error al eliminar el cliente:', error));
    }
  };

  const loadClientes = () => {
    fetch('http://localhost:5000/crud/readclientes')
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error('Error al obtener los clientes:', error));
  };

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <div>
      <Header rol={rol} />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Clientes</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Dirección</th>
                <th>Cédula</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id_Cliente}>
                  <td>{cliente.id_Cliente}</td>
                  <td>{cliente.nombres}</td>
                  <td>{cliente.apellidos}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.correo}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(cliente)}>
                      Actualizar
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(cliente.id_Cliente)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Cliente</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombres" label="Nombres">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los nombres"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="apellidos" label="Apellidos">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="cedula" label="Cédula">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la cédula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="correo" label="Correo">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ClienteList;
