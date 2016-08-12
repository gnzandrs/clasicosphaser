var nave, balas, malos, timer, puntos, txtPuntos, vidas, txtVidas;
var tiempoEntreBalas = 400;
var tiempo = 0;

var Juego  = {
  preload: function () {
    juego.load.image('bg', 'img/bg.png');
    juego.load.image('malo', 'img/malo.png');
    juego.load.image('nave', 'img/nave.png');
    juego.load.image('laser', 'img/laser.png');
  },

  create: function () {
    juego.add.tileSprite(0,0,400,540,'bg');

    juego.physics.startSystem(Phaser.Physics.ARCADE);

    nave = juego.add.sprite(juego.width/2, 490, 'nave');
    nave.anchor.setTo(0.5);
    juego.physics.arcade.enable(nave);

    balas = juego.add.group();
    balas.enableBody = true;
    balas.setBodyType = Phaser.Physics.ARCADE;
    balas.createMultiple(30, 'laser');
    balas.setAll('anchor.x', 0.5);
    balas.setAll('anchor.y', 0.5);
    balas.setAll('checkWorldBounds', true);
    balas.setAll('outOfBoundsKill', true);

    malos = juego.add.group();
    malos.enableBody = true;
    malos.setBodyType = Phaser.Physics.ARCADE;
    malos.createMultiple(20, 'malo');
    malos.setAll('anchor.x', 0.5);
    malos.setAll('anchor.y', 0.5);
    malos.setAll('checkWorldBounds', true);
    malos.setAll('outOfBoundsKill', true);

    timer = juego.time.events.loop(2000, this.crearEnemigo, this);

    puntos = 0;
    juego.add.text(20, 20, "Puntos: ", {font: "14px Arial", fill: "#FFF"});
    txtPuntos = juego.add.text(80, 20, "0", {font: "14px Arial", fill: "#FFF"});

    vidas = 3;
    juego.add.text(310, 20, "Vidas: ", {font: "14px Arial", fill: "#FFF"});
    txtVidas = juego.add.text(360, 20, "3", {font: "14px Arial", fill: "#FFF"});
  },

  update: function () {
    nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI/2;

    if (juego.input.activePointer.isDown)
    {
      this.disparar();
    }

    juego.physics.arcade.overlap(balas, malos, this.colision, null, this);
    malos.forEachAlive(function (m) {
      if (m.position.y > 520 && m.position.y < 521)
      {
        m.kill();
        vidas--;
        txtVidas.text = vidas;
      }
    });

    if (vidas == 0) 
    {
      juego.state.start('Terminado');
    }
  },

  disparar: function () {
    if (juego.time.now > tiempo && balas.countDead() > 0)
    {
      tiempo = juego.time.now + tiempoEntreBalas;
      var bala = balas.getFirstDead();
      bala.anchor.setTo(0.5);
      bala.reset(nave.x, nave.y);
      bala.rotation = juego.physics.arcade.angleToPointer(bala) + Math.PI/2;
      juego.physics.arcade.moveToPointer(bala, 200);
    }
  },

  crearEnemigo: function () {
    var enem = malos.getFirstDead();
    var num = Math.floor(Math.random()*10)+1;
    enem.reset(num*39, 0);
    enem.anchor.setTo(0.5);
    enem.body.velocity.y = 100;
    enem.checkWorldBounds = true;
    enem.outOfBoundsKill = true;
  },

  colision: function (b, m) {
    b.kill();
    m.kill();
    puntos++;
    txtPuntos.text = puntos;
  }
};