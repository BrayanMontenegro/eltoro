import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaSistrix, FaPencil, FaTrashCan} from 'react-icons/fa6';

function ListProducto({rol}) {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        precio_compra: '',
        precio_venta: '',
        descripcion: '',
        stock: '',
        imagen: '',
        id_Categoria: '',
    });

    const handleImagenChange = (event) => {
        const file = event.target.files[0]; // Obtener el primer archivo seleccionado
        
            const reader = new FileReader();
            reader.onload = () => {
            const base64String = reader.result; // Obtener la imagen en formato base64
            setFormData({
                ...formData,
                imagen: base64String
            });
            }; 
            if (file) {
            reader.readAsDataURL(file); // Lee el contenido del archivo como base64
            }
        };

    const [searchQuery, setSearchQuery] = useState('');

    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategory] = useState(null);
    const [showCategoriaModal, setShowCategoryModal] = useState(false);
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProductos = productos.filter((producto) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const nombre = producto.nombre.toLowerCase();
        const descripcion = producto.descripcion.toLowerCase();
        const categoria = categorias.find((categoria) => categoria.id_Categoria === producto.id_Categoria)?.nom_categoria.toLowerCase();
        const search = searchQuery.toLowerCase();
    
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        nombre.includes(search) ||
        descripcion.includes(search) ||
        categoria.includes(search)
        );
    });

    // Función para abrir el modal y pasar los datos del producto seleccionado
    const openModal = (producto) => {
        setSelectedProducto(producto);

        setFormData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio_compra: producto.precio_compra,
        precio_venta: producto.precio_venta,
        stock: producto.stock,
        imagen: producto.imagen,
        id_Categoria: producto.id_Categoria
        });
        setShowModal(true);
    };

      // Función para manejar cambios en el formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'id_Categoria') {
            setFormData({
                ...formData,
                [name]: value,
            });
            } else {
            setFormData({
                ...formData,
                [name]: value,
            });
            }
        };

    const loadProductos = () => {
        fetch('http://localhost:5000/crud/readproducto')
        .then((response) => response.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error('Error al obtener los productos:', error));
    };

        const loadCategorias = () => {
            fetch('http://localhost:5000/crud/readcategoria')
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error('Error al obtener las categorias:', error));
        };

        // Realiza una solicitud GET al servidor para obtener los datos
        useEffect(() => {
            loadProductos();
            loadCategorias();
        }, []);

    // Función para enviar el formulario de actualización
    const handleUpdate = () => {
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updateproducto/${selectedProducto.id_Producto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
            // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de productos
            setShowModal(false);
            loadProductos(); // Cargar la lista de productos actualizada
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    // Función para eliminar un producto
    const handleDelete = (id_Producto) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar esta producto?');
        if (confirmation) {
        // Realiza la solicitud DELETE al servidor para eliminar el producto
        fetch(`http://localhost:5000/crud/deleteproducto/${id_Producto}`, {
            method: 'DELETE',
        })
            .then((response) => {
            if (response.ok) {
                // La eliminación fue exitosa, refresca la lista de marcas
                loadProductos();
            }
            })
            .catch((error) => console.error('Error al eliminar el producto:', error));
        }
    };

    const openCategoriaModal = () => {
        setShowCategoryModal(true);
        };
        
        const closeCategoriaModal = () => {
            setShowCategoryModal(false);
        };
        
        const selectCategoria = (categoria) => {
            setSelectedCategory(categoria);
            setFormData({
            ...formData,
            id_Categoria: categoria.id_Categoria,
            });
            closeCategoriaModal();
        };
            

    return (
        <div>
        <Header rol={rol} />

        <Card className="margen" responsive>
            <Card.Body>
            <Card.Title className="titulo-2">Productos</Card.Title>
            
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
                    <th>Nombre de Producto</th>
                    <th>Imagen</th>
                    <th>Descripción</th>
                    <th>Precio de compra</th>
                    <th>Precio de venta</th>
                    <th>Almacen</th>
                    <th>Categoria</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredProductos.map((producto) => (
                    <tr key={producto.id_Producto}>
                    <td>{producto.id_Producto}</td>
                    <td>{producto.nombre}</td>
                    <td><img src={producto.imagen} alt={producto.nombre} style={{ maxWidth: '100px' }} /></td>
                    <td>{producto.descripcion}</td>
                    <td>C$ {producto.precio_compra}</td>
                    <td>C$ {producto.precio_venta}</td>
                    <td>{producto.stock} Unidades</td>
                    <td>{categorias.find((categoria) => categoria.id_Categoria === producto.id_Categoria)?.nom_categoria}</td>
                    <td>
                        <Button variant="primary" onClick={() => openModal(producto)}><FaPencil/></Button>
                        <Button variant="danger" onClick={() => handleDelete(producto.id_Producto)}><FaTrashCan/></Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Card.Body>
        </Card>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" responsive>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar registro de Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className="mt-3">
                <Card.Body>
                <Card.Title>Producto</Card.Title>
                <Form className="mt-3">
                    <Row className="g-3">

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="nombre" label="Nombre de Producto">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del producto"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="stock" label="Cantidad de Producto">
                        <Form.Control
                            type="number"
                            placeholder="Escriba aquí"
                            name="stock"
                            value={formData.stock}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="12">
                        <FloatingLabel controlId="descripcion" label="Descripción de Producto">
                        <Form.Control
                            type="text"
                            placeholder="Escriba aquí"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="precio_compra" label="Precio de compra">
                        <Form.Control
                            type="number"
                            placeholder="Escriba aquí"
                            name="precio_compra"
                            value={formData.precio_compra}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="6" md="6" lg="6">
                        <FloatingLabel controlId="precio_venta" label="Precio de venta">
                        <Form.Control
                            type="number"
                            placeholder="Escriba aquí"
                            name="precio_venta"
                            value={formData.precio_venta}
                            onChange={handleFormChange}
                        />
                        </FloatingLabel>
                    </Col>

                    <Col sm="12" md="12" lg="6">
                    <Form.Group controlId="imagen" className="" >
                        <Form.Control 
                            type="file" 
                            accept=".jpg, .png, .jpeg"
                            size="lg"
                            name="imagen"
                            onChange={handleImagenChange}
                        />
                        </Form.Group>
                    </Col>

                    <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="id_Categoria" label="Categoría">
                        <Form.Control
                            type="text"
                            placeholder="Categoría seleccionada"
                            name="id_Categoria"
                            value={selectedCategoria ? selectedCategoria.nom_categoria : ''}
                            readOnly
                        />
                        <Button className='botones' variant="outline-primary" onClick={openCategoriaModal}>
                        <FaSistrix/>
                        </Button>
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

        <Modal show={showCategoriaModal} onHide={closeCategoriaModal} responsive centered scrollable size='md'>
        <Modal.Header closeButton>
            <Modal.Title>Seleccionar Categoría</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {categorias.map((categoria) => (
                <div className='Seleccion' key={categoria.id_Categoria} onClick={() => selectCategoria(categoria)}>
                {categoria.nom_categoria}
                </div>
            ))}
            </Modal.Body>
        </Modal>

        </div>
    );
}

export default ListProducto;
