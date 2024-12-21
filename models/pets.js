const conexao = require('../database/conexao')

const uploadArquivo = require('../arquivos/uploadDeArquivos')

class Pet {
    adicionar(pet, res){
        const sql = 'insert into pets set ?'

        uploadArquivo(pet.imagem, pet.nome, (novoCaminho, ) => {
            const novoPet = {nome: pet.nome, imagem: novoCaminho}

            conexao.query(sql, novoPet, (erro, resultados) => {
                if(erro){
                    console.log(erro)
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(novoPet)
                    console.log('Pet inserido com sucesso!', novoPet)
                }
            })
        }) 
    }
}

module.exports = new Pet()