import React,{ useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cliente from './pages/NuevoCliente';
import ListCliente from './pages/ListadoCliente';
import Empleado from './pages/NuevoEmpleado';
import ListEmpleado from './pages/ListadoEmpleado';
import Home from './pages/Home';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Categoria from './pages/NuevaCategoria';
import ListCategoria from './pages/ListadoCategoria';
import Producto from './pages/NuevoProducto';
import ListProducto from './pages/ListadoProducto';
import Venta from './pages/NuevaVenta';
import ListVenta from './pages/ListadoVenta';
import ReporteP from './pages/ReporteProducto';
import ReporteV from './pages/ReporteVenta';
import SinAcceso from './pages/SinAcceso';

function App() {

  const storedrol = localStorage.getItem('userRol');

  //const [userRol, setUserRol] = useState('');
  const [userRol, setUserRol] = useState(storedrol || '');

  // Guardar el rol del usuario en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('userRol', userRol);
  }, [userRol]);
  
  return (
    <Router>
      <Routes>  
      <Route path="/" element={<Inicio rol={userRol}/>} />
      <Route path="/registrarse" element={<Empleado rol={userRol} />} />
      <Route path="/inicio" element={<Login rol={userRol} setRol={setUserRol} />} />
      <Route path="/home" element={userRol ? <Home rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/cliente" element={userRol ? <Cliente rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/clientelist" element={userRol ? <ListCliente rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/categoria" element={userRol ? <Categoria rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/categorialist" element={userRol ? <ListCategoria rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/producto" element={userRol ? <Producto rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/productolist" element={userRol ? <ListProducto rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/reporte" element={userRol ? <ReporteP rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/Venta" element={userRol ? <Venta rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/ventalist" element={userRol ? <ListVenta rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/reporte1" element={userRol ? <ReporteV rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/empleado" element={userRol ? <ListEmpleado rol={userRol} /> : <Navigate to="/sinacceso" />} />
      <Route path="/sinacceso" element={<SinAcceso />} />
      </Routes>
    </Router>
  );
}

export default App;