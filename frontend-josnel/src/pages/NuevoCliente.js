import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Cliente({rol}) {

  // Crear un estado para cada campo del formulario
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');


        const handleNombresChange = (e) => {
        const nomM = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
        setNombres(nomM);
        };

        const handleApellidosChange = (e) => {
            const nomM = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
            setApellidos(nomM);
            };
        
        const handleDireccionChange = (e) => {
            const nomM = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
            setDireccion(nomM);
            };

        const handleTelefonoChange = (e) => {
            const telf = e.target.value.replace(/[^0-9]/g, ''); 
            setTelefono(telf);
        };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

    if (!nombres || !apellidos || !direccion || !cedula || !telefono ||  !correo) {
        alert ('Debe completar los campos');
        return;
    }

        // Crear un objeto con los datos del formulario
        const formData = {
        nombres,
        apellidos,
        direccion,
        cedula, 
        telefono,
        correo,
        };

        try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createcliente', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El registro se creó exitosamente
            alert('Cliente Agregado');
            // Reiniciar los campos del formulario
            setNombres('');
            setApellidos('');
            setDireccion('');
            setCedula('');
            setTelefono('');
            setCorreo('');
        } else {
            alert('Error al registrar un cliente');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };

    return(
        <div className='formulario-1'>
        <Header rol={rol}/>
        
        <Container responsive>
            <Card className="margen-contenedor">
            <Card.Body>
                <Card.Title>Nuevo Cliente</Card.Title>
                <Form className="mt-5" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombres" label="Nombres">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese sus nombres"
                        value={nombres}
                        onChange={handleNombresChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="apellidos" label="Apellidos">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese sus apellidos"
                        value={apellidos}
                        onChange={handleApellidosChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="cedula" label="Cédula">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su cédula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su teléfono"
                        value={telefono}
                        onChange={handleTelefonoChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="direccion" label="Dirección">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su dirección"
                        value={direccion}
                        onChange={handleDireccionChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="correo" label="Correo">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese su correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                </Row>
                <div className="center-button">
                    <Button variant="primary" type="submit" className="mt-3" size="lg">
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

export default Cliente;