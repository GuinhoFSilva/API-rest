const Atendimento = require('../models/atendimentos')
const axios = require('axios');
const {portaAPIExterna} = require('../config/config');


module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
        .then(async (resultados) => {
            if (resultados.length === 0) {
                return res.status(404).json({ mensagem: 'Atendimento não encontrado' });
            }

            const atendimento = resultados;
            const cpf = atendimento.cliente;

            try {
                const { data } = await axios.get(`http://localhost:${portaAPIExterna}/${cpf}`);
                atendimento.cliente = data;

                res.status(200).json(atendimento);
            } catch (erro) {
                res.status(400).json({ mensagem: 'Erro ao buscar dados externos', erro });
            }
        })
        .catch((erro) => {
            res.status(400).json({ mensagem: 'Erro ao buscar atendimento', erro });
        });
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        Atendimento.buscaPorId(id)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(400))
    });
    
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adicionar(atendimento)
        .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
        .catch(erro => res.status(400).json(erro))
    });

    app.patch('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(400).json(erro))
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)


        Atendimento.deleta(id, res)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(400).json(erro))
    })


}