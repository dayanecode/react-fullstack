import { useState, useEffect } from 'react';
import '../App.css';
import Axios from "axios"

const CadastroCaixas = () => {

  return (
    
    <div>
      <h1>Testando</h1>
      <input 
        type="text" 
        name="empresa" 
        placeholder='Empresa'
      />
      <input 
        type="button" 
        value="Pesquisar"
      />
    </div>
  )
}

export default CadastroCaixas