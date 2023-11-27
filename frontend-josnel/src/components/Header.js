import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Header({ rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
    return (
        <div>
          {rol === 'admin' && (
          <div>
        {/* Navbar principal */}
        <Navbar className="navbar-color" variant="dark" expand="md">
          <Container>
            <Navbar.Brand href="#home">Sala de Videojuegos El Toro</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ display: 'none' }}
              className="d-sm-none d-xs-none"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
  
                <Nav.Link>
                  <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>
  
                <NavDropdown title="Clientes" id="clientes">
                  <NavDropdown.Item>
                    <Link to="/cliente" className="link-unstyled">Nuevo Cliente</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/clientelist" className="link-unstyled">Gestión de Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Categorias" id="categorias">
                  <NavDropdown.Item>
                    <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Gestión de Categorias</Link>
                  </NavDropdown.Item>
                </NavDropdown>
  
                <NavDropdown title="Productos" id="productos">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/productolist" className="link-unstyled">Gestión de Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/catalogo" className="link-unstyled">Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte" className="link-unstyled">Reporte de Productos</Link>
                  </NavDropdown.Item>w
                </NavDropdown>

                <NavDropdown title="Venta" id="ventas">
                  <NavDropdown.Item>
                    <Link to="/Venta" className="link-unstyled">Nueva Venta</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/ventalist" className="link-unstyled">Gestión de Ventas</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte1" className="link-unstyled">Reporte de Ventas</Link>
                    <Link to="/VentaList" className="link-unstyled">Lista ventas</Link>
                  </NavDropdown.Item>
                  
                </NavDropdown>

                <NavDropdown title="Empleados" id="Empleados">
                  <NavDropdown.Item>
                    <Link to="/empleado" className="link-unstyled">Gestión de Empleados</Link>
                  </NavDropdown.Item>
                  </NavDropdown>
  
              </Nav>
            </Navbar.Collapse>
            <Button
              variant="outline-light"
              onClick={toggleMenu}
              className="d-md-none d-block"
              aria-controls="basic-navbar-nav"
              aria-expanded={showMenu ? 'true' : 'false'}
            >
              Menú
            </Button>
          </Container>
        </Navbar>
  
        {/* Menú lateral (Offcanvas) */}
        <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
  
            <Nav.Link>
                  <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>
  
                <NavDropdown title="Clientes" id="clientes">
                  <NavDropdown.Item>
                    <Link to="/cliente" className="link-unstyled">Nuevo Cliente</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/clientelist" className="link-unstyled">Gestión de Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Categorias" id="categorias">
                  <NavDropdown.Item>
                    <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Gestión de Categorias</Link>
                  </NavDropdown.Item>
                </NavDropdown>
  
                <NavDropdown title="Productos" id="productos">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/productolist" className="link-unstyled">Gestión de Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte" className="link-unstyled">Reporte de Productos</Link>
                  </NavDropdown.Item>w
                </NavDropdown>

                <NavDropdown title="Venta" id="ventas">
                  <NavDropdown.Item>
                    <Link to="/Venta" className="link-unstyled">Nueva Venta</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/ventalist" className="link-unstyled">Gestión de Ventas</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte1" className="link-unstyled">Reporte de Ventas</Link>
                  </NavDropdown.Item>
                  
                </NavDropdown>

                <NavDropdown title="Empleados" id="Empleados">
                  <NavDropdown.Item>
                    <Link to="/empleado" className="link-unstyled">Gestión de Empleados</Link>
                  </NavDropdown.Item>
                  </NavDropdown>
  
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div> )}

      {rol === 'Vendedor' && (
          <div>
        {/* Navbar principal */}
        <Navbar className="navbar-color" variant="dark" expand="md">
          <Container>
            <Navbar.Brand href="#home">Sala de Videojuegos El Toro</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ display: 'none' }}
              className="d-sm-none d-xs-none"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
  
                <Nav.Link>
                  <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>
  
                <NavDropdown title="Clientes" id="clientes">
                  <NavDropdown.Item>
                    <Link to="/cliente" className="link-unstyled">Nuevo Cliente</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/clientelist" className="link-unstyled">Gestión de Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Categorias" id="categorias">
                  <NavDropdown.Item>
                    <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Gestión de Categorias</Link>
                  </NavDropdown.Item>
                </NavDropdown>
  
                <NavDropdown title="Productos" id="productos">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/productolist" className="link-unstyled">Gestión de Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte" className="link-unstyled">Reporte de Productos</Link>
                  </NavDropdown.Item>w
                </NavDropdown>

                <NavDropdown title="Venta" id="ventas">
                  <NavDropdown.Item>
                    <Link to="/Venta" className="link-unstyled">Nueva Venta</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/ventalist" className="link-unstyled">Gestión de Ventas</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte" className="link-unstyled">Reporte de Ventas</Link>
                  </NavDropdown.Item>       
                </NavDropdown>
  
              </Nav>
            </Navbar.Collapse>
            <Button
              variant="outline-light"
              onClick={toggleMenu}
              className="d-md-none d-block"
              aria-controls="basic-navbar-nav"
              aria-expanded={showMenu ? 'true' : 'false'}
            >
              Menú
            </Button>
          </Container>
        </Navbar>
  
        {/* Menú lateral (Offcanvas) */}
        <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menú</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
  
            <Nav.Link>
                  <Link to="/" className="link-unstyled">Inicio</Link>
                </Nav.Link>
  
                <NavDropdown title="Clientes" id="clientes">
                  <NavDropdown.Item>
                    <Link to="/cliente" className="link-unstyled">Nuevo Cliente</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/clientelist" className="link-unstyled">Gestión de Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Categorias" id="categorias">
                  <NavDropdown.Item>
                    <Link to="/categoria" className="link-unstyled">Nueva Categoria</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Gestión de Categorias</Link>
                  </NavDropdown.Item>
                </NavDropdown>
  
                <NavDropdown title="Productos" id="productos">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Nuevo Producto</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/productolist" className="link-unstyled">Gestión de Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Productos</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte" className="link-unstyled">Reporte de Productos</Link>
                  </NavDropdown.Item>w
                </NavDropdown>

                <NavDropdown title="Venta" id="ventas">
                  <NavDropdown.Item>
                    <Link to="/Venta" className="link-unstyled">Nueva Venta</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/ventalist" className="link-unstyled">Gestión de Ventas</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/reporte" className="link-unstyled">Reporte de Ventas</Link>
                  </NavDropdown.Item>
                  
                </NavDropdown>
  
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div> )}
        </div>
      );
  }
  
  export default Header;