class Tabelas{
    init(conexao){
        console.log('Tabelas foram chamadas')
        this.conexao = conexao

        this.criarAtendimentos()
        this.salvarPets()
    }

    criarAtendimentos(){
        const sql = 'create table if not exists atendimentos (id int not null auto_increment, cliente varchar(50) not null, pet varchar(20), servico varchar(20) not null, dataAtendimento datetime not null, dataCriacao datetime not null, status varchar(20) not null, observacoes text, primary key(id));'
        
        this.conexao.query(sql, (erro) =>  {
            if(erro){
                console.log(erro)
            } else {
                console.log("Tabela atendimentos criada com sucesso!")
            }
        })
    }

    salvarPets(){
        const sql = 'create table if not exists pets (id int not null auto_increment, nome varchar(50), imagem varchar(200), primary key(id));'

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro)
            }else{
                console.log("Tabela pets criada com sucesso!")
            }
        })
    }
}

module.exports = new Tabelas