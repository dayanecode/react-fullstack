import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Estilos
import './App.css';

//Componentes
import Navbar from './components/Navbar/Navbar';

//Páginas
import Home from './pages/Home'
import CadastroTarefas from './pages/CadastroTarefas';
import CadastroCaixas from './pages/CadastroCaixas';

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
