import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import {FaPencil, FaTrashCan} from 'react-icons/fa6';
import Footer from '../components/Footer';

function ListCategoria({rol}) {
    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState({});
    const [formData, setFormData] = useState({
        nom_categoria: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCategorias = categorias.filter((categoria) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nomcategoria = categoria.nom_categoria.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nomcategoria.includes(search)
        );
    });

    // Función para abrir el modal y pasar los datos de la categoria seleccionada
    const openModal = (categoria) => {
        setSelectedCategoria(categoria);

        setFormData({
        nom_categoria: categoria.nom_categoria,
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

    const loadCategorias = () => {
        fetch('http://localhost:5000/crud/readcategoria')
        .then((response) => response.json())
        .then((data) => setCategorias(data))
        .catch((error) => console.error('Error al obtener las categorias:', error));
    };


    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updatecategoria/${selectedCategoria.id_Categoria}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de categorias
            setShowModal(false);
            loadCategorias(); // Cargar la lista de categorias actualizada
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    // Función para eliminar un servicio
    const handleDelete = (id_Categoria) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar esta categoria?');
        if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar la categoria
        fetch(`http://localhost:5000/crud/deleteCategoria/${id_Categoria}`, {
            method: 'DELETE',
        })
            .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de categorias
                loadCategorias();
            }
            })
            .catch((error) => console.error('Error al eliminar la categoria:', error));
        }
    };

    // Realiza una solicitud GET al servidor para obtener las categorias
    useEffect(() => {
        fetch('http://localhost:5000/crud/readcategoria')
        .then((response) => response.json())
        .then((data) => setCategorias(data))
        .catch((error) => console.error('Error al obtener las categorias:', error));
    }, []);

    return (
        <div>
        <Header rol={rol} />

        <Card className="margen-contenedor" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Categorias</Card.Title>
            
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
                    <th>Nombre de Categoria</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategorias.map((categoria) => (
                    <tr key={categoria.id_Categoria}>
                    <td>{categoria.id_Categoria}</td>
                    <td>{categoria.nom_categoria}</td>
                    <td>
                        <Button variant="primary" onClick={() => openModal(categoria)}><FaPencil/></Button>
                        <Button variant="danger" onClick={() => handleDelete(categoria.id_Categoria)}><FaTrashCan/></Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" responsive>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar registro de Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="mt-3">
                <Card.Body>
                <Card.Title>Categoria</Card.Title>
                <Form className="mt-3">
                    <Row className="g-3">

                    <Col sm="6" md="6" lg="12">
                        <FloatingLabel controlId="nom_categoria" label="Nombre de Categoria">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la categoria"
                            name="nom_categoria"
                            value={formData.nom_categoria}
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

           <Footer/> 
        </div>
    );
}

export default ListCategoria;
