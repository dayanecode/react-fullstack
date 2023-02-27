const express = require("express");
const app = express();

//dotenv: para carregar as variáveis de ambiente
require('dotenv').config();

//databases
const mysql = require("mysql2");
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

//cors: para não dar problema quando estiver fazendo a conexão do front-end com o back-end
const cors = require("cors")

app.use(cors());

//transformando os dados do front-end em json
app.use(express.json());

//ORACLE
//Pesquisando as caixas da diretoria pelo nome de EMPRESA
app.get("/searchCaixaDir", (req, res) => {

    const empresa = 'PRODESP';

    async function runOracle() {

      let connection;

        try {
          connection = await oracledb.getConnection( {
            user: process.env.ORADB_USER,
            password: process.env.ORADB_PASS,
            connectString: process.env.ORADB_CONNSTRING
          });

          const result = await connection.execute(
            `SELECT *
            FROM DIRETORIA
            WHERE EMPRESA = :empresa`,
            [empresa],  
          );
          // Se der certo vai retornar os resultados
           res.send(result.rows)
          } catch (err) {
            console.error(err);
          } finally {
              if (connection) {
                try {
                await connection.close();
              } catch (err) {
                console.error(err);
              }
            }
        }
      }
      runOracle();

});

//MYSQL
//estabelecendo conexão com o MYSQL
const db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE 
})

//INSERINDO UM REGISTRO NA TABELA
app.post("/register", (req, res) => {

    const dataCriacao = new Date()
  
    // const id = 51 // ID É AUTO INCREMENT, não precisa ser passado como parâmetro
    const task = req.body.task;
    const status = req.body.status;
    const created_at = dataCriacao;
    const created_by = 'Daya Ramos';
    const finished_in = null;
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