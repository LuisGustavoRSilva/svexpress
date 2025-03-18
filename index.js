// importar o servidor express
const express = require("express");
// importar o modulo do cors
const cors = require("cors");
// importar o modo 
const mysql = require("mysql2");
// importar o modulo helmet
const helmet = require("helmet");
// importar o modulo morgan
const morgan = require("morgan");
// importar o modulo de criptografia de senhas bcrypt
const bcrypt = require("bcrypt")

// Carregando os modulos para a execução no backend
const app = express();
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));


// Configurações de conexão com o banco de dados mysql
const con = mysql.createConnection({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"dbexpress"
});



// endpoint para acesso
app.get("/", (req, res) =>{
    // Obter os clientes que estão cadastrados no banco de dados
    con.query("Select * from clientes", (error, result) =>{
        if(error){
            return res.status(500).send({msg:`Erro ao tentar selecionar os clientes ${error}`})
        }
        res.status(200).send({payload:result})
    })
});
app.post("/cadastrar", (req, res) => {
    con.query("INSERT INTO clientes Set ?", req.body,(error, result) =>{
        if(error){
            return res.status(400).send({msg: `Erro ao tentar cadastrar ${error}`})
        }
        res.status(201).send({msg: `Cliente cadastrato`,payload:result})
    })
});
app.put("/atualizar/:id", (req, res) =>{
    res.send("PUT");
});
app.delete("/apagar/:id", (req, res) =>{
    res.send("DELETE");
});
app.listen(8000,()=>console.log("Servidor Online"))