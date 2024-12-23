const moment = require('moment');

const axios = require('axios')

const conexao = require("../database/conexao");

const {portaAPIExterna} = require("../config/config")


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
        const erros = validacao.filter(campo => !campo.valido)
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
                    res.status(201).json(atendimento)
                    console.log(`Os dados foram inseridos com sucesso!`, `ID do atendimento:`, resultados.insertId, atendimentoDatado)
                }
            })
        }
    }

    lista(res) {
        const sql = 'select * from atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
                console.log(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = `select * from atendimentos where id = ${id}`

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if(erro){
                res.status(400).json(erro)
            }else{
                const {data} = await axios.get(`http://localhost:${portaAPIExterna}/${cpf}`)
                atendimento.cliente = data
                res.status(200).json(atendimento)
                console.log(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.dataAtendimento){
            valores.dataAtendimento = moment(valores.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = `update atendimentos set ? where id = ?`

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
                console.log(erro)
            }else{
                res.status(200).json({...valores, id})
                console.log('Alteração feita com sucesso')
            }
        })
    }

    deleta(id, res){
        const sql = 'delete from atendimentos where id = ?'
        
        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
                console.log(erro)
            }else{
                res.status(200).json({id})
                console.log('Usuário deletado com sucesso')
            }
        })
    }
}

module.exports = new Atendimento