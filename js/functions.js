let engine = {
    cores: [
        "red",
        "blue",
        "green",
        "yellow",
        "black",
        "white",
        "pink",
        "purple",
        "orange",
        "brown",
        "gray",
        "beige",
        "gold",
        "silver",
        "violet",
    ],
    hexdecimais: {
        red: "#ff0000",
        blue: "#0000ff",
        green: "#008000",
        yellow: "#FFFF00",
        black: "#000000",
        white: "#FFFFFF",
        pink: "#FFC0CB",
        purple: "#800080",
        orange: "#FFA500",
        brown: "#A52A2A",
        gray: "#808080",
        beige: "#F5F5DC",
        gold: "#FFD700",
        silver: "#C0C0C0",
        violet: "#EE82EE",
    },
    moedas: 0,
};

const audioMoeda = new Audio("audio/moeda.mp3");
const audioErro = new Audio("audio/errou.mp3");

function sortearCor() {
    const indexCorSorteada = Math.floor(Math.random() * engine.cores.length);
    const legedaCorDaCaixa = document.getElementById("cor-na-caixa");
    const nomeCorSorteada = engine.cores[indexCorSorteada];

    legedaCorDaCaixa.innerHTML = nomeCorSorteada.toUpperCase();

    return engine.hexdecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor) {
    const caixaDasCores = document.getElementById("cor-atual");

    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url('./img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor) {
    const pontuacao = document.getElementById("pontuacao-atual");

    engine.moedas += valor;

    if (valor < 0) {
        audioErro.play();
    } else {
        audioMoeda.play();
    }
    pontuacao.innerHTML = engine.moedas;
}

aplicarCorNaCaixa(sortearCor());

const btnGravador = document.getElementById("btn-responder");
let transcricaoAudio = "";
let respostaCorreta = "";

let gravador;

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const SpeechAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    gravador = new SpeechAPI();

    gravador.continuous = false;
    gravador.lang = "en-US";

    gravador.onstart = function () {
        btnGravador.innerHTML = "Estou Ouvindo";
        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    };

    gravador.onend = function () {
        btnGravador.innerHTML = "RESPONDER";
        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    };

    gravador.onresult = function (event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById("cor-na-caixa").innerText.toUpperCase();
        if (transcricaoAudio === respostaCorreta) {
            atualizaPontuacao(1);
        } else {
            atualizaPontuacao(-1);
        }

        aplicarCorNaCaixa(sortearCor());
    };
} else {
    alert("Não tem suporte");
}

btnGravador.addEventListener("click", function () {
    gravador.start();
});
