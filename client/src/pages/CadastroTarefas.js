import { useState, useEffect } from 'react';
import '../App.css';
import Axios from "axios"
import Card from '../components/Cards/Card';

const CadastroTarefas = () => {
    
    const [tarefas, setTarefas] =useState();
    const [listaTarefas, setListaTarefas] = useState();

    //Lidando com a Adição de Tarefas
    const handleAddTasks = (tarefa) => {
      setTarefas((prevValue) => ({
        ...prevValue,
        [tarefa.target.name]: tarefa.target.value,
      }))
    }

    //INSERINDO UMA NOVA TAREFA
    const handleRegisterTask = () => {
        Axios.post("http://localhost:3001/register",{
            task: tarefas.task,
            status: tarefas.status,
            comments: tarefas.comments,
        }).then(() =>{
        Axios.post("http://localhost:3001/search",{
            task: tarefas.task,
            status: tarefas.status,
            comments: tarefas.comments,
          }).then((response) => {        
              setListaTarefas([
              ...listaTarefas,
                {
                  id: response.data[0].id,
                  task: tarefas.task,
                  status: tarefas.status,
                  comments: tarefas.comments,
                },
            ]);
          });
        });
      };

    //OBTENDO OS RESULTADOS DA TABELA
    useEffect(() => {
        Axios.get("http://localhost:3001/getTasks").then((response) => {
          setListaTarefas(response.data)
        });
       }, []);

  return (
      <div className="app--container">
          <div className='register--container'>
            <h1 className='register--title'>Tarefas</h1>
            <input 
                className='register--input'
                type="text" 
                name='task'
                placeholder='Tarefa'
                onChange={handleAddTasks} 
            />
            <select className='register--select' name='status' defaultValue='' onChange={handleAddTasks}>         
              <option value=""> </option>         
              <option value="Para fazer">Para fazer </option>         
              <option value="Iniciada">Iniciada </option>         
              <option value="Em progresso">Em progresso </option>         
              <option value="Paralisada">Paralisada </option>         
              <option value="Finalizada">Finalizada </option>         
              <option value="Rejeitada">Rejeitada </option>
            </select>
            <input 
                className='register--input'
                type="text" 
                name='comments'
                placeholder='Comentários'          
                onChange={handleAddTasks}  
            />
            <input 
                className='register--button' 
                type="button" 
                value="Cadastrar" 
                onClick={handleRegisterTask} 
              />
          </div>
            { typeof listaTarefas!=="undefined" &&
            listaTarefas.map((tarefa) =>{
              return (
              <Card 
                key={tarefa.id} 
                listCard={listaTarefas}
                setListCard={setListaTarefas}
                id={tarefa.id} 
                task={tarefa.task}
                status={tarefa.status}
                comments={tarefa.comments}
              > 
              </Card>)
            })}
        </div>
    )
}
    
export default CadastroTarefas