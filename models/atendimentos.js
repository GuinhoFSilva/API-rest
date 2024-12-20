const moment = require('moment');

const conexao = require("../database/conexao");

class Atendimento {
    adicionar(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const atendimentoDatado = {...atendimento, dataCriacao, dataAtendimento}
        const sql = 'insert into atendimentos set ?'

        conexao.query(sql, atendimentoDatado, (erro) => {
            if(erro){
                console.log(erro)
            } else {
                console.log('O insert deu certo:', atendimentoDatado)
            }
        })
    }
}

module.exports = new Atendimento