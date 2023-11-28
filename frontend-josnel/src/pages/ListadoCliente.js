import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import {FaPencil, FaTrashCan} from 'react-icons/fa6';

function ListCliente({rol}) {
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState({});
    const [formData, setFormData] = useState({
        nombres: '',
        apellido: '',
        direccion: '',
        cedula: '',
        telefono: '',
        correo: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredClientes = clientes.filter((cliente) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nombres = cliente.nombres.toLowerCase();
        const apellidos = cliente.apellidos.toLowerCase();
        const direccion = cliente.direccion.toLowerCase();
        const cedula = cliente.cedula.toLowerCase();
        const telefono = cliente.telefono.toLowerCase();
        const correo = cliente.correo.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nombres.includes(search) ||
        apellidos.includes(search) ||
        direccion.includes(search) ||
        cedula.includes(search) ||
        telefono.includes(search) ||
        correo.includes(search)
        );
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

    // Función para manejar cambios en el formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const loadClientes = () => {
        fetch('http://localhost:5000/crud/readcliente')
        .then((response) => response.json())
        .then((data) => setClientes(data))
        .catch((error) => console.error('Error al obtener las clientes:', error));
    };


    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updatecliente/${selectedCliente.id_Cliente}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            // La actualización fue exitosa
            setShowModal(false);
            loadClientes(); // Cargar la lista actualizada
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

 
    const handleDelete = (id_Cliente) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar este cliente?');
        if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar
        fetch(`http://localhost:5000/crud/deletecliente/${id_Cliente}`, {
            method: 'DELETE',
        })
            .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista
                loadClientes();
            }
            })
            .catch((error) => console.error('Error al eliminar el cliente:', error));
        }
    };

    // Realiza una solicitud GET al servidor para obtener los datos
    useEffect(() => {
        fetch('http://localhost:5000/crud/readcliente')
        .then((response) => response.json())
        .then((data) => setClientes(data))
        .catch((error) => console.error('Error al obtener los clientes:', error));
    }, []);

    return (
        <div>
        <Header rol={rol} />

        <Card className="margen" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Clientes</Card.Title>

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
                    <th>Cédula</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredClientes.map((cliente) => (
                    <tr key={cliente.id_Cliente}>
                    <td>{cliente.id_Cliente}</td>
                    <td>{cliente.nombres}</td>
                    <td>{cliente.apellidos}</td>
                    <td>{cliente.cedula}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.correo}</td>
                    <td>{cliente.direccion}</td>
                    <td>
                        <Button variant="primary" onClick={() => openModal(cliente)}><FaPencil/></Button>
                        <Button variant="danger" onClick={() => handleDelete(cliente.id_Cliente)}><FaTrashCan/></Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" responsive>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar registro de cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="mt-3">
                <Card.Body>
                <Card.Title>Cliente</Card.Title>
                <Form className="mt-3">
                    <Row className="g-3">

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="nombres" label="Nombres">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese sus nombres"
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
                        placeholder="Ingrese sus apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleFormChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="cedula" label="Cédula">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su cédula"
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
                        placeholder="Ingrese su teléfono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleFormChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="direccion" label="Dirección">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleFormChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="correo" label="Correo">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su correo"
                        name="correo"
                        value={formData.correo}
                        onChange={(handleFormChange)}
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

export default ListCliente;
