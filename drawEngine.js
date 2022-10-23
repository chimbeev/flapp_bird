class DrawEngine {
    constructor(game, index, img, canvas, speed, ctx, gamePlaying, pipes, pipeWidth, pipeGap, size, currentScore, bestScore,
                cTenth, flyHeight, flight, gravity, pipeLoc, jump ) {
        this.game = game
        this.index = index
        this.img = img
        this.canvas = canvas
        this.canvas.width = canvas.width
        this.canvas.height = canvas.height
        this.speed = speed
        this.ctx = ctx
        this.gamePlaying = gamePlaying
        this.pipes = pipes
        this.pipeWidth = pipeWidth
        this.pipeGap = pipeGap
        this.size = size
        this.currentScore = currentScore
        this.bestScore = bestScore
        this.cTenth = cTenth
        this.flyHeight = flyHeight
        this.flight = flight
        this.gravity = gravity
        this.pipeLoc = pipeLoc
        this.jump = jump
    }

    draw() {

        this.index++;

        // Отрисовка фона первая часть
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height, -((this.index * (this.speed / 2)) % this.canvas.width) + this.canvas.width, 0, this.canvas.width, this.canvas.height);
        // Отрисовка фона вторая часть
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height, -(this.index * (this.speed / 2)) % this.canvas.width, 0, this.canvas.width, this.canvas.height);

        // отрисовка труб
        if (this.gamePlaying) {
            this.pipes.map(pipe => {
                // Для движения трубы
                pipe[0] -= this.speed;

                // верхняя труба
                this.ctx.drawImage(this.img, 432, 588 - pipe[1], this.pipeWidth, pipe[1], pipe[0], 0, this.pipeWidth, pipe[1]);
                // нижняя труба
                this.ctx.drawImage(this.img, 432 + this.pipeWidth, 108, this.pipeWidth, this.canvas.height - pipe[1] + this.pipeGap, pipe[0], pipe[1] + this.pipeGap, this.pipeWidth, this.canvas.height - pipe[1] + this.pipeGap);

                // присудить 1 очко  и создать новую трубу
                if (pipe[0] <= -this.pipeWidth) {
                    this.currentScore++;
                    // проверить что это лучший результат
                    this.bestScore = Math.max(this.bestScore, this.currentScore);

                    // удалить и создать новую трубу
                    this.pipes = [...this.pipes.slice(1), [this.pipes[this.pipes.length - 1][0] + this.pipeGap + this.pipeWidth, this.pipeLoc()]];
                    console.log(this.pipes);
                }

                // Если столкновение с трубой конец игры
                if ([
                    pipe[0] <= this.cTenth + this.size[0],
                    pipe[0] + this.pipeWidth >= this.cTenth,
                    pipe[1] > this.flyHeight || pipe[1] + this.pipeGap < this.flyHeight + this.size[1]
                ].every(elem => elem)) {
                    this.gamePlaying = false;
                    this.currentScore = 0
                    this.game.reset();
                }
            })
        }
        //отрисовка птицы
        if (this.gamePlaying) {
            this.ctx.drawImage(this.img, 432, Math.floor((this.index % 9) / 3) * this.size[1], ...this.size, this.cTenth, this.flyHeight, ...this.size);
            this.flight += this.gravity;
            this.flyHeight = Math.min(this.flyHeight + this.flight, this.canvas.height - this.size[1]);
        } else { //рисовать птицу по центру
            this.ctx.drawImage(this.img, 432, Math.floor((this.index % 9) / 3) * this.size[1], ...this.size, ((this.canvas.width / 2) - this.size[0] / 2), this.flyHeight, ...this.size);
            this.flyHeight = (this.canvas.height / 2) - (this.size[1] / 2);
            // вывод текста
            this.ctx.fillText(`Best score : ${this.bestScore}`, 85, 245);
            this.ctx.fillText('Click to play', 90, 535);
            this.ctx.font = "bold 30px courier";
        }
        document.getElementById('bestScore').innerHTML = `Best : ${this.bestScore}`;
        document.getElementById('currentScore').innerHTML = `Current : ${this.currentScore}`;
        // Команда браузеру на отрисовку
        window.requestAnimationFrame(this.draw.bind(this));
    }
}