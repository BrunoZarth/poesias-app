const express = require("express");
const router = express.Router();

//Cadastro de produtos 
 router.post("/", (req, res) => {

    console.log(`BODY DATA:`, req.body); // captura o corpo (dados) da requisição enviada
 
  // aqui poderíamos adicionar a lógica
  // que cria um produto no banco de dados
 
  res.end(`RESPONSE POST WITH BODY DATA ${req.body}`);
});

//Listagem de produtos de todos os usuários 
 router.get("/", (req, res) => {
    res.end("RESPONSE GET");
});

//Edição do produto 
 router.put("/", (req, res) => {
    res.end("RESPONSE PUT");
});

//Exclusão do produto 
 router.delete("/", (req, res) => {
    res.end("RESPONSE DELETE");
});

 router.get("/:autor", (req, res) => {
    let autor = req.params;
    res.end("Autor: " + autor)
});




module.exports = router;