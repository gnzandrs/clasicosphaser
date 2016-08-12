var juego = new Phaser.Game(400, 540, Phaser.CANVAS, 'juego');

juego.state.add('Juego', Juego);
juego.state.add('Terminado', Terminado);

juego.state.start('Juego');