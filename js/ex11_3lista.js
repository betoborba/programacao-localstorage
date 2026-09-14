// Programa JavaScript que controla a listagem e exclusão de palavras 
const tbPalavras = document.querySelector("table"); // Cria a referência a tabela
const ckMostrar = document.querySelector("input[type='checkbox']") // cria a referencia da checkbox do hmtl

const montarTabela = () => {
    // se houver dados salvos em locaStorage
    if (localStorage.getItem("jogoPalavra")) {
        // Obtém conteúdo e convert em elementos de vetor (na ocorrência ";")
        const palavras = localStorage.getItem("jogoPalavra").split(";") 
        const dicas = localStorage.getItem("jogoDica").split(";")

        // percorre elementos do vetor e os insere na tabela
        for (let i = 0; i < palavras.length; i++) {
            const linha = tbPalavras.insertRow(-1); // Adiciona uma linha na tabela 

            const col1 = linha.insertCell(0); // cria colunas na linha inserida 
            const col2 = linha.insertCell(1);
            const col3 = linha.insertCell(2);

            col1.innerText = palavras[i]; // Joga um conteúdo em cada célula
            col2.innerText = dicas[i];
            col3.innerHTML = "<i class='exclui' title='Excluir'>&#10008;</i>";
        }
    }
};



