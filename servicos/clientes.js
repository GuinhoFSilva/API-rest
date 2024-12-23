const express = require('express')

const {portaAPIExterna} = require('../config/config')

const app = new express()
const faker = require('faker')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:cpf', (req, res) => {
    const { cpf } = req.params

    res.status(200).json({
        cpf,
        nome: faker.name.findName(),
        dataDeNascimento: faker.date.past()
    })
})


app.listen(portaAPIExterna, () => console.log('Api rodando na porta', portaAPIExterna))


