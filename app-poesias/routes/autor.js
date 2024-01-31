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

client.connect();

//Cadastro de usuário
router.post("/", (req, res) => {

    const autor = req.body;
    console.log("autor = ")
    console.log(autor)
    const nome = String(autor.nome);
    const salt = crypto.randomBytes(16).toString('hex');
    const id = crypto.randomBytes(16).toString('hex');
    const img = String(autor.valorOculto);
    const password = String(autor.senha);
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const query = 'INSERT INTO autores (id, nome, email, img, hash, salt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [id, nome, autor.email, img, hash, salt];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
        } else {
            console.log('Dados inseridos com sucesso:', result.rows[0]);
            res.status(200).json(result.rows[0]);
        }
    });
});

//Login do usuário 
router.post("/login", (req, res) => {
    const query = 'SELECT id, salt, hash FROM autores WHERE email = $1';
    const values = [req.body.email];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao buscar usuário no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao buscar usuário no banco de dados' });
        } else {
            if (result.rows.length === 0) {
                // Usuário não encontrado
                res.status(401).json({ error: 'E-mail ou senha incorretos' });
            } else {
                // Usuário encontrado
                const user = result.rows[0];
                const inputHash = crypto.pbkdf2Sync(req.body.senha, user.salt, 1000, 64, 'sha512').toString('hex');

                if (inputHash === user.hash) {
                    // Senha correta

                    // Aqui, vamos gerar o token
                    const accessToken = jwt.sign({ userId: user.id }, 'qRzU8sXwY5vF3tG7hB1nM', { expiresIn: '1h' });

                    // Enviar o token como resposta
                    res
                        .cookie("access_token", accessToken, { httpOnly: true, secure: false })
                        .cookie("autorLogado", user.email, { httpOnly: true, secure: false })
                        .status(200)
                        .json({ message: "Login bem sucedido!" });
                } else {
                    // Senha incorreta
                    res
                        .clearCookie("access_token")
                        .status(400)
                        .json({ message: "E-mail ou senha incorretos" });
                }
            }
        }
    });
});

router.get("/", authorization, (req, res) => {
    const query = 'SELECT * from autores';
    client.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao buscar dados no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao buscar dados no banco de dados' });
        } else {
            console.log('Autores:', result.rows);
            res.status(200).json(result.rows);
        }
    })
});


module.exports = router;