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
         {rol === 'admin' && (<div>
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
  
                <Nav.Link>
                  <Link to="/about" className="link-unstyled">Informacion</Link>
                </Nav.Link>
  
                <NavDropdown title="Clientes" id="clientes">
                  <NavDropdown.Item>
                    <Link to="/cliente" className="link-unstyled">Registrar Cliente</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/clientelist" className="link-unstyled">Listar Clientes</Link>
                  </NavDropdown.Item>
                </NavDropdown>
  
                <NavDropdown title="Productos" id="docentes">
                  <NavDropdown.Item>
                    <Link to="/producto" className="link-unstyled">Registrar Producto</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/productolist" className="link-unstyled">Lista Productos</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/categorialist" className="link-unstyled">Galeria de Productos</Link>
                  </NavDropdown.Item>

                </NavDropdown>

                <NavDropdown title="Venta" id="ventas">
                  <NavDropdown.Item>
                    <Link to="/Venta" className="link-unstyled">Registrar venta</Link>
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />

                  <NavDropdown.Item>
                    <Link to="/VentaList" className="link-unstyled">Lista ventas</Link>
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
  
              <Nav.Link>
                <Link to="/about" className="link-unstyled">About</Link>
              </Nav.Link>
  
              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/customer" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/actualizar-cliente" className="link-unstyled">Compra en Línea</Link>
                </NavDropdown.Item>
              </NavDropdown>
  
              <NavDropdown title="Compra en Línea" id="compra">
                <NavDropdown.Item>
                  <Link to="/teacher" className="link-unstyled">Realizar Compra en Línea</Link>
                </NavDropdown.Item>
  
                <NavDropdown.Item>
                  <Link to="/teacherList" className="link-unstyled">Listar Docentes</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>
                <Link to="/Gestión alquiler" className="link-unstyled">Alquiler</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Informacion" className="link-unstyled">Información sobre servicios de mantenimiento</Link>
              </Nav.Link>
  
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div> )}
  
         {rol === 'vendedor' && (<div>
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
                    <Link to="/customer" className="link-unstyled">Compra en Línea</Link>
                  </NavDropdown.Item>
  
                  <NavDropdown.Item>
                    <Link to="/clientelist" className="link-unstyled">Listar Clientes</Link>
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
  
              <Nav.Link>
                <Link to="/about" className="link-unstyled">About</Link>
              </Nav.Link>
  
              <NavDropdown title="Clientes" id="clientes">
                <NavDropdown.Item>
                  <Link to="/customer" className="link-unstyled">Registrar Cliente</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/actualizar-cliente" className="link-unstyled">Compra en Línea</Link>
                </NavDropdown.Item>
              </NavDropdown>
  
              <NavDropdown title="Compra en Línea" id="compra">
                <NavDropdown.Item>
                  <Link to="/teacher" className="link-unstyled">Realizar Compra en Línea</Link>
                </NavDropdown.Item>
  
                <NavDropdown.Item>
                  <Link to="/teacherList" className="link-unstyled">Listar Docentes</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>
                <Link to="/Gestión alquiler" className="link-unstyled">Alquiler</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/Informacion" className="link-unstyled">Información sobre servicios de mantenimiento</Link>
              </Nav.Link>
  
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div> )}
       </div>
     );
  }
  
  export default Header;