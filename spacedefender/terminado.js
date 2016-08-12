var Terminado  = {
  create: function () {
    juego.stage.backgroundColor = '#990000';
    juego.add.text(150, 250, "GAME OVER", {font: "14px Arial", fill: "#FFF"});

    if (confirm("Desea reiniciar el juego?"))
    {
      juego.state.start('Juego');
    }
  }
};