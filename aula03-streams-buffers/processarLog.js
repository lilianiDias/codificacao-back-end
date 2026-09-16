import fs from 'fs'
import  readline  from 'readline';
 
async function  filtrarErrros(){
    console.log('Iniciando processamento com Stream.....')
    exibirConsumoMemoria('Início');

    const streamLeitura = fs.createReadStream('servidor.log');
    const streamEscrita = fs.createWriteStream('apenas_erro.log');
    const leitorLInhaALinha = readline.createInterface({input: streamLeitura, crlfDelay: Infinity});

    let totalErros = 0 ;
    for await(const linha of leitorLInhaALinha){
        if(linha.includes('ERROR')){
            streamEscrita.write(linha + '\n');
            totalErros++;
        }
    }
    exibirConsumoMemoria('Fim');
    console.log('Processamento concluído!|\n');
    console.log(`Quantidade de erris encontrados: ${totalErros} linhas.\n `);
}
filtrarErrros();

function exibirConsumoMemoria(consumo){
    const memoria = process.memoryUsage();
    const rssMB = (memoria.heapUsed / 1024 /1024).toFixed(2);
    const heapMB = (memoria.heapUsed / 1024  /1024).toFixed(2);
    console.log(`[${consumo}] RSS: ${rssMB} MB | heap utilizado: ${heapMB} MB `)
}