var levelComplete = function(game){};

levelComplete.prototype = {
  	create: function(){
  		//añadimos el fondo. El escalado es manual.
  		var background = this.game.add.image(0,0,"background");
  		background.scale.set(0.56);
  		background.tint = 0xc1c1c1;
		
		//mostramos la imagen y el ribbon
  		var level_end = this.game.add.image(this.game.world.centerX+5,this.game.world.centerY,"level_end");
  		level_end.anchor.set(0.5);
  		level_end.scale.set(0.95);  
    	var red_ribbon = this.game.add.image(this.game.world.centerX+5,85,"red_ribbon");
  		red_ribbon.anchor.set(0.5);
  		red_ribbon.scale.set(1);  

  		// mostramos level
  		var levelText = this.game.add.text(this.game.world.centerX+5,60, "Level "+level, { font: "bold 30px Arial", fill: "#FFFFFF", align: "center" });
  		levelText.anchor.set(0.5);

 		
  		//stars
  		if (score > 2) {
			var bigstar1 = this.game.add.image(this.game.world.centerX-79,this.game.world.centerY-70,"bigstar");
			bigstar1.anchor.set(0.5);
			bigstar1.scale.set (0);
			this.game.add.tween(bigstar1.scale).to( { x: 0.38, y: 0.38 }, 500, Phaser.Easing.Bounce.Out.None, true);
			this.game.add.tween(bigstar1).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true);
			// record level - como el array empieza en 0 y level en 1, el nivel actual es padlock[level-1] 
			if (padlock_levels[level-1] == "button_0stars") padlock_levels[level-1] = "button_1star";
			// unlocked next level - como el array empieza en 0, el siguiente nivel es padlock[level] 
			padlock_levels[level] = "button_0stars";
			if (score > 4) {
				var bigstar2 = this.game.add.image(this.game.world.centerX-1,this.game.world.centerY-97,"bigstar");
				bigstar2.anchor.set(0.5);
				bigstar2.scale.set (0);
				this.game.add.tween(bigstar2.scale).to( { x: 0.5, y: 0.5 }, 500, Phaser.Easing.Elastic.None, true, 500);
				this.game.add.tween(bigstar2).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true,500);
				if (padlock_levels[level-1] == "button_0stars" || padlock_levels[level-1] == "button_1star") padlock_levels[level-1] = "button_2stars";
				if (score > 7) {
					var bigstar3 = this.game.add.image(this.game.world.centerX+77,this.game.world.centerY-70,"bigstar");
					bigstar3.anchor.set(0.5);
					bigstar3.scale.set (0);
					this.game.add.tween(bigstar3.scale).to( { x: 0.38, y: 0.38 }, 500, Phaser.Easing.Elastic.None, true, 1000);
					this.game.add.tween(bigstar3).to( { angle: 360 }, 500, Phaser.Easing.Linear.None, true,1000);
					if (padlock_levels[level-1] == "button_0stars" || padlock_levels[level-1] == "button_1star" || padlock_levels[level-1] == "button_2stars") padlock_levels[level-1] = "button_3stars";
				}
			}
  		}
  		
  		// mostramos score
  		var moneyText = this.game.add.text(this.game.world.centerX-25,this.game.world.centerY+10, money, { font: "bold 40px Arial", fill: "#FFFFFF", align: "center" });
  		moneyText.anchor.set(0.5);
  		var totalMoneyText = this.game.add.text(this.game.world.centerX+60,this.game.world.centerY+15, totalMoney, { font: "bold 20px Arial", fill: "#FFFFFF", align: "center" });
  		totalMoneyText.anchor.set(0.5);
  		var scoreText = this.game.add.text(this.game.world.centerX,this.game.world.centerY+75, score, { font: "bold 45px Arial", fill: "#FFFFFF", align: "center" });
  		scoreText.anchor.set(0.5);
  		var totalScoreText = this.game.add.text(this.game.world.centerX+40,this.game.world.centerY+80, totalScore, { font: "bold 25px Arial", fill: "#FFFFFF", align: "center" });
  		totalScoreText.anchor.set(0.5);

 		
		// mostramos botones
		var replayButton = this.game.add.button(this.game.world.centerX*0.4,this.game.world.centerY*1.65,"replay",this.replayTheRace,this,1,0,2);
		replayButton.anchor.setTo(0.5,0.5);
		replayButton.scale.set(1);
		//bloqueamos el boton hasta que finaliza el tween y aparece del todo
		replayButton.inputEnabled = false;
		replayButton.alpha = 0;
		var replayButtonComes = this.game.add.tween(replayButton).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true,1000);
		replayButtonComes.onComplete.add(this.unlockButton, this);

		var homeButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY*1.65,"home",this.titleGame,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(1);
		homeButton.inputEnabled = false;
		homeButton.alpha = 0;
		var homeButtonComes = this.game.add.tween(homeButton).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true,1000);
		homeButtonComes.onComplete.add(this.unlockButton, this);
		
		if (score > 2) {
			var playButton = this.game.add.button(this.game.world.centerX*1.6,this.game.world.centerY*1.65,"play",this.playTheRace,this,1,0,2);
		} else {
			playButton = this.game.add.image(this.game.world.centerX*1.6,this.game.world.centerY*1.65,"play",3);

		}
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.set(1);
		playButton.inputEnabled = false;
		playButton.alpha = 0;
		var playButtonComes = this.game.add.tween(playButton).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true,1000);
		playButtonComes.onComplete.add(this.unlockButton, this);
	},
	
	unlockButton: function(button){
		button.inputEnabled = true;
	},
	
	replayTheRace: function(){
		this.game.state.start("TheSimonGame");
	},
	titleGame: function(){
		this.game.state.start("Levels");
	},
	playTheRace: function(){
		level ++;
		this.game.state.start("NewLevel");
	},
}