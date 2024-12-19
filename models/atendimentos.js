const conexao = require("../database/conexao")

class Atendimento {
    adicionar(atendimento){
        const sql = 'insert into atendimentos set ?'

        conexao.query(sql, atendimento, (erro) => {
            if(erro){
                console.log(erro)
            } else {
                console.log(sql)
            }
        })
    }
}

module.exports = new Atendimento