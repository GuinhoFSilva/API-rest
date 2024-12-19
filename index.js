const customExpress = require('./config/customExpress')

const conexao = require('./database/conexao')

const Tabelas = require('./database/tabelas')

conexao.connect(erro => {
    if(erro){
        console.log(erro)
    } else{
        console.log('Banco conectado com sucesso')
         
        Tabelas.init(conexao)

        const app = customExpress()

        const porta = 3000;

        app.listen(porta, () => console.log(`Servidor rodando na porta ${porta} `));
    }
})


 
