const fs = require('fs');
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {

    const tiposValidos = ['jpg', 'png', 'jpeg', 'avif']
    const tipo = path.extname(caminho)
    const validarTipo = tiposValidos.indexOf(tipo.substring(1)) != -1
    const novoCaminho = `./assets/${nomeArquivo}${tipo}`

    if(validarTipo){
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(false, novoCaminho))
    }else{
        const erro = "Tipo é inválido!"
        callbackImagemCriada(erro)
    }

}

