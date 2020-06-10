const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

async function nomeIdDoPokemon() {
    var caixaDeTexto = document.getElementById('caixaDeTexto')
    var pesquisa = caixaDeTexto.value.toLowerCase()

    var dadosPokemon = {}

axios.get(`https://pokeapi.co/api/v2/pokemon/${pesquisa}`)
        .then((resposta) => {
            const pokemon = resposta.data;
            console.log(pokemon.name);
            dadosPokemon.nome = capitalize(pokemon.name)
            document.getElementById('nome').innerText = `Nome: ${dadosPokemon.nome}`

            dadosPokemon.id = pokemon.id.toString()
            if (dadosPokemon.id.length == 1) {dadosPokemon.id = `00${dadosPokemon.id}`}
            if (dadosPokemon.id.length == 2) {dadosPokemon.id = `0${dadosPokemon.id}`}
            dadosPokemon.imagem = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${dadosPokemon.id}.png`
            document.getElementById('imagemPoke').src = dadosPokemon.imagem

            var listaDasHabilidades = [];
            pokemon.abilities.forEach((habilidade) => {
                listaDasHabilidades.push(capitalize(habilidade.ability.name));
            })
            dadosPokemon.habilidades = listaDasHabilidades
            document.getElementById('habilidades').innerText = `Habilidades: ${dadosPokemon.habilidades.join(", ")}`

            var nomeDosTipos = [];
            pokemon.types.forEach((tipo) => {
                nomeDosTipos.push(capitalize(tipo.type.name))
            })
            console.log(nomeDosTipos)
            dadosPokemon.tipo = nomeDosTipos
            document.getElementById('tipos').innerText = `Tipo: ${dadosPokemon.tipo.join(", ")}`
            console.log(dadosPokemon)
            }
        )
}




