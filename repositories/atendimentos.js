const query = require('../database/queries');

class atendimento {
    adicionar(atendimento){
        const sql = 'insert into atendimentos set ?'
        return query(sql, atendimento)
    }

    lista(){
        const sql = 'select * from atendimentos'
        return query(sql)
    }

    buscaPorId(id){
        const sql = `select * from atendimentos where id = ${id}`
        return query(sql, id)

    }

    altera(id, valores){
        const sql = `update atendimentos set ? where id = ?`
        return query(sql, [valores, id])
    }

    deleta(id){
        const sql = 'delete from atendimentos where id = ?'
        return query(sql, id)
    }
}

module.exports = new atendimento() 