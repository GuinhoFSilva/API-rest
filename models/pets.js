const conexao = require('../database/conexao')

const uploadArquivo = require('../database/archives/uploadDeArquivos')

class Pet {
    adicionar(pet, res){
        const sql = 'insert into pets set ?'

        uploadArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            
            if(erro){
                res.status(400).json({erro})
                console.error(erro)
            }else{

                const novoPet = {nome: pet.nome, imagem: novoCaminho}
                
            conexao.query(sql, novoPet, (erro, resultados) => {
                if(erro){
                    console.error(erro)
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(novoPet)
                    console.log('Pet inserido com sucesso!', novoPet)
                }
            })
        }
        }) 
    }
}

module.exports = new Pet()