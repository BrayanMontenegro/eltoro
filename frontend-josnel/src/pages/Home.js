import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/App.css';
import Footer from '../components/Footer';

function Home({ rol }) {
    return(
        <div>
        <Header rol={ rol } />
        <Footer/>
        </div>
    );
}

export default Home;