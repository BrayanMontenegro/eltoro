import React, { useEffect, useState } from 'react';  // Importación de React, useEffect y useState desde 'react'
import Header from '../components/Header';  // Importación del componente Header desde la ruta '../components/Header'
import { Button, Row, Col, Card, Container } from 'react-bootstrap';  // Importación de componentes específicos desde 'react-bootstrap'
import jsPDF from 'jspdf';  // Importación de jsPDF para la generación de documentos PDF
import Chart from 'chart.js/auto';  // Importación de Chart.js para gráficos
import '../styles/App.css';  // Importación de estilos CSS desde '../styles/App.css'

// Importa la biblioteca html2canvas, que proporciona funciones para capturar y convertir el contenido HTML, incluidos elementos del DOM, en imágenes de lienzo (canvas).
import html2canvas from 'html2canvas';


function Estadisticas({ rol }) {  // Declaración del componente Estadisticas con el argumento 'rol'

    const [ventas, setVentas] = useState([]);  // Declaración del estado 'productos' y su función 'setProductos' a través de useState, con un valor inicial de un array vacío
    const [myChart, setMyChart] = useState(null);  // Declaración del estado 'myChart' y su función 'setMyChart' a través de useState, con un valor inicial de 'null'

    useEffect(() => {
        fetch('http://localhost:5000/crud/readventa')  // Realiza una solicitud GET al servidor para obtener productos
        .then((response) => response.json())  // Convierte la respuesta a formato JSON
        .then((data) => setVentas(data))  // Almacena los productos en el estado 'productos'
        .catch((error) => console.error('Error al obtener las ventas:', error));  // Manejo de errores en caso de fallar la solicitud
    }, []);  // Se ejecuta esta función solo una vez al cargar el componente

    useEffect(() => {
        if (ventas.length > 0) {  // 
        const ctx = document.getElementById('myChart');  // Obtiene el elemento canvas con el ID 'myChart'

        if (myChart !== null) {
            myChart.destroy(); // Destruye el gráfico existente antes de crear uno nuevo para evitar conflictos
        }

        const productos = ventas.map((venta) => venta.nombre);  // Extrae los nombres de los productos
        const cant = ventas.map((venta) => venta.Cantidad);  // Extrae las cantidades de los productos

        const venta = new Chart(ctx, {  // Crea un nuevo gráfico de tipo 'bar' con Chart.js y lo asigna al elemento canvas
            type: 'bar',
            data: {
            labels: productos,  // Asigna los nombres de productos como etiquetas para el eje X
            datasets: [{
                label: 'Cantidad vendida',  // Etiqueta para la leyenda del gráfico
                data: cant,  // Asigna las cantidades de productos para la visualización
                backgroundColor: 'rgba(0, 128, 0, 0.5)',  // Define el color de fondo de las barras
                borderColor: 'rgba(54, 162, 235, 1)',  // Define el color del borde de las barras
                borderWidth: 1  // Define el ancho del borde de las barras
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true  // Comienza el eje Y desde cero
                }
            }
            }
        });
        setMyChart(venta); // Guarda la referencia al nuevo gráfico en el estado 'myChart'
        }
    }, [ventas]);  // Se ejecuta cada vez que hay cambios en 'productos'

    const generarReporteVenta = () => {
        fetch('http://localhost:5000/crud/readventa')  // Realiza una solicitud GET al servidor para obtener productos
        .then((response) => response.json())  // Convierte la respuesta a formato JSON
        .then((ventas) => {
            const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
            let y = 15; // Posición inicial en el eje Y dentro del documento PDF

            doc.text("Reporte de ventas", 20, 10);  // Agrega un título al documento PDF

            ventas.forEach((venta) => {  // Itera sobre los productos para generar el reporte
            doc.text(`Nombre del producto: ${venta.nombre}`, 20, y);  // Agrega el nombre del producto al documento PDF
            doc.text(`Cantidad vendida: ${venta.Cantidad}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

            y += 30; // Incrementa la posición Y para el siguiente producto
            if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
                doc.addPage();
                y = 15; // Reinicia la posición Y en la nueva página
            }
            });

            doc.save("Reporte de ventas.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
        })
        .catch((error) => console.error('Error al obtener las ventas:', error));  // Manejo de errores en caso de fallar la solicitud
    };

    // Definición de la función generarReporteAlmacenImg como una función asíncrona
    const generarReporteVentasImg = async () => {
    try {
        // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas
        const canvas = await html2canvas(document.getElementById('myChart'));
        // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
        const pdf = new jsPDF();
        // Convierte el objeto canvas a una URL de datos en formato PNG
        const imgData = canvas.toDataURL('image/png');
        // Añade un texto al documento PDF
        pdf.text("Reporte de ventas", 20, 10);
        // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
        pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
        // Guarda el documento PDF con un nombre específico
        pdf.save("Reporte gráfico de ventas.pdf");
    } catch (error) {
        // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
        console.error('Error al generar el reporte con imagen:', error);
    }
    };


    return(
        <div>
        <Header rol={ rol } />  

        <Container className="margen-contenedor">

            <Row className="g-3">

            <Col sm="6" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title>Ventas</Card.Title>
                    <canvas id="myChart"  height="100"></canvas>
                </Card.Body>

                <Card.Body>
                    <Button onClick={generarReporteVenta}>
                    Generar PDF
                    </Button>
                </Card.Body>

                </Card>
            </Col>

            <Col sm="6" md="6" lg="12">
                <Card>
                <Card.Body>
                    <Card.Title>Estado de las ventas</Card.Title>
                </Card.Body>

                <Card.Body>
                    <Button onClick={generarReporteVentasImg}>
                    Generar gráfico PDF
                    </Button>
                </Card.Body>

                </Card>
            </Col>

            </Row>
        </Container>


    </div>
  );
}

export default Estadisticas;  // Exporta el componente Estadisticas para su uso en otras partes de la aplicación