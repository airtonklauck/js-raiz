import dados from './dados.js'

function cardapioTemplate() {
    return
    `
        <div class="cardapio">
            <header>
                <h3>Cardapio - Restaurante Nome</h3>
            </header>
            <div class="cardapio-body">
                <ul>
                    <li>Section - Title</li>
                </ul>
            </div>  
        </div>
    `
}
console.log('Renderizando', dados)