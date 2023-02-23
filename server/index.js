const express = require("express");
const app = express();
//dotenv - para carregar as variáveis de ambiente
require('dotenv').config();
const mysql = require("mysql2");
//cors - para não dar problema quando estiver fazendo a conexão do front-end com o back-end
const cors = require("cors")

const db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE 
})

app.use(cors());
//para lermos os dados do Front precisamos transformá-los em json
app.use(express.json());


//INSERINDO UM REGISTRO NA TABELA
app.post("/register", (req, res) => {
    // const id = 51 // ID É AUTO INCREMENT, não precisa ser passado como parâmetro
    const task = req.body.task;
    const status = req.body.status;
    const created_at = "2023-02-21";
    const created_by = 'Daya Ramos';
    const finished_in = "2023-02-21";
    const comments = req.body.comments;

    let SQL = "INSERT INTO todo.tasks (task, status, created_at, created_by, finished_in, comments ) VALUES (?,?,?,?,?,?)"

    db.query(SQL, [task,status,created_at,created_by,finished_in,comments], (error, result) =>{
        if(error) console.log(error)
        else res.send(result)
    })
})

//RETORNANDO O REGISTRO NA PAGE, APÓS A INSERÇÃO.
app.post("/search", (req, res) => {
    const {task} = req.body;
    const {status} = req.body;
    const {comments} = req.body;

  let mysql =
    "SELECT * from todo.tasks WHERE task = ? AND status = ? AND comments = ?";
  db.query(mysql, [task, status, comments], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

//CONSULTANDO TODOS OS REGISTROS
app.get("/getTasks", (req, res) => {

    let SQL = 'SELECT * FROM todo.tasks'

    db.query(SQL, (error, result) => {
        if(error) console.log(error);
        else res.send(result);
    });
});

//EDITANDO UM REGISTRO DA TABELA
app.put("/edit", (req, res) => {
    const {id} = req.body;
    const {task} = req.body;
    const {status} = req.body;
    const {comments} = req.body;

    let SQL = "UPDATE todo.tasks SET id = ?, task = ?, status = ?, comments = ? WHERE id = ?";

    db.query(SQL, [id, task, status, comments,id], (error, result) => {
        if (error) console.log(error)
        else res.send(result);
    });

});

//DELETANDO UM REGISTRO DA TABELA
app.delete("/delete/:id", (req, res) => {
    const {id} = req.params

    let SQL = 'DELETE FROM todo.tasks WHERE id = ?';

    db.query(SQL,[id],(error, result) => {
        if (error) console.log(error);
        else res.send(result)
    });
});

app.listen(process.env.PORT,() => {
    console.log("rodando sevidor...")
})