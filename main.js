import dados from './dadsos/restaurantes.js'


const restaurantes = new Map(
    dados.map(({ menus, ...restauranteRest }) =>
        [
            restauranteRest.id,
            {
                menus: menus.map(menu => menu.id),
                ...restauranteRest
            }
        ])
)

const menus = new Map(
    dados.flatMap(restaurante =>
        restaurante.menus.map(menu =>
            [
                menu.id,
                {
                    ...menu,
                    restauranteId: restaurante.id
                }
            ]
        )
    )
)

const restauranteId = menus.get('b91e5b07-df6c-4b3f-8028-ab39471ae0e9').restauranteId

console.log(restaurantes.get(restauranteId))