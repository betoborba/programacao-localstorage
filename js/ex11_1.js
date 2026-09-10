const frm = document.querySelector("form"); // Captura os elementos da página 
const respLista = document.querySelector("pre");
const respCavalo = document.querySelector("#outCavalo");

// nome dos cavalos participantes do páreo
const CAVALOS = ["Marujo", "Tordinho", "Belga", "Twister", "Jade", "Lucky"]; 

// vetor que irá armazenar um objeto aposta (com nº cavalo e valor da aposto)
const apostas = [];

frm.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o envio do form

    const cavalo = Number(frm.inCavalo.value); // Dados do form
    const valor = Number(frm.inValor.value);

    //adiciona ao vetor de objetos (atributos cavalo e valor)
    apostas.push({cavalo, valor});

    //variável para exibir a lista das apostas realizadas
    let lista = `Apostas Realizadas\n${"-".repeat(25)}\n` 

    // Percorre o vetor e concatena em lista as apostas realizadas 
    for (const aposta of apostas) {
        lista += `Nº ${aposta.cavalo} ${obterCavalo(aposta.cavalo)}`;
        lista += ` - R$: ${aposta.valor.toFixed(2)}\n`;
    }
    respLista.innerText = lista; // Exibe a lista das aposta

    frm.reset();
    frm.inCavalo.focus(); // Posiciona o cursor em inCavalo
})

//apostas.push({cavalo, valor}); // apostas.push({cavalo: valor, valor: valor })

const obterCavalo = (num) => {
    const posicao = num - 1; // Posicao no vetor (subtrai 1, pois inicia em 0)
    return CAVALOS[posicao]; // Nome do cavalo (const CAVALOS)

};

frm.inCavalo.addEventListener("blur", () => {
    //se não preencheu o campo, limpa respCavalo e retorna
    //(não exibe mensagem de alerta, pois pode sair por um clique em ganhador)
    if (frm.inCavalo.value == "") {
        respCavalo.innerText = ""
        return
    }


    const numCavalo = Number(frm.inCavalo.value); // Nº do cavalo convertido em Number
    
    if(!validarCavalo(numCavalo)){ // Se não validar 
        alert("Nº dos inválido");
        frm.inCavalo.focus()
        return;
    }


    const nome = obterCavalo(numCavalo); // Atribui retorno das funções à variáveis 
    const contaNum = contarAposta(numCavalo);
    const total = totalizarApostas(numCavalo);

    // Exibe nome, nº de apostas e total apostado no cavalo

    respCavalo.innerText = `${nome} (Apostas: ${contaNum} - R$: ${total.toFixed(2)})`

})

const validarCavalo = (num) => {
    // retorna o valor resultante da condição (true ou false)
    return num >= 1 && num <= CAVALOS.length; // conjunção lógica && and 
};

const contarApostas = (num) => {
    let contador = 0;
    //percorre o vetor apostas
    for (const aposta of apostas) {
        // verifica se aposta é no cavalo passado como parâmetro
        if(aposta.cavalo == num) {
            contador++; // conta +1 quando a paosta for no cavalo do parâmetro
        }
    }
    return contador; // Retorna o nº de apostas no cavalo numCavalo
};


const totalizarApostas = (num) => {
    let total = 0;
    for (const aposta of apostas) {
        if (aposta.cavalo == num) {
            total += aposta.valor; // soma o valor das apostas
        }
    }
    return total; // Retorna a soma dos valores apostas em numCavalo
};

// Quando o campo receb o foco, limpa o conteúdo e dados do cavalo
frm.inCavalo.addEventListener("focus", () => {
    frm.inCavalo.value = "";
    respCavalo.innerText = "";
});

frm.btResumo.addEventListener("click", () => {
    // vetor com valores zerados para cada cavalo

    const somaApostas = [0, 0, 0, 0, 0, 0];

    // Percorre apostas e acumula na posição do cavalo aposta (-1, pois inicia em 0)
    for (const aposta of apostas) {
        somaApostas[aposta.cavalo -1] += aposta.valor;
    }

    // exibe o resultado
    let resposta = `Nº Cavalo.............R$ Apostado \n${"-".repeat(35)}\n`;
    CAVALOS.forEach((cavalo, i) => {
        resposta += ` ${i + 1} ${cavalo.padEnd(20)}`;
        resposta += ` ${somaApostas[i].toFixed(2).padStart(11)}\n`;
    })

    respLista.innerText = resposta;
});

frm.btGanhador.addEventListener("click", () => {
    // Solicita o número do cavalo ganhador (já converte para número)
    const ganhador = Number(prompt("Nº Cavalo Ganhador: "));

    // Para validar o preenchimento do prompt anterior
    if (isNaN(ganhador) || !validarCavalo(ganhador)) {
        alert("Cavalo Inválido");
        return;
    }

    // Uso do método reduce para somar o valor das apostas
    const total = apostas.reduce((acumulador, aposta) => acumulador + aposta.valor, 0); 

    // concatena em resumo o resultado a ser exibino na página
    let resumo = `Resultado Final do Páreo\n${ '-'.repeat(30)}\n`

    resumo += `Nº Total de Apostas: ${apostas.length}\n`;
    resumo += `Total Geral R$: ${total.toFixed(2)}\n\n`;
    resumo += `Ganhador Nº ${ganhador} - ${obterCavalo(ganhador)}\n\n`;
    resumo += `Nº de Apostas: ${contarApostas(ganhador)}\n`;
    resumo += `Total Apostado R$: ${totalizarApostas(ganhador).toFixed(2)}`;

    respLista.innerText = resumo; // Exibe o resultado

    frm.btApostar.disabled = true; // Desabilita os botões apostar e ganhador 
    frm.btGanhador.disabled = true 
    frm.btNovo.focus();            // Joga o foco no botão "Novo Páreo"

})

// Recarrega a página (para funções com apenas 1 linha, não é necessário {})
frm.btNovo.addEventListener("click", () => window.location.reload());

