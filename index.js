
//importando o pacote dotenv
require('dotenv').config()

//importando o pacote axios
const axios = require('axios');

//sua chave aqui
//const appid = "8bd90b5751e06e741d8e95c2b8246a99";
//cidade desejada
//const q = "Itu";
//unidade de medida de temperatura
//const units = "metric";
//idioma
//const lang = "pt_BR";
//quantidade de resultados
//const cnt = "10"
//base para o endereço da chamada
//const baseurl = "api.openweathermap.org/data/2.5/forecast";
//protocolo para a chamada
//const protocol = "https";
/*endereço da requisição construído 
com as constantes declaradas*/
//const url = `${protocol}://${baseurl}?q=${q}&units=${units}&appid=${appid}&lang=${lang}&cnt=${cnt}`
/*endereço da requisição utilizando 
as variáveis declaradas no dotenv*/
const { APPID, PROTOCOL, BASE_URL, UNITS, LANGUAGE, CNT, Q } = process.env
const url = `${PROTOCOL}://${BASE_URL}?q=${Q}&appid=${APPID}&lang=${LANGUAGE}&units=${UNITS}&cnt=${CNT}`

//faz a requisição
axios
.get(url)
.then((res) => {
    /* mostra o resultado e devolve somente a parte de
    interesse */
    console.log(res);
    return res.data;
})
.then((res) => {
    //mostra o total e devolve o resultado
    console.log(res.cnt);
    return res;
})
.then((res) => {
    //devolve somente a lista de previsões
    console.log("aqui", res);
    return res["list"];
})
.then((res) => {
    //para cada resultado, mostra algumas informações
    for (let previsao of res) {
        console.log(`
            ${new Date(+previsao.dt * 1000).toLocaleString()},
            ${'Min: ' + previsao.main.temp_min}\u00B0C,
            ${'Max: ' + previsao.main.temp_max}\u00B0C,
            ${'Hum: ' + previsao.main.humidity}%,
            ${previsao.weather[0].description}
        `);
    }
    return res;
})
.then((res) => {
    /* verifica quantas previsões têm percepção humana
    de temperatura acima de 30 graus */
    const lista = res.filter(r => r.main.feels_like >= 30);
    console.log (`${lista.length} previsões têm
    percepção humana de temperatura acima de 30
    graus`)
});

async function hello(nome) {
    return "Oi, " + nome;
}
const boasVindas = hello("João");
console.log(boasVindas);
boasVindas.then((res) => console.log(res));

function fatorial(n) {
    if (n < 0) return Promise.reject("Valor não pode ser negativo");
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return Promise.resolve(res);
}

function chamadaComThenCatch() {
    fatorial(5)
    .then((res) => console.log(res))
    .catch((res) => console.log(res));
    fatorial(-1)
    .then((res) => console.log(res))
    .catch((res) => console.log(res));
}
chamadaComThenCatch();

//para usar await tem que ser async
async function chamadaComAwait() {
    /* note que não há paralelismo implícito
    somente haverá paralelismo se a função chamada
    utilizar explicitamente */
    const f1 = await fatorial(5);
    console.log(f1);
    const f2 = await fatorial(-1);
    console.log(f2);
}