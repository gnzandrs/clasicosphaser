var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloqueJuego');

juego.state.add('Menu', Menu);
juego.state.add('Juego', Juego);
juego.state.add('GameOver', GameOver);

juego.state.start('Menu');

