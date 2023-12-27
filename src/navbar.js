import React from 'react';
import logo from './logo.png'; // Substitua pelo caminho do seu logotipo

function Navbar() {
    return (
      <nav>
        <img src={logo} alt="Logo da empresa" />
        <a href="https://www.site1.com" target="_blank" rel="noopener noreferrer">Site 1</a>
        <a href="https://www.site2.com" target="_blank" rel="noopener noreferrer">Site 2</a>
        {/* Adicione mais botões conforme necessário */}
      </nav>
    );
  }
  
  export default Navbar;