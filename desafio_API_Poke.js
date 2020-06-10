const axios = require('axios');
const rs = require('readline-sync');
const fs = require('fs')

var pesquisa = ''
var caminhoJson = './data/pokedex.json'

async function nomeIdDoPokemon() {
    pesquisa = rs.question('Digite o nome ou o numero de um pokemon: ').toLowerCase();
    return buscarDadosPokemon(pesquisa)
}

async function buscarDadosPokemon(nome) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then((resposta) => {
            const pokemon = resposta.data;
            console.log(pokemon.name);
            var nomeDasHabilidades = [];
            pokemon.abilities.forEach((habilidade) => {
                nomeDasHabilidades.push(habilidade.ability.name);
            })
            // console.log(nomeDasHabilidades);

            var nomeDosTipos = [];
            pokemon.types.forEach((tipo) => {
                nomeDosTipos.push(tipo.type.name)
            })
            console.log(nomeDosTipos)
            var salvar = rs.keyInYN('(Y) para salvar e (N) para continuar: ')

            if (salvar == true) {
                var dadosPokemon = {
                    nome: pokemon.name,
                    habilidades: nomeDasHabilidades,
                    tipo: nomeDosTipos
                }
                guardarNaPokeDex(dadosPokemon)
            }
        })
}

function guardarNaPokeDex(pokemon) {

    try {
        var pokeBola = verNaPokeDex()
        pokeBola.push(pokemon)
        fs.writeFileSync(caminhoJson, JSON.stringify(pokeBola));
    } catch (error) {
        console.log('Deu erro, mané.')
        var pokeBola = [pokemon]
        fs.writeFileSync(caminhoJson, JSON.stringify(pokeBola));
        console.log(`Nova poke-bola criada e pokemon salvo.`)
    }
}

function verNaPokeDex() {
    var pokeGuardado = fs.readFileSync(caminhoJson);
    var pokeBola = JSON.parse(pokeGuardado);
    return pokeBola
}

async function main() {
    var continuar = true;
    while (continuar) {
        console.log('Escolha uma das opcoes: ')
        console.log('1 - buscar um pokemon')
        console.log('2 - listar pokemons salvos')
        console.log('3 - encerrar')
        var opcao = rs.questionInt('> ')

        switch (opcao) {
            case 1:
                await nomeIdDoPokemon()
                break
            case 2:
                verNaPokeDex().forEach( (pokemon) => console.log(pokemon))
                break
            case 3:
                continuar = false
                break
            default:
                console.log('Opcao invalida')
                break
        }
    }
}
main()



// teste para codar