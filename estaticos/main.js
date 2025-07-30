import dados from './dados.js'

function templateCardapio(menu) {
    return `
        <div class="cardapio" style="color: red">
            <header>
                <h3>${menu.title} - ${menu.restaurante.nome}</h3>
            </header>
            <div class="cardapio-body">
                <ul>
                ${menu.sections.map(section =>
        `<li>${section.title}</li>`
    ).join('')}
                </ul>
            </div>  
        </div>
    `
}

const templateCardapios = Array.from(dados.menus.values())
    .slice(3)
    .map(menu => ({
        ...menu,
        restaurante: {
            nome: dados.restaurantes.get(menu.restauranteId).name
        }
    }))
    .map(templateCardapio)
    .join('')

const $cardapios = document.querySelector('.cardapios')
$cardapios.insertAdjacentHTML('beforeend', templateCardapios)

// console.log('Renderizando', templateCardapios)