var gameOver = function(game){};

gameOver.prototype = {
  	create: function(){
  		//añadimos el fondo. El escalado es manual.
  		var background = this.game.add.image(0,0,"background");
  		background.scale.set(0.56);
  		background.tint = 0xc1c1c1;
 		
  		//stars
  		if (score > topScore/3) {
			var bigstar1 = this.game.add.image(this.game.world.centerX-79,this.game.world.centerY,"bigstar");
			bigstar1.anchor.set(0.5);
			bigstar1.scale.set (0);
			this.game.add.tween(bigstar1.scale).to( { x: 0.38, y: 0.38 }, 500, Phaser.Easing.Bounce.Out.None, true);
			this.game.add.tween(bigstar1).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true);
			if (score > topScore*2/3) {
				var bigstar2 = this.game.add.image(this.game.world.centerX-1,this.game.world.centerY-27,"bigstar");
				bigstar2.anchor.set(0.5);
				bigstar2.scale.set (0);
				this.game.add.tween(bigstar2.scale).to( { x: 0.5, y: 0.5 }, 500, Phaser.Easing.Elastic.None, true, 500);
				this.game.add.tween(bigstar2).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true,500);
				if (score > topScore) {
					var bigstar3 = this.game.add.image(this.game.world.centerX+77,this.game.world.centerY,"bigstar");
					bigstar3.anchor.set(0.5);
					bigstar3.scale.set (0);
					this.game.add.tween(bigstar3.scale).to( { x: 0.38, y: 0.38 }, 500, Phaser.Easing.Elastic.None, true, 1000);
					this.game.add.tween(bigstar3).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true,1000);
				}
			}
  		}
  		
		//mostramos score
		var yourScore = "You scored: "+ score;
		if (score>topScore) yourScore += "\nNew HiScore!!";
		else yourScore += "\nBest: "+topScore;
		var scoreText = this.game.add.text(160,160, yourScore, { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
		scoreText.anchor.set(0.5);

		// mostramos botones
		var replayButton = this.game.add.button(this.game.world.centerX/2,this.game.world.centerY*1.65,"replay",this.replayTheRace,this,1,0,2);
		replayButton.anchor.setTo(0.5,0.5);
		replayButton.scale.set(1);
		//bloqueamos el boton hasta que finaliza el tween y aparece del todo
		replayButton.inputEnabled = false;
		replayButton.alpha = 0;
		var replayButtonComes = this.game.add.tween(replayButton).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true,1000);
		replayButtonComes.onComplete.add(this.unlockButton, this);

		var homeButton = this.game.add.button(this.game.world.centerX*1.5,this.game.world.centerY*1.65,"home",this.titleGame,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(1);
		homeButton.inputEnabled = false;
		homeButton.alpha = 0;
		var homeButtonComes = this.game.add.tween(homeButton).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true,1000);
		homeButtonComes.onComplete.add(this.unlockButton, this);
		
	},
	
	unlockButton: function(button){
		button.inputEnabled = true;
	},
	
	replayTheRace: function(){
		this.game.state.start("TheSimonGame");
	},
	titleGame: function(){
		this.game.state.start("GameTitle");
	}
};