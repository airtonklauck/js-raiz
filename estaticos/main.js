import dados from './dados.js'

function _ehString(valor) {
    return typeof valor === 'string'
}

function _ehFilho(valor) {
    return Array.isArray(valor) || _ehString(valor)
}

function _normalizarFilhos(filhos) {

    if (_ehString(filhos))
        return document.createTextNode(filhos)

    if (Array.isArray(filhos))
        return filhos.map(filho =>
            _ehString(filho)
                ?
                document.createTextNode(filho)
                :
                filho
        )

    return filhos
}

function _transformarEmArray(valor) {
    return Array.isArray(valor) ? valor : [valor]
}

function _extrairNomeDaTag(tagNome) {
    return tagNome.match(/^(\w+)/)[0]
}

function _extrairClassesEId(tagNome) {

    return Array.from(tagNome.matchAll(/[#.]{1}([\w\-]*)/g))
        .reduce(
            (acumulador, atual) => {

                const [match, grupoDeCaptura] = atual

                if (match.startsWith('.'))
                    acumulador.classes.push(grupoDeCaptura)

                if (match.startsWith('#'))
                    acumulador.id = grupoDeCaptura

                return acumulador
            }
            ,
            { classes: [], id: '' }
        )
}

function elemento(tagNome, atributos, filhos) {

    /**
     * Se o segundo argumento (atributos) for um array ou string, significa que não
     * temos atributos
     * Os filhos podem ser array ou string
     * Se o segundo argumento for objeto, temos atributos
     */

    const $elemento = document.createElement(_extrairNomeDaTag(tagNome))

    const { classes, id } = _extrairClassesEId(tagNome)

    if (id) $elemento.id = id

    if (classes.length)
        $elemento.classList.add(...classes)

    const _filhos = _ehFilho(atributos)
        ? atributos : filhos

    const _atributos = !_ehFilho(atributos) ? atributos : {}

    Object.entries(_atributos).forEach(([chave, valor]) =>
        $elemento.setAttribute(chave, valor))

    const $filhos = _normalizarFilhos(_filhos)

    _transformarEmArray($filhos)
        .forEach($filho => $elemento.appendChild($filho))

    return $elemento

}

function templateCardapio(menu) {
    return elemento('div#card.card.cardapio', [
        elemento('header.card-header', [
            elemento('h3.card-title', { style: 'color: red' }, `${menu.title} - ${menu.restaurante.nome}`),
        ]),
        elemento('div.card-body#cardBody', [
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