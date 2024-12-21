const fs = require('fs');

fs.createReadStream('./assets/salsicha.avif')
    .pipe(fs.createWriteStream('./assets/salsichastream.avif'))
    .on('finish', () => console.log('A imagem foi escrita com sucesso!'))

