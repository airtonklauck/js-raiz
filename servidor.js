import http from 'http'
import fs from 'fs'
import ejs from 'ejs'
import dados from './estaticos/dados.js'

// console.log('dados.menus', dados.menus.values())

const servidor = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.url.match(/\.js$/)) {

        const arquivoStream = fs.createReadStream(`./estaticos${req.url}`)
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
        arquivoStream.pipe(res)

    } else {

        res.writeHead(
            200,
            {
                'Content-Type': 'text/html',
                'X-Meu-Cabecalho-Customizado': 'Os Cabeçalhos daqui mergeiam com os do res.setHeader acima'
            }
        )

        const dadosTemplate = {
            menus: Array.from(dados.menus.values())
                .slice(0, 3)
                .map(menu => ({
                    ...menu,
                    restaurante: {
                        nome: dados.restaurantes.get(menu.restauranteId).name
                    }
                }))
        }

        ejs.renderFile('./templates/index.ejs',
            dadosTemplate,
            (erro, markupHtml) => {

                if (erro)
                    console.error(erro)

                res.write(markupHtml)

                // res.end finaliza a resposta de uma requisição e envia o resultado para o cliente
                // Não pode ser colocado na condidional onde tem o stream 
                // pois quando a stream termina ele já envoca isso automaticamente
                res.end()

            }
        )
    }
})

servidor.listen(9000, erro => {
    if (erro) {
        console.error(erro)
    }
    console.log('Servidor rodando na porta 9000')
})