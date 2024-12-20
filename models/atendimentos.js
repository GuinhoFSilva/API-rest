const moment = require('moment');

const conexao = require("../database/conexao");

class Atendimento {
    adicionar(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const dataValida = moment(dataAtendimento).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.cliente.length >= 5

        const validacao = [
        {
            nome: 'Data de Atendimento',
            valido: dataValida,
            mensagem: 'Data de Atendimento deve ser maior ou igual a data atual'
        },
        {
            nome: 'Cliente',
            valido: clienteValido,
            mensagem: 'O nome do cliente deve conter cinco ou mais caracteres'
        }
        ]
        
         const errosExistem = erros.length

        if(errosExistem){
            res.status(400).json(erros)
            console.log(erros)
        }else{

            
            const atendimentoDatado = {...atendimento, dataCriacao, dataAtendimento}
            const sql = 'insert into atendimentos set ?'
            
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                    console.log(`Os dados foram inseridos com sucesso!`, `ID do atendimento:`, resultados.insertId, atendimentoDatado)
                }
            })
        }
    }
}

module.exports = new Atendimento