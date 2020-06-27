// $("#caixaDeTexto").keyup(function (event) {
//   if (event.keyCode === 13) {
//     $("#botaoPesquisa").click();
//   }
// });

var input = document.getElementById("caixaDeTexto");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("btn").click();
    resetador()
  }
});

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function resetador() {
  var input = document.querySelector('#caixaDeTexto')
  input.value = "";
  input.focus();
}

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
// objs.sort(compare);

function verificaCaixaDeTexto() {
  if (document.getElementById("caixaDeTexto").value == false) {
    alert("Insira um pokemon")
  }
}

function organizaListagem() {
  listaPokemon = listaPokemonDesordenada.sort(compare)
  console.log(listaPokemon)
}

//   function reset() {
//     let resetar = document.getElementById('caixaDeTexto'); // Seleciona o formulário que deseja limpar os campos
//     formulario.reset(); // Executa a ação de limpar todos os campos
//   }

let listaNomesPokemon = []
let listaPokemonDesordenada = []
let listaPokemon = []

function geraListagem() {
  axios.get("https://pokeapi.co/api/v2/pokemon/?limit=807")
    .then((resposta) => {
      retorno = resposta.data.results
      retorno.forEach((indice) => { listaNomesPokemon.push(indice) })
      listaNomesPokemon.forEach((indice) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${indice.name}`)
          .then((resposta) => {
            const pokemon = resposta.data
            var numero = pokemon.id.toString()
            if (numero.length == 1) { numero = `00${numero}` }
            if (numero.length == 2) { numero = `0${numero}` }
            var sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numero}.png`
            indice.img = sprite
            var insercao = { name: capitalize(indice.name), img: indice.img, num: numero }
            listaPokemonDesordenada.push(insercao)
          })
      })
    })
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
      if (dadosPokemon.id.length == 1) { dadosPokemon.id = `00${dadosPokemon.id}` }
      if (dadosPokemon.id.length == 2) { dadosPokemon.id = `0${dadosPokemon.id}` }
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


$(function () {
  listaPokemon;
  $("#caixaDeTexto").autocomplete({
    minLength: 1,
    source: function (request, response) {
      response($.map(listaPokemon, function (obj, key) {

        var name = obj.name.toUpperCase();

        if (name.indexOf(request.term.toUpperCase()) != -1) {
          return {
            label: obj.name, // Label for Display
            // value: obj.id // Value
            img: obj.img,
            num: obj.num
          }
        } else {
          return null;
        }
      }));
    },
    focus: function (event, ui) {
      event.preventDefault();
    },
    // Once a value in the drop down list is selected, do the following:
    select: function (event, ui) {
      event.preventDefault();
      // place the person.given_name value into the textfield called 'select_origin'...
      $('#caixaDeTexto').val(ui.item.label);
      nomeIdDoPokemon()
      // ... any other tasks (like setting Hidden Fields) go here...
    },
    html: true,
    open: function (event, ui) {
      $(".ui-autocomplete").css("z-index", 1000);

    }
  })
    .autocomplete("instance")._renderItem = function (ul, item) {
      // return $("<li><div><img src=" + item.img + "><span>" + item.value + "</span></div></li>").appendTo(ul);
      return $(`<li><div><img src=${item.img}><span> N° ${item.num} - </span><span>${item.value}</span></div></li>`).appendTo(ul);
    };
})


