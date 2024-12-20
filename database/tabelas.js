class Tabelas{
    init(conexao){
        console.log('Tabelas foram chamadas')
        this.conexao = conexao

        this.criarAtendimentos()
    }

    criarAtendimentos(){
        const sql = 'create table if not exists atendimentos (id int not null auto_increment, cliente varchar(50) not null, pet varchar(20), servico varchar(20) not null, dataAtendimento datetime not null, dataCriacao datetime not null, status varchar(20) not null, observacoes text, primary key(id));'
        
        this.conexao.query(sql, (erro) =>  {
            if(erro){
                console.log(erro)
            } else {
                console.log("Tabela atendimentos criada com sucesso", sql)
            }
        })
    }
}

module.exports = new Tabelas