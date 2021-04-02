const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const sprites = new Image();
sprites.src = './src/sprite.png';

let frames = 0;
let chaoBase = 345;

function drawImageRot(img, spriteX, spriteY, spriteLargura, spriteAltura, x, y, width, height, deg) {
    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img, spriteX, spriteY, spriteLargura, spriteAltura, width / 2 * (-1), height / 2 * (-1), width, height);

    // Restore canvas state as saved from above
    ctx.restore();
}

const batata = {
    spriteX: 0,
    spriteY: 0,
    largura: 100,
    altura: 148,
    x: 0,
    y: 10,
    desenhar() {
        ctx.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            (this.largura * 0.4), (this.altura * 0.4),
        );
    },
};

const bigTasty = {
    spriteX: 100,
    spriteY: 0,
    largura: 100,
    altura: 70,
    x: 50,
    y: 10,
    desenhar() {
        ctx.drawImage(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            (this.largura * 0.6), (this.altura * 0.6),
        );
    },
};

const coracao = {
    spriteX: 200,
    spriteY: 0,
    largura: 100,
    altura: 82,
    chaoBase: 430 - 82 * 0.5,
    rotacao: 0,
    x: 120,
    y: 10,
    handleGravidade() {
        let velocidade = 1.5;
        this.y = this.y + velocidade;

        if (this.y >= this.chaoBase) {
            this.y = this.chaoBase;
        } else {
            this.y = this.y + velocidade;
        }
    },
    atualizaFrame() {
        this.handleGravidade();
    },
    desenhar() {
        this.atualizaFrame();
        this.rotacao += 1

        console.log(`(${this.x}, ${this.y})`);

        drawImageRot(
            sprites,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            (this.largura * 0.5), (this.altura * 0.5),
            this.rotacao
        );
    },
};

const planoDeFundo = {
    spriteX: 0,
    spriteY: 148,
    largura: 433,
    altura: 258,
    x: 0,
    y: canvas.height - 258,
    mover(velocidade = 1) {
        const movimentacao = planoDeFundo.x + velocidade;

        planoDeFundo.x = movimentacao;
        planoDeFundo.x = movimentacao % planoDeFundo.largura;
    },
    desenhar() {
        ctx.fillStyle = '#70c5ce';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x - planoDeFundo.largura, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
        ctx.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
        ctx.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
};

const pachequito = {
    spriteX: 434,
    spriteY: 0,
    largura: 125,
    altura: 170,
    x: 100,
    y: chaoBase,
    frameAtual: 0,
    countFramesPiscada: 0,
    velocidadeX: 0,
    velocidadeY: 0,
    countFramesAcelerando: 0,
    countFramesPulando: 0,
    sentidoAndando: false,
    movimentos: [
        { spriteX: 434, spriteY: 0, },
        { spriteX: 434, spriteY: 170 }
    ],
    desenhar() {
        this.atualizaFrame();
        const { spriteX, spriteY } = this.movimentos[this.frameAtual];

        ctx.drawImage(
            sprites,
            spriteX, spriteY,
            this.largura, this.altura,
            this.x, this.y,
            (this.largura * 0.5), (this.altura * 0.5)
        );
    },
    handlePiscar() {
        this.countFramesPiscada++;
        if (this.countFramesPiscada == 1) {
            this.frameAtual = 1;
        }
        else if (this.countFramesPiscada == 10) {
            this.frameAtual = 0;
        }
        else if (this.countFramesPiscada == 20) {
            this.frameAtual = 1;
        }
        else if (this.countFramesPiscada == 30) {
            this.frameAtual = 0;
        }
        else if (this.countFramesPiscada == 90) {
            this.countFramesPiscada = 0;
        }
    },
    atualizaFrame() {
        this.handlePiscar();
        this.handleAndar();
        this.handleGravidade();
    },
    mudarSentido(novoSentido) {
        if (this.sentidoAndando != novoSentido) {
            this.sentidoAndando = novoSentido;
            this.countFramesAcelerando = 0;
        }
    },
    pular() {
        if (this.y == chaoBase) {
            this.countFramesPulando = 0;
            this.velocidadeY = -4;
        }

    },
    handleGravidade() {
        const gravidade = 0.02;
        this.countFramesPulando++;
        this.velocidadeY = this.velocidadeY + gravidade * this.countFramesPulando;
        this.y = this.y + this.velocidadeY;

        if (this.y >= chaoBase) {
            this.y = chaoBase;
            this.velocidadeY = 0;
        } else {
            this.y = this.y + this.velocidadeY;
        }
    },
    handleAndar() {
        let aceleracao = 0.01;
        const speedLimit = 5;

        let fator;
        if (this.sentidoAndando == "Direita") fator = 1;
        else if (this.sentidoAndando == "Esquerda") fator = -1;
        else {
            if (this.velocidadeX > 0) {
                fator = -1;
                aceleracao = 0.01;
            }
            else if (this.velocidadeX < 0) {
                fator = 1;
                aceleracao = 0.01;
            }
            else fator = 0;
        }

        this.velocidadeX = this.velocidadeX + aceleracao * this.countFramesAcelerando * fator;

        if (!this.sentidoAndando) {
            if ((this.velocidadeX < 0 && fator < 0) || (this.velocidadeX > 0 && fator > 0)) {
                this.velocidadeX = 0;
            }
        }

        if (Math.abs(this.velocidadeX) > speedLimit) {
            this.velocidadeX = speedLimit * fator;
        }

        this.countFramesAcelerando++;

        if (this.velocidadeX > 0) { //Direita
            //Aplicar posição
            const colisao = this.x >= (canvas.width - (this.largura - 50));
            if (!colisao) {
                this.x = this.x + this.velocidadeX;
                planoDeFundo.mover(-2);
            }
            else {
                this.velocidadeX = 0;
                this.x -= 1;
                planoDeFundo.mover(1);
            }
        }
        else if (this.velocidadeX < 0) { //Esquerda
            //Aplicar posição
            const colisao = this.x <= 0;
            if (!colisao) {
                this.x = this.x + this.velocidadeX;
                planoDeFundo.mover(2);
            }
            else {
                this.velocidadeX = 0;
                this.x += 1;
                planoDeFundo.mover(-1);
            }
        }
    }
}

window.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowRight') {
        pachequito.mudarSentido("Direita");
    }
    else if (ev.key === 'ArrowLeft') {
        pachequito.mudarSentido("Esquerda");
    }
    else if (ev.key === 'ArrowUp') {
        pachequito.pular();
    }
});

window.addEventListener('keyup', function (ev) {
    if (ev.key === 'ArrowRight') {
        pachequito.mudarSentido(false);
    }
    else if (ev.key === 'ArrowLeft') {
        pachequito.mudarSentido(false);
    }
});

function loadGame() {
    planoDeFundo.desenhar();
    pachequito.desenhar();
    batata.desenhar();
    bigTasty.desenhar();
    coracao.desenhar();

    // setTimeout(() => requestAnimationFrame(loadGame), 1000);
    requestAnimationFrame(loadGame);
    frames += 1;
}

loadGame();