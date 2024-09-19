const tela = document.querySelector('canvas');
const pincel = tela.getContext('2d');

let contador = document.querySelector('.contador');
const buttonCancelar = document.querySelector('.cancelar');

let facil = document.querySelector('.facil');
let medio = document.querySelector('.medio');
let dificil = document.querySelector('.dificil');


function ajustarCanvas() {
    tela.width = tela.offsetWidth;
    tela.height = tela.offsetHeight
    pincel.fillStyle = 'lightgray';
    pincel.fillRect(0, 0, tela.width, tela.height);
}

window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

let i = 0;
function exibeContador(evento) {
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;
    
    if((x > xAleatorio - raio) && (x < xAleatorio + raio) && (y > yAleatorio - raio) && (y < yAleatorio + raio)) {
        i += 1;
    } else {
        i -= 1;
    }

    if(i < 0) {
        i = 0;
    }

    contador.textContent = i > 0 ? `${i}` : '0';
}

buttonCancelar.addEventListener('click', function() {
    if(i <= 0){
        alert('Nenum ponto para zerar, vamos jogar!');
    } else{
        alert('Sua pontuação foi zerada!');
        i = 0;
        contador.textContent = '0';
        window.location.reload();
    }
})

let raio = 10;
let xAleatorio;
let yAleatorio;

function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function limpaTela() {
    pincel.clearRect(0, 0, tela.width, tela.height);
}

function desenhaAlvo(x, y) {
    desenhaCirculo(x, y, raio+20, 'red');
    desenhaCirculo(x, y, raio+10, 'white');
    desenhaCirculo(x, y, raio, 'red');
}

function sortearPosicao(maximo) {
    return Math.floor(Math.random() * maximo)
}

function atualizaTela() {
    limpaTela();
    xAleatorio = sortearPosicao(tela.width);
    yAleatorio = sortearPosicao(tela.height);
    desenhaAlvo(xAleatorio, yAleatorio);
}

let intervalo;

facil.addEventListener('click', function() {
    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, 2500);
    medio.style.backgroundColor= 'rgb(255, 111, 0)';
    dificil.style.backgroundColor= 'rgb(255, 111, 0)';

    facil.style.backgroundColor= 'green';
})


medio.addEventListener('click', function() {
    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, 1200);
    facil.style.backgroundColor= 'rgb(255, 111, 0)';
    dificil.style.backgroundColor= 'rgb(255, 111, 0)';

    medio.style.backgroundColor= 'rgb(211, 183, 0)';
})

dificil.addEventListener('click', function() {
    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, 800);
    facil.style.backgroundColor= 'rgb(255, 111, 0)';
    medio.style.backgroundColor= 'rgb(255, 111, 0)';

    dificil.style.backgroundColor= 'red';
})



tela.addEventListener('click', function(evento) {
    exibeContador(evento);
})