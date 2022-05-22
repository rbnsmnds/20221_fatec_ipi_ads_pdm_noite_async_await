
//importando o pacote dotenv
require('dotenv').config()
//conferir êxito da importação
//console.log(process.env)

// console.log(process.env.APPID)
// const APPID = process.env.APPID
// const PROTOCOL = process.env.PROTOCOL
// const BASE_URL = process.env.BASE_URL

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
    .catch((erro) => console.log(erro));
    fatorial(-1)
    .then((res) => console.log(res))
    .catch((erro) => console.log(erro));
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
// chamadaComAwait()

// Promises: ECMAScript 2015
// async/await: ECMAScript 2017

async function chamadaComAsyncAwait() {
    try{
        const f3 = await fatorial(10)
        console.log(f3)
        const f4 = await fatorial(-10)
        console.log(f4)
    }
    catch (e){
        console.log(e)
    }
}
chamadaComAsyncAwait();

// utilizando async arrow function
const oi = async (nome) => {
    return `Oi ${nome}`
}

// utilizando uma função simples com async
// async function ola (nome){
//     return `Olá, ${nome}`
// }
// const resultado = ola("Ana")
// resultado.then (r => console.log(r))

// utilizando uma função devolvendo uma promise
// function ola (nome){
//     return new Promise (function(resolve, reject){
//         resolve [`Olá, ${nome}`]
//     })
// }
// const resultado_dois = ola ("Pedro")
// resultado_dois.then (res => console.log(res))

// utilizando uma função simples
function ola (nome){
    return `Olá, ${nome}`
}
const resultado_um = ola ("João")
console.log(resultado_um)

// Tentativas de resolução de exercício

axios.get(url)
.then(res => {
    console.log(res)
    return res.data
})
.then(res => {
    console.log(res.cnt)
    return res
})
.then(res => {
    console.log(res['list'])
    return res['list']
})
.then(res => {
    // para cada previsão na lista
    res.forEach (elemento => {
        console.log (new Date(+elemento.dt * 1000).toLocaleString)
        // exibir a temperatura mínima
        console.log (`Temperatura mínima: ${elemento.main.temp_min}`)
        // exibir a temperatura máxima
        console.log (`Temperatura máxima: ${elemento.main.temp_max}`)
        // exibir a descrição
        console.log (`Descrição: ${elemento.weather[0].description}`)
    })
})
// .then(res => {
//     // para cada previsão na lista
//     for (let i = 0; i < res.length; i++){
//         console.log (new Date(+(res[i].dt) + 1000).toLocaleString())
//         // exibir a temperatura mínima
//         console.log ("Temp min: " + res[i].main.temp_min)
//         // exibir a temperatura máxima
//         console.log ("Temp max: " + res[i]['main']['temp_min'])
//         // exibir a descrição
//         console.log ("Description: " + res[i].weather[0].description)
//     }
// })
