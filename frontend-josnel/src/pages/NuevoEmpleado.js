import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function CreateEmpleado() {

  // Crear un estado para cada campo del formulario
    const [nombre_Usuario, setNombreUsuario] = useState('');
    const [contrasena, setContraseña] = useState('');
    const [rol, setRol] = useState('');
    const [Correo, setCorreo] = useState('');   
    const [Telefono, setTelefono] = useState('');

    //Validar el input telefono para que solo acepte números
    const handleTelefonoChange = (e) => {
        const telf = e.target.value.replace(/[^0-9]/g, ''); 
        setTelefono(telf);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

    if (!nombre_Usuario || !contrasena || !rol || !Correo || !Telefono) {
        alert ('Debe completar los campos');
        return;
    }

        // Crear un objeto con los datos del formulario
        const formData = {
        nombre_Usuario,
        contrasena,
        rol,
        Correo,
        Telefono,
        };

        try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createEmpleado', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El registro se creó exitosamente
            alert('Cuenta Creada');
            // Reiniciar los campos del formulario
            setNombreUsuario('');
            setContraseña('');
            setRol('');
            setCorreo('');
            setTelefono('');
        } else {
            alert('Los campos son obligatorios');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };

    return (
        <div class="section">
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }} responsive>
        <Row className="justify-content-md-center">
            <Col md={12}>
            <Card>
                <Card.Body>
                <div class="h2">
                <Card.Title className="mb-3">Crear Cuenta</Card.Title>
                </div>
                <div class="form">
                <Form onSubmit={handleSubmit}>

                    <Row>
                    <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="nombre_Usuario" label="Ingrese su usuario">
                        <Form.Control
                            placeholder="Ingrese su usuario"
                            type="text"
                            value={nombre_Usuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                        </FloatingLabel>
                    </Col>
                    <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="contrasena" label="Ingrese su contraseña">
                        <Form.Control
                            placeholder="Ingrese su contraseña"
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                        </FloatingLabel>
                    </Col>
                    <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="Correo" label="Ingrese su correo">
                        <Form.Control
                            placeholder="Ingrese su correo"
                            type="text"
                            value={Correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        </FloatingLabel>
                    </Col>
                    <Col sm="12" md="12" lg="12" className="mb-3">
                        <FloatingLabel controlId="Telefono" label="Ingrese su número">
                        <Form.Control
                            placeholder="Ingrese su número"
                            type="text"
                            min={8}
                            value={Telefono}
                            onChange={handleTelefonoChange}
                        />
                        </FloatingLabel>
                    </Col>
                    <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="rol" label="Rol">
                        <Form.Select 
                        aria-label="Rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        >
                        <option>Seleccione el rol</option>
                        <option value="Vendedor">Vendedor</option>
                        </Form.Select>
                    </FloatingLabel>
                    </Col>
                    </Row>

                    <div className="center-button">
                    <Button variant="primary" type="submit" block className="mt-3">
                        Crear Cuenta
                    </Button>
                    </div>

                </Form>
                </div>
                </Card.Body>
            </Card>
            </Col>   
        </Row>
        </Container>
        </div>
    );
};

export default CreateEmpleado;
