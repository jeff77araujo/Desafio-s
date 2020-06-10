const axios = require('axios');
const rs = require('readline-sync');
const fs = require('fs');

var pokemon = rs.question('Escreva o nome do pokemon que deseja procurar: ').toLowerCase()
var totalHabilidades = [];

//requisição da API
var api = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
.then((pokemon) => {
    //pega o nome
    var pokeName = pokemon.data.name
    console.log('Nome: '+pokeName)

    //pega o ID
    var pokeId = pokemon.data.id
    console.log('ID: '+pokeId)

    //pega as Habilidades
    var pokeHab = pokemon.data.abilities
    //mostra as habilidades na tela
    for (pokeHabilidades of pokeHab){
        //pega e mostra na tela uma habilidade de cada vez
        var pokeHabilidade = pokeHabilidades.ability.name
        console.log(`Habilidade: ${pokeHabilidade}`)
        totalHabilidades.push(pokeHabilidade)
    }

    var pokeTotal = [{
        nome: pokeName,
        id: pokeId,
        habilidades: totalHabilidades
    }]

    var escolha = rs.questionInt('Digite 1 para salvar e 2 para continuar: ')
    if(escolha == 1){
        var jsonSerealizado = JSON.stringify(pokeTotal)
        var caminhoDoArquivo = 'data/pokemon.json'
        fs.writeFileSync(caminhoDoArquivo, jsonSerealizado)
    }
})
.catch(() => {})