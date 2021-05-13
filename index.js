const bodyParser = require('body-parser')  
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "JJmilo12",
  database: "rec",
});


app.post("/create", (req, res) => {
  const {criNome, criObservacao, criResponsavel, criNascimento, criGrau} = req.body;
  console.log(req.body)
  db.query(
    "INSERT INTO rec.crianca (nomecri, observacaocri, responsavelcri,graucri, nascimentocri) VALUES (?,?,?,?,?)",
    [criNome, criObservacao, criResponsavel,criGrau, criNascimento],
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
  const criId = req.body.id;
  
  db.query(
    "UPDATE rec.crianca WHERE idcri = ?",
    [criId],
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
  const criId = req.body.criId;
  console.log(req.body)
  db.query("DELETE FROM rec.crianca WHERE idcri = ?", criId, (err, result) => {
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
