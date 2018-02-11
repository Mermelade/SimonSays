var gameTitle = function(game){};

gameTitle.prototype = {
  	create: function(){
  		// Setup background
  		var background = this.game.add.image(-30,0,"background");
  		background.scale.setTo(0.56,0.56);

		//Game Headline: Times Tables
		var gameTitleText = this.game.add.text(this.game.world.centerX,this.game.world.centerY-165, "Simon\nSays" , { font: "bold 64px/60px Arial", fill: "#FFFFFF", align: "center" });
		gameTitleText.stroke = "#4adbff"; //#00ccff
		gameTitleText.strokeThickness = 14;
		gameTitleText.setShadow(4, 3, "#02b1dd", 2, true, true);
		gameTitleText.anchor.set(0.5);
		
		//Game Main Start Button
		var centralButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY,"play",this.playTheRace,this,1,0,2);
		centralButton.anchor.setTo(0.5,0.5);
		centralButton.scale.set(0.75);
		this.game.add.tween(centralButton.scale).to ( { x: 1, y: 1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 500, 10, true);
		
		//Home Button
		var homeButton = this.game.add.button(this.game.world.centerX*0.75,this.game.world.centerY*1.83,"home",this.levels,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);

		//Gear Button
		var gearButton = this.game.add.button(this.game.world.centerX*1.25,this.game.world.centerY*1.83,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);

	},
	
	playTheMusic: function(){
		// Ponemos la música!
		//volumen = 0.1;
		//music = this.game.add.audio('paradise',volumen,true,true);
		//titleMusic.play();
		//music.loopFull();
		//music.loop = true;
	},
	
	playTheRace: function(){
		this.game.state.start("TheSimonGame");
	},
	
	levels: function(){
		this.game.state.start("Levels");
	},
	
	optionsGame: function(){
		this.game.state.start("GameOptions");
	},
	
	render: function() {
    	//this.game.debug.soundInfo(music, 20, 32);
	}
};