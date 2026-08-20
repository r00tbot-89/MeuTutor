let questoesRecuperacao = [];

document.addEventListener("DOMContentLoaded", () => {
    // 🔍 NOVO: Pega os dados diretamente da URL (link)
    const parametros = new URLSearchParams(window.location.search);
    const dadosSalvos = parametros.get("erros");

    if (!dadosSalvos) {
        alert("Nenhuma questão pendente para recuperação!");
        window.location.href = "index.html";
        return;
    }

    // Desempacota os dados da URL e renderiza a prova
    questoesRecuperacao = JSON.parse(decodeURIComponent(dadosSalvos));
    renderizarProva();
});

function renderizarProva() {
    const container = document.getElementById("perguntas-list");
    container.innerHTML = "";

    questoesRecuperacao.forEach((q, idx) => {
        let htmlOpcoes = "";

        q.opcoes.forEach((op, opIdx) => {
            htmlOpcoes += `
                <label class="opcao-item">
                    <input type="radio" name="q${idx}" value="${opIdx}"> ${op}
                </label>
            `;
        });

        container.innerHTML += `
            <div class="questao-box">
                <p><strong>[Reforço - ${q.topico}]</strong> ${q.pergunta}</p>
                ${htmlOpcoes}
            </div>
        `;
    });
}

function calcularResultadoRecuperacao() {
    let acertos = 0;

    questoesRecuperacao.forEach((q, idx) => {
        const selecionada = document.querySelector(`input[name="q${idx}"]:checked`);
        if (selecionada && parseInt(selecionada.value) === q.correta) {
            acertos++;
        }
    });

    const porcentagem = Math.round((acertos / questoesRecuperacao.length) * 100);

    document.getElementById("quiz-recuperacao").classList.add("hidden");
    document.getElementById("resultado-recuperacao").classList.remove("hidden");

    document.getElementById("porcentagem-texto").innerText = `${porcentagem}%`;
    document.getElementById("mensagem-desempenho").innerText = 
        `Você acertou ${acertos} de ${questoesRecuperacao.length} questões na recuperação!`;
}
