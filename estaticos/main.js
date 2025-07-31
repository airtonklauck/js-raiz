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

function elemento(tagNome, atributos, filhos) {

    /**
     * Se o segundo argumento (atributos) for um array ou string, significa que não
     * temos atributos
     * Os filhos podem ser array ou string
     * Se o segundo argumento for objeto, temos atributos
     */

    const $elemento = document.createElement(tagNome)

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
    return elemento('div', [
        elemento('header', [
            elemento('h3', { style: 'color: red' }, `${menu.title} - ${menu.restaurante.nome}`),
            elemento('div', [
                elemento('span', 'Olá'),
                'mundo',
                elemento('strong', '!!!')
            ])
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