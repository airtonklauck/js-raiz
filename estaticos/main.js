import dados from './dados.js'
import CardCardapio from './componentes/CardCardapio.js'

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
        $fragment.appendChild(CardCardapio(menu))
    )

$cardapios.appendChild($fragment)

// $cardapios.insertAdjacentHTML('beforeend', templateCardapios)

// console.log('Renderizando', templateCardapios)