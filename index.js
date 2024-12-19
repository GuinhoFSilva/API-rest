const express = require('express')

const app = express()

const porta = 3000;

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta} `));

app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos'))
// app.get('/sobre', (req, res) => res.send('Você está na rota sobre'))
 
