import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Estilos
import './App.css';

//Páginas
import CadastroTarefas from './pages/CadastroTarefas';
import Home from './pages/Home'
import CadastroCaixas from './pages/CadastroCaixas';

//Componentes
import Navbar from './components/Navbar/Navbar';

function App() {
 
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Tarefas' element={<CadastroTarefas/>}/>
            <Route path='/CadCaixas' element={<CadastroCaixas/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
