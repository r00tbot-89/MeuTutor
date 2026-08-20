// BANCO DE DADOS (Simulado por Matéria)
const bancoPerguntas = {
    matematica: [
        {
            pergunta: "1) Quanto é 7 x 8?",
            opcoes: ["48", "56", "64"],
            correta: 1,
            topico: "Multiplicação Básica",
            // Usei a versão youtube-nocookie para evitar erros no player do video
            video: "https://www.youtube-nocookie/watch?v=apPAu1Gw3qs
        },
        {
            pergunta: "2) Qual é a raiz quadrada de 81?",
            opcoes: ["7", "8", "9"],
            correta: 2,
            topico: "Radiciação",
            video: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
        }
    ],
    historia: [
        {
            pergunta: "1) Em que ano ocorreu a Proclamação da República do Brasil?",
            opcoes: ["1822", "1889", "1945"],
            correta: 1,
            topico: "História do Brasil",
            video: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
        }
    ],
    ciencia: [
        {
            pergunta: "1) Qual é a unidade básica da vida?",
            opcoes: ["Átomo", "Célula", "Tecido"],
            correta: 1,
            topico: "Biologia Celular",
            video: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
        }
    ],
    portugues: [
        {
            pergunta: "1) Qual das opções é um substantivo próprio?",
            opcoes: ["Cachorro", "Brasil", "Cidade"],
            correta: 1,
            topico: "Gramática - Substantivos",
            video: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
        }
    ],
    artes: [
        {
            pergunta: "1) Quais são as cores primárias?",
            opcoes: ["Verde, Laranja e Roxo", "Vermelho, Azul e Amarelo", "Preto e Branco"],
            correta: 1,
            topico: "Teoria das Cores",
            video: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
        }
    ]
};

// Variável global para armazenar as questões da prova atual
let questoesAtuais = [];

// FUNÇÃO 1: GERAR A PROVA
function gerarProva() {
    const nome = document.getElementById("nome").value;
    const materiaKey = document.getElementById("materia").value;
    const materiaSelect = document.getElementById("materia");
    const materiaTexto = materiaSelect.options[materiaSelect.selectedIndex].text;

    if (!nome.trim()) {
        alert("Por favor, preencha seu nome!");
        return;
    }

    // Atualiza o nome da matéria na tela de loading
    document.getElementById("materia-escolhida").innerText = materiaTexto;

    // Alterna a visibilidade das telas
    document.getElementById("form-container").classList.add("hidden");
    document.getElementById("loading-container").classList.remove("hidden");

    // Seleciona as perguntas da matéria escolhida (ou matemática como fallback)
    questoesAtuais = bancoPerguntas[materiaKey] || bancoPerguntas.matematica;

    // Simula 2 segundos de carregamento da IA
    setTimeout(() => {
        document.getElementById("loading-container").classList.add("hidden");
        document.getElementById("quiz-container").classList.remove("hidden");

        document.getElementById("quiz-titulo").innerText = `Prova de ${materiaTexto}`;

        const containerPerguntas = document.getElementById("perguntas-list");
        containerPerguntas.innerHTML = "";

        // Renderiza cada pergunta na tela
        questoesAtuais.forEach((q, idx) => {
            let htmlOpcoes = "";

            q.opcoes.forEach((op, opIdx) => {
                htmlOpcoes += `
                    <label class="opcao-item">
                        <input type="radio" name="q${idx}" value="${opIdx}"> ${op}
                    </label>
                `;
            });

            containerPerguntas.innerHTML += `
                <div class="questao-box">
                    <p><strong>${q.pergunta}</strong></p>
                    ${htmlOpcoes}
                </div>
            `;
        });
    }, 2000);
}

// FUNÇÃO 2: CALCULAR RESULTADO E EXIBIR VÍDEO
function calcularResultado() {
    let acertos = 0;
    let erros = [];

    // Verifica quais opções foram marcadas
    questoesAtuais.forEach((q, idx) => {
        const selecionada = document.querySelector(`input[name="q${idx}"]:checked`);
        
        if (selecionada && parseInt(selecionada.value) === q.correta) {
            acertos++;
        } else {
            erros.push(q);
        }
    });

    const porcentagem = Math.round((acertos / questoesAtuais.length) * 100);

    // Alterna para a tela de resultado
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("resultado-container").classList.remove("hidden");

    document.getElementById("porcentagem-texto").innerText = `${porcentagem}%`;
    document.getElementById("mensagem-desempenho").innerText = 
        `Você acertou ${acertos} de ${questoesAtuais.length} questões.`;

    const recomendacoesDiv = document.getElementById("recomendacoes-area");
    recomendacoesDiv.innerHTML = "";

    // Se errou alguma questão, exibe as recomendações e passa os dados na URL
    if (erros.length > 0) {
        recomendacoesDiv.innerHTML += `<h3>💡 Recomendação da IA para Estudo:</h3>`;

        erros.forEach(item => {
            recomendacoesDiv.innerHTML += `
                <div class="video-card">
                    <p><strong>Revisar assunto:</strong> ${item.topico}</p>
                    <iframe 
                        src="${item.video}" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                </div>
            `;
        });

        // 🔄 NOVO: Empacota os erros e coloca direto no link do botão
        const errosCodificados = encodeURIComponent(JSON.stringify(erros));
        
        recomendacoesDiv.innerHTML += `
            <button onclick="window.location.href='recuperacao.html?erros=${errosCodificados}'" style="margin-top: 15px; background: #ff4757;">
                🔄 Fazer Prova de Recuperação
            </button>
        `;
    } else {
        recomendacoesDiv.innerHTML = `<p>🎉 Parabéns! Você dominou todos os assuntos desta prova!</p>`;
    }
}
