const express = require("express");
const router = express.Router();
const { Client } = require('pg');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authorization = require("../src/middleware/authorization");
const client = new Client({
   user: 'postgres',
   host: 'localhost',
   database: 'poesias',
   password: '1234',
   port: 5432,
});
const cookieParser = require('cookie-parser');
client.connect();

//Cadastro de produtos 
router.post("/", authorization ,(req, res) => {

   const autorQuery = `SELECT * from public.autores WHERE email = '${req.body.autor}'`;
   console.log("autor: " + req.body.autor)
   var autor = "";
   client.query(autorQuery, (err, result) => {
      if (err) {
         console.error(`Erro ao buscar autor ${req.body.autor} no banco de dados:`, err);
         res.status(500).json({ error: `Erro ao buscar autor ${req.body.autor} no banco de dados:` });
      } else {

         autor = result.rows[0];
         autor = autor instanceof Object ? autor : Object(autor);
         console.log('Autor:', autor);
      }
   })

   const id = crypto.randomBytes(16).toString('hex');
   const poesia = req.body.poesia;

   const query = `INSERT INTO poesias (id, poesia, autor) VALUES ('${id}', '${poesia}', '${req.body.autor}')`;


   client.query(query, (err, result) => {
      if (err) {
         console.error('Erro ao inserir dados no banco de dados:', err);
         res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
      } else {
         console.log('Dados inseridos com sucesso:', result.rows[0]);
         res.status(200).json(result.rows[0]);
      }
   });

});

//Listagem de produtos de todos os usuários 
router.get("/", (req, res) => {
   const query = 'SELECT * from poesias';
   client.query(query, (err, result) => {
      if (err) {
         console.error('Erro ao buscar dados no banco de dados:', err);
         res.status(500).json({ error: 'Erro ao buscar dados no banco de dados' });
      } else {
         console.log('Poesias:', result.rows);
         res.status(200).json(result.rows);
      }
   })
});

// Edição do produto 
router.put("/:id", authorization,(req, res) => {
   const id = req.params.id;

   const cookieAutorLogado = req.cookies.autorLogado;
   const querySelectPoesia = `SELECT * FROM poesias WHERE id = '${id}'`;
var poesiaResult = ""
client.query(querySelectPoesia, (err, result) => {
   if (err) {
      console.error(`Erro ao buscar poesia de id ${id} no banco de dados:`, err);
      res.status(500).json({ error: `Erro ao buscar poesia de id ${id} no banco de dados:` });
   } else {

      poesiaResult = result.rows[0];
      poesiaResult = Object(poesiaResult);
      console.log('Poesia:', poesiaResult.autor);
   }
})

   
   console.log("cookie autor logado: " + cookieAutorLogado)
    
   if (poesiaResult !== cookieAutorLogado) {
   res.status(500).json({ error: `Acesso negado: Somente o autor da poesia pode edita-la.` });
   }


   const poesia = req.body.poesia;
   const autor = req.body.autor;

   const query = `UPDATE poesias SET poesia = '${poesia}', autor = '${autor}' WHERE id = '${id}' RETURNING *`;

   client.query(query, (err, result) => {
      if (err) {
         console.error(`Erro ao editar poesia com ID ${id}:`, err);
         res.status(500).json({ error: `Erro ao editar poesia com ID ${id}` });
      } else {
         if (result.rows.length === 0) {
            res.status(404).json({ error: `Poesia com ID ${id} não encontrada` });
         } else {
            console.log(`Poesia com ID ${id} editada com sucesso:`, result.rows[0]);
            res.status(200).json(result.rows[0]);
         }
      }
   });
});

// Exclusão do produto
router.delete("/:id", authorization, (req, res) => {
   const id = req.params.id;
   const cookieAutorLogado = req.cookies.autorLogado;
   const querySelectPoesia = `SELECT * FROM poesias WHERE id = '${id}'`;
var poesia = ""
client.query(querySelectPoesia, (err, result) => {
   if (err) {
      console.error(`Erro ao buscar poesia de id ${id} no banco de dados:`, err);
      res.status(500).json({ error: `Erro ao buscar poesia de id ${id} no banco de dados:` });
   } else {

      poesia = result.rows[0];
      poesia = Object(poesia);
      console.log('Poesia:', poesia.autor);
   }
})

   
   console.log("cookie autor logado: " + cookieAutorLogado)
    
   if (poesia.autor !== cookieAutorLogado) {
   res.status(500).json({ error: `Acesso negado: Somente o autor da poesia pode apaga-la.` });
   }

   const query = `DELETE FROM poesias WHERE id = '${id}' RETURNING *`;

   client.query(query, (err, result) => {
      if (err) {
         console.error(`Erro ao excluir poesia com ID ${id}:`, err);
         res.status(500).json({ error: `Erro ao excluir poesia com ID ${id}` });
      } else {
         if (result.rows.length === 0) {
            res.status(404).json({ error: `Poesia com ID ${id} não encontrada` });
         } else {
            console.log(`Poesia com ID ${id} excluída com sucesso:`, result.rows[0]);
            res.status(200).json(result.rows[0]);
         }
      }
   });
});

// Busca por autor
router.get("/autor/:autor", authorization, (req, res) => {
   const autor = req.params.autor;

   const query = `SELECT * FROM poesias WHERE autor = '${autor}'`;

   client.query(query, (err, result) => {
      if (err) {
         console.error(`Erro ao buscar poesias do autor ${autor}:`, err);
         res.status(500).json({ error: `Erro ao buscar poesias do autor ${autor}` });
      } else {
         console.log(`Poesias do autor ${autor}:`, result.rows);
         res.status(200).json(result.rows);
      }
   });
});





module.exports = router;