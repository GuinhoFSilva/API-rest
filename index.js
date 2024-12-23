const customExpress = require('./config/customExpress')

const conexao = require('./database/conexao')

const Tabelas = require('./database/tabelas')

const {portaAPI} = require('./config/config')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else{
        console.log('Banco conectado com sucesso')
         
        Tabelas.init(conexao)

        const app = customExpress()

        app.listen(portaAPI, () => console.log(`Servidor rodando na porta ${portaAPI} `));
    }
})


 
