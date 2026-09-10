const frm = document.querySelector("form"); // Captura elementos da página 
const dvPalco = document.querySelector("#divPalco");


const POLTRONAS = 240; // declara a constante com o número de poltronas no teatro
const reservadas = [] // Vetor com as poltronas reservadas pelo cliente


window.addEventListener("load", () => {
    // Operador ternário: se houver dados salvos em localStorage, faz um split (";") e..
    // atribui esses dados ao array, caso contrário, o array é iniciado vazio
    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";") // faz o mesmo que este bloco if/else e envia para o vetor
    : []; 

    // repeticao para montar o numero total de poltronas (definida na constante)
    for (let i = 1; i <= POLTRONAS; i++) { // enquanto o i for menor ou igual a quantidade de poltronas
        const figure = document.createElement("figure"); // cria tag figure
        const imgStatus = document.createElement("img"); // cria tag img

        // se a posição consta em ocupado, exibe a imagem ocupada, senão, disponível 
        imgStatus.src = ocupadas.includes(i.toString()) // Veja se o número da poltrona atual i, convertido para texto, está dentro da lista de poltronas ocupadas
        ? "img/ocupada.png"   // se (if) estiver ocupada imagem ocupada 
        : "img/disponivel.png"; // senão (else)
        imgStatus.className = "poltrona"; // classe com dimensão de img
        const figureCap = document.createElement("figcaption") // cria figCaption
    
        // Quantidade de zeros antes do número da poltrona
        const zeros = i < 10 ? "00" : i < 100 ? "0" : ""; //  Se menor que 10 adiciona "00", se menor que 100 adiciona "0", senão fica vazio

        const num = document.createTextNode(`[${zeros} ${i}]`); // cria texto 

        figureCap.appendChild(num); // define os pais de cada tag criada figueCapa é pai de num
        figure.appendChild(imgStatus) // img status é filha de figure
        figure.appendChild(figureCap) // figureCap passa a ser filho de figure


        // se i módulo 24 == 12 (é o corredor: define margem direita 60px)
        if (i % 24 == 12) figure.style.marginRight = "60px";

        dvPalco.appendChild(figure); // indica que figure é filha de divPalco

        // se i modula 24 == 0: o comando após && será executado (insere quebra de de linha)
        (i % 24 == 0) && dvPalco.appendChild(document.createElement("br"))
    } 
});
 
frm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita o envio do form

    const poltrona = Number(frm.inPoltrona.value); // obtém o conteúdo de inPoltrona

    // valida o preenchimento do campo de entrada...não pode ser maior que a const 240 poltronas
    if (poltrona > POLTRONAS) {
        alert("informe um número de poltrona válido");
        frm.inPoltrona.focus();
        return
    }

    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    :[];

    // se poltrona escolhida já está ocupada (existe em localStorage)
    if (ocupadas.includes(poltrona.toString())){
        alert(`Poltrona ${poltrona} já ocupada...`);
        frm.inPoltrona.value = "";
        frm.inPoltrona.focus()
        return
    }

    // captura imagem da poltrona, filha de divPalco. É -1pois começa em 0
    const imgPoltrona = dvPalco.querySelectorAll("img") [poltrona -1];

    imgPoltrona.src = "img/reservada.png"; // modifica atributo da imagem

    reservadas.push(poltrona); // adiciona poltrona ao vetor reservadas

    frm.inPoltrona.value = ""; // limpa o campo
    frm.inPoltrona.focus();  // Joga o foco em inPoltrona 

});

frm.btConfirmar.addEventListener("click", () => {
    if (reservadas.length == 0) {                  // se o vetor reservadas estiver vazio 
        alert("Não há poltronas reservadas");
        frm.inPoltrona.focus();
        return;
    }


    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    :[];


    // for decrescente, pois as reservas vão sendo removidas a cada alteração da imagem 

    for (let i = reservadas.length - 1; i >= 0; i--) {
        ocupadas.push(reservadas[i]);                 // decresce de reservada e envia para ocupadas 

        // captura imagem da poltrona, filha de divPalco; É -1 pois começa em 0
        const imgPoltrona = dvPalco.querySelectorAll("img")[reservadas[i] - 1];

        imgPoltrona.src = "img/ocupada.png"; // modifica atributo da imagem

        reservadas.pop(); // remove do vetor a reserva ja alterada 
    }

    localStorage.setItem("teatroOcupadas", ocupadas.join(";"))

});






