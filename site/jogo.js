// Perguntas rápidas estilo Arcade/Boss
const perguntasBoss = [
    { pergunta: "Quanto é 9 x 7?", opcoes: ["56", "63", "72"], correta: 1 },
    { pergunta: "Qual é a capital da França?", opcoes: ["Paris", "Londres", "Berlim"], correta: 0 },
    { pergunta: "Raiz quadrada de 144?", opcoes: ["10", "11", "12"], correta: 2 },
    { pergunta: "Qual elemento químico tem símbolo 'O'?", opcoes: ["Ouro", "Oxigênio", "Ozônio"], correta: 1 },
    { pergunta: "Quanto é 150 - 65?", opcoes: ["85", "75", "95"], correta: 0 }
];

let indiceAtual = 0;
let hpJogador = 100;
let hpBoss = 100;
let tempoRestante = 10;
let timerLoop = null;

document.addEventListener("DOMContentLoaded", () => {
    iniciarRodada();
});

function iniciarRodada() {
    if (indiceAtual >= perguntasBoss.length) {
        // Se acabarem as perguntas e ninguém morreu, quem tem mais HP vence
        if (hpJogador > hpBoss) finalizarJogo(true);
        else finalizarJogo(false);
        return;
    }

    tempoRestante = 8; // 8 segundos por pergunta
    document.getElementById("tempo").innerText = tempoRestante;

    const q = perguntasBoss[indiceAtual];
    document.getElementById("pergunta-texto").innerText = q.pergunta;

    const divOpcoes = document.getElementById("opcoes-jogo");
    divOpcoes.innerHTML = "";

    q.opcoes.forEach((op, idx) => {
        const btn = document.createElement("button");
        btn.className = "opcao-item";
        btn.style.textAlign = "center";
        btn.innerText = op;
        btn.onclick = () => verificarResposta(idx);
        divOpcoes.appendChild(btn);
    });

    // Inicia a contagem regressiva
    clearInterval(timerLoop);
    timerLoop = setInterval(() => {
        tempoRestante--;
        document.getElementById("tempo").innerText = tempoRestante;

        if (tempoRestante <= 0) {
            clearInterval(timerLoop);
            receberDanoJogador(25, "⏰ Tempo esgotado! O Boss atacou você!");
        }
    }, 1000);
}

function verificarResposta(opcaoEscolhida) {
    clearInterval(timerLoop);
    const q = perguntasBoss[indiceAtual];

    if (opcaoEscolhida === q.correta) {
        // Acertou: Dano no Boss!
        causarDanoBoss(25);
    } else {
        // Errou: Dano no Jogador!
        receberDanoJogador(20, "❌ Resposta errada! O Boss te deu um golpe!");
    }
}

function causarDanoBoss(quantidade) {
    hpBoss = Math.max(0, hpBoss - quantidade);
    document.getElementById("vida-boss").style.width = hpBoss + "%";

    const boxBoss = document.getElementById("box-boss");
    boxBoss.classList.add("dano");
    setTimeout(() => boxBoss.classList.remove("dano"), 300);

    if (hpBoss <= 0) {
        finalizarJogo(true);
    } else {
        proximaPergunta();
    }
}

function receberDanoJogador(quantidade, mensagem) {
    hpJogador = Math.max(0, hpJogador - quantidade);
    document.getElementById("vida-jogador").style.width = hpJogador + "%";

    const boxJogador = document.getElementById("box-jogador");
    boxJogador.classList.add("dano");
    setTimeout(() => boxJogador.classList.remove("dano"), 300);

    if (hpJogador <= 0) {
        finalizarJogo(false);
    } else {
        proximaPergunta();
    }
}

function proximaPergunta() {
    indiceAtual++;
    setTimeout(iniciarRodada, 500);
}

function finalizarJogo(vitoria) {
    clearInterval(timerLoop);
    document.getElementById("arena-perguntas").classList.add("hidden");
    document.querySelector(".timer-box").classList.add("hidden");
    document.getElementById("fim-jogo").classList.remove("hidden");

    if (vitoria) {
        document.getElementById("resultado-titulo").innerText = "🏆 VITÓRIA!";
        document.getElementById("resultado-subtitulo").innerText = "Você derrotou o Boss Megatron com seu conhecimento!";
        document.getElementById("resultado-titulo").style.color = "#2ed573";
    } else {
        document.getElementById("resultado-titulo").innerText = "☠️ DERROTA!";
        document.getElementById("resultado-subtitulo").innerText = "A IA dominou a partida. Estude mais e tente novamente!";
        document.getElementById("resultado-titulo").style.color = "#ff4757";
    }
}

function reiniciarJogo() {
    hpJogador = 100;
    hpBoss = 100;
    indiceAtual = 0;

    document.getElementById("vida-jogador").style.width = "100%";
    document.getElementById("vida-boss").style.width = "100%";

    document.getElementById("arena-perguntas").classList.remove("hidden");
    document.querySelector(".timer-box").classList.remove("hidden");
    document.getElementById("fim-jogo").classList.add("hidden");

    iniciarRodada();
}
