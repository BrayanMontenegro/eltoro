import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import { FaPlus } from 'react-icons/fa6';
import Footer from '../components/Footer';

function Producto({rol}) {

  // Crear un estado para cada campo del formulario
    const [nombre, setNombre] = useState('');
    const [precio_compra, setPrecioCompra] = useState('');
    const [precio_venta, setPrecioVenta] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('');

    //Variables de estado de categoria
    const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorias
    const [id_Categoria, setid_Categoria] = useState(''); // Estado para el valor seleccionado
            
    const [showCategoriaModal, setShowCategoriaModal] = useState(false);

       //Variables de estado de una imagen
        const [imagen, setImagen] = useState('');

        const handleImagenChange = (event) => {
            const file = event.target.files[0]; // Obtener el primer archivo seleccionado
        
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result; // Obtener la imagen en formato base64
              setImagen(base64String); // Puedes visualizar la imagen en base64 en la consola para asegurarte de que la conversión se hizo correctamente
            }; 
            if (file) {
              reader.readAsDataURL(file); // Lee el contenido del archivo como base64
            }
        };

            const loadCategoria = () => {
                fetch('http://localhost:5000/crud/readcategoria')
                    .then((response) => response.json())
                    .then((data) => setCategorias(data))
                    .catch((error) => console.error('Error al obtener las categorias:', error));
                };
    
                useEffect(() => {
                    loadCategoria();
                }, []);
                    
                    const openCategoriaModal = () => {
                        setShowCategoriaModal(true);
                    };
                    
                    const closeCategoriaModal = () => {
                        setShowCategoriaModal(false);
                    };

    
    const handleDescripcionChange = (e) => {
    const descrip = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
    setDescripcion(descrip);
    };

    const handleNombreChange = (e) => {
        const nom = e.target.value.replace(/[^a-zA-Z ]/g, ''); // Solo agrega letras
        setNombre(nom);
        };

 // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
    e.preventDefault();

    //Validar los campos
    if (!nombre || !precio_compra || !precio_venta || !descripcion || !stock || !imagen || !id_Categoria) {
        alert('Debe completar todos los campos');
        return;
    }

    // Crear un objeto con los datos del formulario
    const formData = {
    nombre,
    precio_compra,
    precio_venta,
    descripcion,
    stock,
    imagen,
    id_Categoria,
    };

    try {
    // Realizar una solicitud HTTP al backend para enviar los datos
    const response = await fetch('http://localhost:5000/crud/createproducto', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        // El registro se creó exitosamente
        alert('Producto Agregado');
        // Reiniciar los campos del formulario
        setNombre('');
        setPrecioCompra('');
        setPrecioVenta('');
        setDescripcion('');
        setStock('');
        setid_Categoria('');
    } else {
        alert('Error al registrar producto');
    }
    } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Error en la solicitud al servidor');
    }
};

    const [nom_categoria, setNombreCategoria] = useState('');

const handleSubmitCategoria = async (e) => {
    e.preventDefault();

    //Validar campos
    if (!nom_categoria) {
        alert ('Debe completar los campos');
        return;
    }

    const formData = {
        nom_categoria,
        };

        try {
        const response = await fetch('http://localhost:5000/crud/createcategoria', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Categoria Agregada');
            loadCategoria();
            setNombreCategoria('');
        } else {
            alert('Error al registrar la categoria');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        }
    };


    return(
        <div className='formulario'>
        <Header rol={rol} />
        
        <Container responsive>
            <Card className="margen-contenedor">
            <Card.Body>
                <Card.Title className="mt-3">Nuevo Producto</Card.Title>
                <div className='form-1'>
                <Form className="mt-4" onSubmit={handleSubmit}>
                <Row className="g-3">

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="nombre" label="Nombre del producto">
                        <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre del producto"
                        value={nombre}
                        onChange={handleNombreChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="stock" label="Cantidad en almacén">
                        <Form.Control
                        type="number"
                        min={1} //mínimo de número
                        placeholder="Escriba aquí"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                    <FloatingLabel controlId="descripcion" label="Descripción del producto">
                        <Form.Control
                        type="text"
                        placeholder="Escriba aquí"
                        value={descripcion}
                        onChange={handleDescripcionChange}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="precio_compra" label="Precio de compra">
                        <Form.Control
                        type="number"
                        min={1} //mínimo de número
                        placeholder="Ingrese el precio del producto"
                        value={precio_compra}
                        onChange={(e) => setPrecioCompra(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                    <FloatingLabel controlId="precio_venta" label="Precio de venta">
                        <Form.Control
                        type="number"
                        min={1} //mínimo de número
                        placeholder="Escriba aquí"
                        value={precio_venta}
                        onChange={(e) => setPrecioVenta(e.target.value)}
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="6" lg="6">
                    <Form.Group controlId="imagen" className="" >
                        <Form.Control 
                        type="file" 
                        accept=".jpg, .png, .jpeg"
                        size="lg"
                        onChange={handleImagenChange}
                        />
                    </Form.Group>
                    </Col>

                    <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="id_Categoria" label="Categoria">
                        <Form.Select
                        aria-label="Categoria"
                        value={id_Categoria}
                        onChange={(e) => setid_Categoria(e.target.value)}
                        >
                        <option>Seleccione la categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id_Categoria} value={categoria.id_Categoria}>
                            {categoria.nom_categoria}
                            </option>
                        ))}
                        </Form.Select>
                        <div className="button-container">
                        <Button className="botones" variant="primary" onClick={openCategoriaModal}>
                            <FaPlus />
                        </Button>
                    </div>
                    </FloatingLabel>
                    </Col>

                </Row>
                <div className="center-button">
                    <Button variant="primary" type="submit" className="mt-3" size="lg">
                    Registrar
                    </Button>
                </div>
                </Form>
                </div>
            </Card.Body>
            </Card>
        </Container>

        <Modal show={showCategoriaModal} onHide={closeCategoriaModal} responsive centered scrollable size='md'>
        <Modal.Header closeButton>
            <Modal.Title>Nueva Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmitCategoria}>
                <FloatingLabel controlId="NombreCategoria" label="Categoria">
                <Form.Control
                    type="text"
                    placeholder="Ingrese la categoria"
                    value={nom_categoria}
                    onChange={(e) => setNombreCategoria(e.target.value)}
                />
                </FloatingLabel>
                <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" onClick={closeCategoriaModal}>
                    Registrar
                </Button>
                </div>
            </Form>
            </Modal.Body>
        </Modal>

        <Footer/>
        </div>
    );
}

export default Producto;