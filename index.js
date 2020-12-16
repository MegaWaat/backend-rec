  
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "u1n9e1",
  database: "rec",
});


app.post("/create", (req, res) => {
  const nome = req.body.nome;
  const observacao = req.body.observacao;
  const responsavel = req.body.responsavel;
  const nascimento = req.body.nascimento;
  const grau = req.body.grau;

  db.query(
    "INSERT INTO rec.crianca (nomecri, observacaocri, responsavelcri,graucri, nascimentocri) VALUES (?,?,?,?,?)",
    [nomecri, observacaocri, responsavelcri, nascimentocri, graucri],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Valores inseridos");
      }
    }
  );
});

 app.get("/crianca", (req, res) => {
  db.query("SELECT * FROM rec.crianca", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
 
app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.age;
  db.query(
    "UPDATE rec.crianca WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM rec.crianca WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
    
  });
});

app.listen(3001, () => {console.log("servidor rodando");});

//TESTE DE INSERT
/*  app.get('/', (req, res) => {const slqInsert = "INSERT INTO rec.crianca (nomecri,observacaocri) VALUES ('matheus','vermelho');";
db.query(slqInsert,(err,result)=>{
  res.send('enviado')
  });
});  */
