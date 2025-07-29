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

// Refatorando para reduce

const novosDados = dados.reduce(
    (acc, { menus, ...restauranteRest }) => {
        acc.restaurantes.push(
            [
                restauranteRest.id,
                {
                    menus: menus.map(menu => menu.id),
                    ...restauranteRest
                }
            ]
        )
        acc.menus = [
            ...acc.menus,
            ...menus.map(menu => [
                menu.id,
                {
                    ...menu,
                    restauranteId: restauranteRest.id
                }
            ])
        ]
        return acc
    },
    { restaurantes: [], menus: [] }
)

// Refatorando o reduce

const novosDados2 = dados.reduce(
    (acc, { menus, ...restauranteRest }) => ({
        ...acc,
        restaurantes: [
            ...acc.restaurantes,
            [
                restauranteRest.id,
                {
                    menus: menus.map(menu => menu.id),
                    ...restauranteRest
                }
            ]
        ],
        menus: [
            ...acc.menus,
            ...menus.map(menu => [
                menu.id,
                {
                    ...menu,
                    restauranteId: restauranteRest.id
                }
            ])
        ]
    }),
    { restaurantes: [], menus: [] }
)

const restaurantesRefatorado = new Map(novosDados2.restaurantes)
const menusRefatorado = new Map(novosDados2.menus)

console.log(restaurantesRefatorado)