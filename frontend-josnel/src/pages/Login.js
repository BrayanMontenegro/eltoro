import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Login = ({ setRol }) => {
    const navigate = useNavigate();

    const [nombre_Usuario, setNombreUsuario] = useState('');
    const [contrasena, setContraseña] = useState('');

    const handleSubmit = async event => {
        event.preventDefault(); 

        // Objeto con los datos del formulario
        const formData = {
        nombre_Usuario,
        contrasena
        };

        try {
        const response = await fetch('http://localhost:5000/crud/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    
        if (response.ok) {
            const { rol } = await response.json();
    
            setRol(rol); // Actualiza el estado del rol solo si las credenciales son correctas
            navigate('/home');
        } else {
            console.log('Usuario o contraseña incorrecta');
            alert('Usuario o contraseña incorrecta');
        }
        } catch (error) {
        console.error('Error en la solicitud: ', error);
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
                <Card.Title className="mb-3">Incio de Sesión</Card.Title>
                </div>
                <div class="form-box">
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
                    <Col sm="12" md="12" lg="12">
                        <FloatingLabel controlId="contrasena" label="Ingrese su contraseña">
                        <Form.Control
                            placeholder="Ingrese su contraseña"
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                        </FloatingLabel>
                    </Col>
                    </Row>

                    <div className="center-button">
                    <Button variant="primary" type="submit" block className="mt-3">
                        Iniciar Sesión
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

export default Login;
