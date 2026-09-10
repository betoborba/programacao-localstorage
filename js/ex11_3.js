const frm = document.querySelector("form") // criar a referencia do form 

frm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita o envio do form

    // Obtém conteúdo dos campos (.trim()) remove espaços na palavra no início e fim)

    const palavra = frm.inPalavra.value.trim();
    const dica = frm.inDica.value;


    // valida preenchimento (palavra não deve possuir espaço em branco no meio)
    if (palavra.includes(" ")) {
        alert(" Informe uma palavra válida (sem espaços")
        return
    }

    // se já existem dados em localStorage, grava conteúdo anterior + ";" +palavra /dica

    if (localStorage.getItem("jogoPalavra")) {
        localStorage.setItem("jogoPalavra",
            localStorage.getItem("jogoPalavra") + ";" + palavra);
            localStorage.setItem("jogoDica", localStorage.getItem("jogoDica") + ";" + dica);
    } else {
        // senão, é a primeira inclusão: grava apenas a palavra / dica
        localStorage.setItem("jogoPalavra", palavra);
        localStorage.setItem("jogoDica", dica);
    }

    // verifica se salvou
    if (localStorage.getItem("jogoPalavra")) {
        alert(`Ok! Palavra ${palavra} Cadastrada com Sucesso`)
    }

    frm.reset(); // limpa o form
    frm.inPalavra.focus(); // Joga o foco em inPalavra

})