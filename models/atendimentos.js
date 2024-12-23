const moment = require('moment');

const repositorio = require('../repositories/atendimentos')


class Atendimento {
    constructor() {
        this.dataValida = (dataAtendimento, dataCriacao) => moment(dataAtendimento).isSameOrAfter(dataCriacao)
        this.clienteValido = (tamanho) => tamanho >= 5
        this.validacao = [
            {
                nome: 'Data de Atendimento',
                valido: this.dataValida,
                mensagem: 'Data de Atendimento deve ser maior ou igual a data atual'
            },
            {
                nome: 'Cliente',
                valido: this.clienteValido,
                mensagem: 'O nome do cliente deve conter cinco ou mais caracteres'
            }
            ]
        
        this.valida = parametros => {
            return this.validacao.filter(campo => {
                const {nome} = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })
        }

    
    }
    adicionar(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const parametros = {
            Data: { dataAtendimento, dataCriacao },
            Cliente: atendimento.cliente.length 
        }
        const erros = this.valida(parametros)
        const errosExistem = erros.length

        if(errosExistem){
            return new Promise((resolve, reject) => {
                reject(erros)
            })
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, dataAtendimento}            
            return repositorio.adicionar(atendimentoDatado)
            .then((resultados) => {
                const id = resultados.insertId
                return ({...atendimento, id})
            })
            
        }
    }

    lista() {
        return repositorio.lista()
    }

    buscaPorId(id){
       return repositorio.buscaPorId(id)
    }

    altera(id, valores){
        if(valores.dataAtendimento){
            valores.dataAtendimento = moment(valores.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        return repositorio.altera(id, valores)
    }

    deleta(id){        
        return repositorio.deleta(id)
    }
}

module.exports = new Atendimento