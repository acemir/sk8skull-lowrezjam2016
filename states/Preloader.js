Sk8Skull.Preloader = function(game) {
    this.ready = false;
};

Sk8Skull.Preloader.prototype = {

    preload: function() {

        this.loadingBar = new Sk8Skull.LoadingBar(this.game);
        this.load.setPreloadSprite(this.loadingBar.bar);
        this.loadingBar.bar.anchor.setTo(0.5, 0.5);

        // this.load.onLoadComplete.add(this.loadComplete, this);
        this.load.image('acemir', 'images/acemir.png');
        this.load.spritesheet('loader', 'images/loader.png', 13, 13, 4);
        this.load.audio('music', ['media/music.ogg', 'media/music.mp3']);
        this.load.audio('jump', ['media/jump.ogg', 'media/jump.mp3']);
        this.load.audio('die', ['media/die.ogg', 'media/die.mp3']);
        this.load.bitmapFont('carrier_command', 'images/carrier_command.png', 'images/carrier_command.xml');
        this.load.image('bg_0', 'images/bg_0.png');
        this.load.image('bg_1', 'images/bg_1.png');
        this.load.image('bg_2', 'images/bg_2.png');
        this.load.image('title_0', 'images/title_0.png');
        this.load.image('title_1', 'images/title_1.png');
        this.load.image('ground', 'images/ground.png');
        this.load.image('spike', 'images/spike.png');
        this.load.spritesheet('skull', 'images/skull.png', 25, 25);
    },

    create: function() {
        Sk8Skull.pixel.canvas.style['visibility'] = 'visible';
        this.game.stage.backgroundColor = '#4d533c';
        this.loadingBar.bar.cropEnabled = false;
        this.logoSprt = this.add.sprite(32,31,'acemir');
        this.logoSprt.anchor.setTo(0.5, 0.5);
        this.loaderSprt = this.add.sprite(32,72,'loader');
        this.loaderSprt.anchor.setTo(0.5, 0.5);
        this.loaderSprt.animations.add('loader' );
        this.loaderSprt.animations.play('loader', 12, true);

        this.add.tween(this.logoSprt).to({y: 25}, 120, Phaser.Easing.Quadratic.InOut, true );
        this.add.tween(this.loaderSprt).to({y: 46}, 120, Phaser.Easing.Quadratic.InOut, true);
    },

    update: function() {
        if (this.cache.isSoundDecoded('music') && this.ready === false) {
           this.loadComplete();
       }
    },

    render: function() {
        Sk8Skull.scaleDraw.call(this);
    },

    loadComplete: function() {
       this.ready = true;
       Sk8Skull.MUSIC = this.add.audio('music',.1,true);
       Sk8Skull.JUMP = this.add.audio('jump',.3,false);
       Sk8Skull.DIE = this.add.audio('die',.2,false);
       this.startGame();
       // this.state.start('Game');
    },

    startGame: function(){
        this.add.tween(this.logoSprt).to({y: -32}, 360, Phaser.Easing.Quadratic.Out, true);
        this.add.tween(this.loaderSprt.scale).to({x: 0, y: 0}, 480, Phaser.Easing.Exponential.Out, true).onComplete.add(function(){
            this.state.start('Game');
        }, this);
    }

};
