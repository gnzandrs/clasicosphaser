var fondo, carro, cursores, enemigos, gasolinas, timer, timerGasolina, puntos, txtPuntaje;

var Juego = {
  preload: function () {
    juego.load.image('bg', 'img/bg.png');
    juego.load.image('carro', 'img/carro.png');
    juego.load.image('carroMalo', 'img/carroMalo.png');
    juego.load.image('gas', 'img/gas.png');
  },

  create: function () {
    puntos = 0;
    fondo = juego.add.tileSprite(0,0,290,540,'bg');
    carro = juego.add.sprite(juego.width/2, 490, 'carro');
    carro.anchor.setTo(0.5);
    carro.enableBody = true;
    juego.physics.arcade.enable(carro);

    gasolinas = juego.add.group();
    juego.physics.arcade.enable(gasolinas);
    gasolinas.enableBody = true;
    gasolinas.createMultiple(20, 'gas');
    gasolinas.setAll('anchor.x', 0.5);
    gasolinas.setAll('anchor.y', 0.5);
    gasolinas.setAll('checkWorldBounds', true);
    gasolinas.setAll('outOfBoundsKill', true);

    enemigos = juego.add.group();
    juego.physics.arcade.enable(enemigos);
    enemigos.enableBody = true;
    enemigos.createMultiple(20, 'carroMalo');
    enemigos.setAll('anchor.x', 0.5);
    enemigos.setAll('anchor.y', 0.5);
    enemigos.setAll('checkWorldBounds', true);
    enemigos.setAll('outOfBoundsKill', true);

    timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
    timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);

    txtPuntaje = juego.add.text(60, 20, "0", { font:"30px Arial Bold", fill: "#990000" });

    cursores = juego.input.keyboard.createCursorKeys();
  },

  update: function () {
    fondo.tilePosition.y += 2;

    if (cursores.right.isDown &&  carro.position.x < 245)
    {
      carro.position.x += 5;
    }
    else if (cursores.left.isDown && carro.position.x > 45)
    {
      carro.position.x -= 5;
    }

    juego.physics.arcade.overlap(carro, enemigos, this.choque, null, this);
    juego.physics.arcade.overlap(carro, gasolinas, this.cogerGas, null, this);

    if (puntos > 4 && puntos <= 10) {
      timer.delay = 1250;
    }
    else if ( puntos > 10 )
    {
      timer.delay = 1000;
    }
    else if (puntos > 15) {
      timer.delay = 750
    }
  },

  crearCarroMalo: function () {
    var pos = Math.floor(Math.random()*3) + 1;
    var enemigo = enemigos.getFirstDead();
    enemigo.physicsBodyType = Phaser.Physics.ARCADE;
    enemigo.reset(pos*73, 0);
    enemigo.body.velocity.y = 200;
  },
  
  crearGasolina: function () {
    var pos = Math.floor(Math.random()*3) + 1;
    var gasolina = gasolinas.getFirstDead();
    gasolina.physicsBodyType = Phaser.Physics.ARCADE;
    gasolina.reset(pos*73, 0);
    gasolina.body.velocity.y = 100;
  },

  choque: function () {
    enemigos.forEachAlive(function (e) {
      e.body.velocity.y = 0;
    });

    juego.time.events.remove(timer);
    juego.state.start('Terminado');
  },

  cogerGas: function (car, gas) {
    gas.kill();
    puntos++;
    txtPuntaje.text = puntos;
  }
};