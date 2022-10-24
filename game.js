class Game {
    constructor() {
        this._config = new Config() //Считываем из конф файла настройки
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this._config.canvas.width
        this.canvas.heigth = this._config.canvas.height
        this.img = new Image();
        //this.img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";
        this.img.src = "http://localhost:63342/flap_bird/assets/sprite.png";
        this.field1 = this._config.field1
        this.field1.width = this._config.field1.width
        this.field1.height = this._config.field1.height
        this.field2 = this._config.field2
        this.field2.width = this._config.field2.width
        this.field2.height = this._config.field2.height

        // Общие настройки
        this.gamePlaying = false;
        this.gravity = .3;
        this.speed = 2.2;
        this.size = [33, 27]; //размеры птички
        this.jump = -8.5;
        this.cTenth = (this.canvas.width / 10);
        this.game = this
        this.index = 0
        this.bestScore = 0
        this.flight = 0
        this.flyHeight = 0
        this.currentScore = 0
        //this.pipe = 0
        // Настройки труб
        this.pipeWidth = 78; //ширина труб
        this.pipeGap = 50; //расстояние между трубами
        this.pipeLoc = () => (Math.random() * ((this.canvas.height - (this.pipeGap + this.pipeWidth)) - this.pipeWidth)) + this.pipeWidth;

        this._inputHandler = new MouseInputHandler({
            left: ({x, y}) => {
                this.drawEngine.gamePlaying = true
                this.drawEngine.flight = this.drawEngine.jump
                this.gamePlaying = true
                this.flight = this.jump
            }
        })
    }
    reset() {
        //Начальные настройки игры
        this.currentScore = 0;
        this.pipeWidth = 78;
        this.pipeGap = 270;
        // Установка начальной высоты полета - середина экрана
        this.flyHeight = (this.canvas.height / 2) - (this.size[1] / 2);

        // Установка первых трех труб
        this.pipes = Array(3).fill().map((a, i) => [this.canvas.width + (i * (this.pipeGap + this.pipeWidth)), this.pipeLoc()]);
    }

    draw() {
        //Отрисовка на канвасе
        this.drawEngine = new DrawEngine(this.game, this.index, this.img, this.canvas, this.speed, this.ctx, this.gamePlaying, this.pipes,
            this.pipeWidth, this.pipeGap, this.size, this.currentScore, this.bestScore, this.cTenth, this.flyHeight, this.flight,
            this.gravity, this.pipeLoc, this.jump, this.field1, this.field2, this.field1.width, this.field1.height, this.field2.width, this.field2.height)
        this.drawEngine.draw()
    }

    // launch setup
    start() {

        this.reset();
        this._inputHandler.subscribe()
        this.img.onload = this.draw();
    }

}