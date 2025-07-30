import dados from './dados.js'

function elemento(tagNome, atributos, filhos) {

    /**
     * Se o segundo argumento (atributos) for um array ou string, significa que não
     * temos atributos
     * Os filhos podem ser array ou string
     * Se o segundo argumento for objeto, temos atributos
     */

    const $elemento = document.createElement(tagNome)
    const _filhos = (Array.isArray(atributos) || typeof atributos === 'string')
        ? atributos : filhos

    if (typeof _filhos === 'string') {
        $elemento.appendChild(
            document.createTextNode(_filhos)
        )
    } else {
        for (let $filho of _filhos) {
            $elemento.appendChild($filho)
        }
    }

    return $elemento

}

function templateCardapio(menu) {
    return elemento('div', [
        elemento('header', [
            elemento('h3',
                { style: 'color: red' },
                `${menu.title} - ${menu.restaurante.nome}`
            )
        ]),
        elemento('div', [
            elemento('ul',
                menu.sections.map(section =>
                    elemento('li', section.title)
                )
            )
        ])
    ])
}

const $cardapios = document.querySelector('.cardapios')
const $fragment = document.createDocumentFragment()

Array.from(dados.menus.values())
    .slice(3)
    .map(menu => ({
        ...menu,
        restaurante: {
            nome: dados.restaurantes.get(menu.restauranteId).name
        }
    }))
    .forEach(menu =>
        $fragment.appendChild(templateCardapio(menu))
    )

$cardapios.appendChild($fragment)

// $cardapios.insertAdjacentHTML('beforeend', templateCardapios)

// console.log('Renderizando', templateCardapios)