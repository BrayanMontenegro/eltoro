import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Categoria({rol}) {

  // Crear un estado para cada campo del formulario
    const [nom_categoria, setNombreCategoria] = useState('');

      //Validar input del nombre de la categoría
        const handleCategoriaChange = (e) => {
        const nomC = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
        setNombreCategoria(nomC);
        };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

    if (!nom_categoria) {
        alert ('Debe completar los campos');
        return;
    }

        // Crear un objeto con los datos del formulario
        const formData = {
        nom_categoria,
        };

        try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createcategoria', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // El registro se creó exitosamente
            alert('Categoria Agregada');
            // Reiniciar los campos del formulario
            setNombreCategoria('');
        } else {
            alert('Error al registrar la categoría');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };

    return(
        <div className='formulario-1'>
        <Header rol={rol} />
        
        <Container responsive>
            <Card className="margen-contenedor">
            <Card.Body>
                <Card.Title>Nueva Categoria</Card.Title>
                <Form className="mt-3" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="nom_categoria" label="Nombre de Categoria">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la Categoria"
                        value={nom_categoria}
                        onChange={handleCategoriaChange}
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

export default Categoria;