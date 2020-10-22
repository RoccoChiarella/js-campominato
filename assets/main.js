function difficoltaGioco() {
    do {
        var scelta = parseInt(prompt("Difficoltà: 0 - Difficile , 1 - Medio , 2 - Facile"));
    } while (scelta != 0 && scelta != 1 && scelta != 2);
    return scelta;
}

function determinaLimite(numero) {
    var limite = 0;

    if (numero == 0) {
        limite = 100;
    } else if (numero == 1) {
        limite = 80;
    } else if (numero == 2) {
        limite = 50;
    }

    return limite;
}

function generaCampo(grandezzaCampo, limite, ...mineCampo) {
    var x = "";

    var k = 0;

    for (var i = 1; i <= limite; i++) {
        if (i == mineCampo[k]) {
            x += '<span class="mine"></span>';
            k++;
        } else {
            x += '<span class="vuoto"></span>';
        }
    }

    if (limite%100 == 0) {
        document.getElementById("campo").style.cssText = "grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px 50px 50px;";
    } else if (limite%80 == 0) {
        document.getElementById("campo").style.cssText = "grid-template-columns: 50px 50px 50px 50px 50px 50px 50px 50px;";
    } else if (limite%50 == 0) {
        document.getElementById("campo").style.cssText = "grid-template-columns: 50px 50px 50px 50px 50px;";
    }

    return x;
}

function isUnaMina(scelta, ...mine) {
    var controllo = false;

    if (mine.includes(scelta)) {
        controllo = true;
    }

    return controllo;
}

function numeroCasuale(maggiore, minore) {
    var numero = Math.floor(Math.random() * maggiore) + minore;

    return numero;
}

function pratoFiorito() {
    var sceltaDifficolta = difficoltaGioco();

    var limiteMaggiore = determinaLimite(sceltaDifficolta);

    var mine = [];

    for (var i = 0; mine.length != 16; i++) {
        var numeroMina = numeroCasuale(limiteMaggiore,1);

        if (mine.includes(numeroMina) == false) {
            mine.push(numeroMina);
        }
    }

    mine.sort(function(a, b){return a-b});

    console.log(mine);

    document.getElementById('campo').innerHTML = generaCampo(sceltaDifficolta, limiteMaggiore, ...mine);
    document.getElementById('secondo-bottone').innerHTML = '<button onclick="richiestaNumeri('+mine+')" class="bottone-richiesta">Gioca!</button>';
}

function richiestaNumeri(...mine) {
    var maxPoint = 3;

    var numeriUtente = [];

    var x = "";

    var isBombaTrovata = false;

    do {
        var sceltaUtente = parseInt(prompt("Inserisci un numero"));

        var isGameOver = isUnaMina(sceltaUtente, ...mine);

        if (isGameOver == true) {
            isBombaTrovata = true;
        } else if (numeriUtente.includes(sceltaUtente) == false) {
            numeriUtente.push(sceltaUtente);
        } else {
            alert("Duplicato!");
        }
    } while (isBombaTrovata == false && numeriUtente.length < maxPoint);

    if (numeriUtente.length == maxPoint) {
        document.getElementById('esito').innerHTML = "Hai vinto totalizzando "+ numeriUtente.length +" punti!";
    } else {
        document.getElementById('esito').innerHTML = "Hai perso, hai totalizzato "+ numeriUtente.length +" punti!";
    }
}
