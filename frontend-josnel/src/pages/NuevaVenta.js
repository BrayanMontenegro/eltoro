import React , { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Form, Modal, FloatingLabel, Table } from 'react-bootstrap';
import { FaSearch, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Header from '../components/Header';
import '../styles/App.css';
import Footer from '../components/Footer';

function Venta({ rol }) {

    const [formData, setFormData] = useState({
        id_Empleado: '',
        id_Cliente: '',
        id_Producto: '',
    });

    const [Cantidad, setCantidad] = useState('');
    const [tipo_pago, setTipoPago] = useState('');

    const [empleados, setEmpleados] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);

    const [detalleVenta, setDetalleVenta] = useState([]);

    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showEmpleadoModal, setShowEmpleadoModal] = useState(false);
    const [showProductoModal, setShowProductoModal] = useState(false);

    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);
    const [selectedProducto, setSelectedProducto] = useState(null);


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const AgregarDetalleProducto = () => {
        if (selectedProducto && Cantidad) {
        const nuevoDetalle = {
            id_Producto: selectedProducto.id_Producto,
            nombre: selectedProducto.nombre,
            precio_venta: selectedProducto.precio_venta,
            Cantidad: Cantidad
        };
        setDetalleVenta([...detalleVenta, nuevoDetalle]);
        setCantidad('');
        setSelectedProducto('');
        } else {
        alert('Asegúrese de selecionar un producto o ingresar una cantidad.');
        }
    };

    const EliminarDetalle = (id_Producto) => {
        const detallesActualizados = detalleVenta.filter(detalle => detalle.id_Producto !== id_Producto);
        setDetalleVenta(detallesActualizados);
    };


    const filteredClientes = clientes.filter((cliente) => {
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const id_Cliente = cliente.id_Cliente;
        const nombres = cliente.nombres.toLowerCase(); 
        const search = searchQuery.toLowerCase();
        
        // Verifica si la cadena de búsqueda se encuentra en algún campo
        return (
        id_Cliente === (search) ||
        nombres.includes(search)
        );
    });
    

    //Manejo de carga y selección de Clientes --------------------------------------
    const loadClientes = () => {
        fetch('http://localhost:5000/crud/readcliente')
        .then((response) => response.json())
        .then((data) => setClientes(data))
        .catch((error) => console.error('Error al obtener los clientes:', error));
    };

    //Control de apertura de modal de Clientes
    const openClienteModal = () => {
        setShowClienteModal(true);
    };

    //Control de clierre de modal de Clientes
    const closeClienteModal = () => {
        setShowClienteModal(false);
        setSearchQuery('');
    };

    //Actualización de valor de variable de estado de Cliente selecionado
    const selectCliente = (cliente) => {
        setSelectedCliente(cliente);
        setFormData({
        ...formData,
        id_Cliente: cliente.id_Cliente,
        });
        closeClienteModal();
    };

    //Manejo de carga y selección de Empleados --------------------------------------
    const loadEmpleados = () => {
        fetch('http://localhost:5000/crud/readEmpleado')
        .then((response) => response.json())
        .then((data) => setEmpleados(data))
        .catch((error) => console.error('Error al obtener los empleados:', error));
    };

    //Control de apertura de modal de Empleados
    const openEmpleadoModal = () => {
        setShowEmpleadoModal(true);
    };

    //Control de clierre de modal de Empleados
    const closeEmpleadoModal = () => {
        setShowEmpleadoModal(false);
    };

    //Actualización de valor de variable de estado de Empleado selecionado
    const selectEmpleado = (empleado) => {
        setSelectedEmpleado(empleado);
        setFormData({
        ...formData,
        id_Empleado: empleado.id_Empleado,
        });
        closeEmpleadoModal();
    };

    //Manejo de carga y selección de Productos --------------------------------------
    const loadProductos = () => {
        fetch('http://localhost:5000/crud/readproducto')
        .then((response) => response.json())
        .then((data) => setProductos(data))
        .catch((error) => console.error('Error al obtener los productos:', error));
    };

    //Control de apertura de modal de Empleados
    const openProductoModal = () => {
        setShowProductoModal(true);
    };

    //Control de clierre de modal de Empleados
    const closeProductoModal = () => {
        setShowProductoModal(false);
    };

    //Actualización de valor de variable de estado de Empleado selecionado
    const selectProducto = (producto) => {
        setSelectedProducto(producto);
        setFormData({
        ...formData,
        id_Producto: producto.id_Producto,
        });
        closeProductoModal();
    };

    //Carga de datos de Clientes, Empleados y Productos
    useEffect(() => {
        loadClientes ();
        loadEmpleados();
        loadProductos();
    }, []);


    const registrarVenta = () => {
        if (selectedCliente && selectedEmpleado && detalleVenta.length > 0) {
        const data = {
            id_Cliente: selectedCliente.id_Cliente,
            id_Empleado: selectedEmpleado.id_Empleado,
            tipo_pago: tipo_pago,
            detalle: detalleVenta
        };

        fetch('http://localhost:5000/crud/createventa', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
            if (response.ok) {
                // Aquí puedes mostrar un mensaje de éxito o reiniciar los estados
                console.log('Venta registrada con éxito');
                alert('¡Venta registrada con éxito!');
                setDetalleVenta([]);
                setTipoPago('');
                // Limpia otros estados según sea necesario
            } else {
                // Aquí maneja el caso de error en la petición
                console.error('Error al registrar la venta');
            }
            })
            .catch((error) => {
            // Aquí maneja los errores de red u otros
            console.error('Error en la solicitud:', error);
            });
        } else {
        alert('Asegúrese de completar la información necesaria para registrar la venta.');
        }
    };


    return(
        <div>
        <Header rol={ rol } />

        <Container className="margen-contenedor">
            <Card className="global-margin-top">
            <Card.Body>
                <Card.Title className="mt-5 title">Registro de Venta</Card.Title>
                <Form className="mt-5" >
                <Row className="g-3">

                    <Col sm="12" md="4" lg="4">
                    <FloatingLabel controlId="id_Cliente" label="Cliente">
                        <Form.Control
                        type="text"
                        placeholder="Seleccionar Cliente"
                        name="id_Cliente"
                        value={selectedCliente ? selectedCliente.nombres : ''}
                        readOnly
                        />
                        <div className="button-container">
                        <Button className="botones" variant="outline-primary" onClick={openClienteModal}>
                            <FaSearch />
                        </Button>
                        </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="4" lg="4">
                    <FloatingLabel controlId="id_Empleado" label="Empleado">
                        <Form.Control
                        type="text"
                        placeholder="Seleccionar Empleado"
                        name="id_Empleado"
                        value={selectedEmpleado ? selectedEmpleado.nombre_Usuario : ''}
                        readOnly
                        />
                        <div className="button-container">
                        <Button className="botones" variant="outline-primary" onClick={openEmpleadoModal}>
                            <FaSearch />
                        </Button>
                        </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="4" lg="4">
                    <FloatingLabel controlId="id_Producto" label="Producto">
                        <Form.Control
                        type="text"
                        placeholder="Seleccionar Producto"
                        name="id_Producto"
                        value={selectedProducto ? selectedProducto.nombre : ''}
                        readOnly
                        />
                        <div className="button-container">
                        <Button className="botones" variant="outline-primary" onClick={openProductoModal}>
                            <FaSearch />
                        </Button>
                        </div>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="2" lg="2" className="">
                    <FloatingLabel controlId="Cantidad" label="Cantidad">
                        <Form.Control 
                        type="number" 
                        min={1}
                        placeholder="Cantidad de Producto"
                        value={Cantidad}
                        onChange={(e) => setCantidad(e.target.value)} 
                        />
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="2" lg="2" className="d-flex align-items-center">
                    <Button onClick={AgregarDetalleProducto} variant="outline-success" size="lg">
                        <FaPlus />
                    </Button>
                    </Col>

                    <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="tipo_pago" label="Tipo de pago">
                        <Form.Select 
                        aria-label="Tipo de pago"
                        value={tipo_pago}
                        onChange={(e) => setTipoPago(e.target.value)}
                        >
                        <option>Seleccione el tipo de pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transacción">Transacción</option>
                        </Form.Select>
                    </FloatingLabel>
                    </Col>

                    <Col sm="12" md="1" lg="12">
                    <Card className="global-margin-top">
                        <Card.Body>
                        <Card.Title className="mt-3 title">Detalle de productos</Card.Title>
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {detalleVenta.map((detalle) => (
                            <tr key={detalle.id_Producto}>
                                <td>{detalle.id_Producto}</td>
                                <td>{detalle.nombre}</td>
                                <td>C$ {detalle.precio_venta}</td>
                                <td>{detalle.Cantidad} Unidades</td>
                                <td>C$ {detalle.Cantidad * detalle.precio_venta}</td>
                                <td className="align-button">
                                <Button 
                                    size="sm"
                                    onClick={() => EliminarDetalle(detalle.id_Producto)}
                                    variant="danger">
                                    
                                    <FaTrashAlt />
                                </Button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
                    </Col>

                </Row>
                <div className="center-button">
                    <Button variant="primary" onClick={registrarVenta} className="mt-3" size="lg">
                    Registrar
                    </Button>
                </div>
                </Form>
            </Card.Body>
            </Card>
        </Container>

        <Modal show={showClienteModal} onHide={closeClienteModal} centered scrollable size='md'>
            <Modal.Header closeButton>
            <Modal.Title>Seleccionar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row className="mb-3">
                <Col sm="12" md="12" lg="12">
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

            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
                </thead>
                <tbody>
                {filteredClientes.map((cliente) => (
                    <tr key={cliente.id_Cliente} onClick={() => selectCliente(cliente)}>
                    <td>{cliente.nombres}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </Modal.Body>
        </Modal>

        <Modal show={showEmpleadoModal} onHide={closeEmpleadoModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>Seleccionar Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {empleados.map((empleado) => (
                <div className="Seleccion" key={empleado.id_Empleado} onClick={() => selectEmpleado(empleado)}>
                {empleado.nombre_Usuario}
                </div>
            ))}
            </Modal.Body>
        </Modal>

        <Modal show={showProductoModal} onHide={closeProductoModal} centered>
            <Modal.Header closeButton>
            <Modal.Title>Seleccionar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {productos.map((producto) => (
                <div className="Seleccion" key={producto.id_Producto} onClick={() => selectProducto(producto)}>
                {producto.nombre}
                </div>
            ))}
            </Modal.Body>
        </Modal>
                <Footer/>
        </div>
    );
}

export default Venta;