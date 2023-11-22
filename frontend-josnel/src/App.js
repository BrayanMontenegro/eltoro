import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Productos from './pages/Productos';
import Producto from './pages/ProductoList';
import Cliente from './pages/Cliente';
import ClienteList from './pages/ClienteList';
import Login from './pages/Login';
import Categoria from './pages/Categoria';
import CategoriaList from './pages/CategoriaList';
import Ventas from './pages/Venta';

function App() {

  const [userRol, setUserRol] = useState('');
  
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Login setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path="/about" element={<About rol={userRol} />} />
        <Route path="/producto" element={<Productos rol={userRol} />} />
        <Route path="/productolist" element={<Producto rol={userRol} />} />
        <Route path="/cliente" element={<Cliente rol={userRol} />} />
        <Route path="/clientelist" element={<ClienteList rol={userRol} />} />
        <Route path="/categoria" element={<Categoria rol={userRol} />} />
        <Route path="/categorialist" element={<CategoriaList rol={userRol} />} />
        <Route path="/Venta" element={<Ventas rol={userRol} />} />
      </Routes>
    </Router>
  );
}

export default App;