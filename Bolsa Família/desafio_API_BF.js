var rs = require('readline-sync');
var axios = require('axios');

var nomeDoMunicipio = rs.question('Digite o nome do municipio: ').toLowerCase();
var ano = rs.question('Digite o ano (YYYY): ');
var mes = rs.question('Digite o mes (MM): ');

var apiDeMunicipios = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';
var apiDaBolsaFamilia = 'http://www.transparencia.gov.br/api-de-dados/bolsa-familia-por-municipio';
// var percentualBeneficiarios = `https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2019/variaveis/9324?localidad
// es=N6[municipiosEncontrados.id]`

function pagaDadosDoBolsaFamiliaPorMunicipio(codigoDoMunicipio) {
    console.log(codigoDoMunicipio);
    var urlDaBolsaFamilia = `${apiDaBolsaFamilia}?mesAno=${ano}${mes}&codigoIbge=${codigoDoMunicipio}&pagina=1`;
    axios.get(urlDaBolsaFamilia)
    .then((resposta) => {
        var listaDeBeneficios = resposta.data;
        console.log(listaDeBeneficios);
        if (listaDeBeneficios.length == 0) {
            console.log('Nao ha beneficios para a data e o municipio digitados.');
        }
        listaDeBeneficios.forEach( (beneficio) => {
            console.log('Quantidade de beneficiados: ' + beneficio.quantidadeBeneficiados);
            console.log('Valor Total: ' + beneficio.valor);
            console.log('Municipio: ' + beneficio.municipio.nomeIBGE);
            var nomeDoMunicipioNoIbge = beneficio.municipio.nomeIBGE;
            var quantidade = beneficio.quantidadeBeneficiados;
            var valor = beneficio.valor;
            var valorPorBeneficiado = valor / quantidade;
            console.log(`No municipio de ${nomeDoMunicipioNoIbge}, no mes ${mes} de ${ano}, tivemos um beneficio medio de ${valorPorBeneficiado.toFixed(2)} por pessoa.`);
            

        })
    })
}

// axios.get()

axios.get(apiDeMunicipios)
    .then((resposta) => {
        var municipios = resposta.data;
        var municipiosEncontrados = municipios.find((identificador) => {
            if (nomeDoMunicipio == identificador.nome.toLowerCase()) {
                return true;
            }
            return false;
        })
        pagaDadosDoBolsaFamiliaPorMunicipio(municipiosEncontrados.id);

    })