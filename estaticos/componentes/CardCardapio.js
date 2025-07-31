import elemento from '../lib/dom.js'

export default function CardCardapio(menu) {
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