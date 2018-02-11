var levels = function(game){};

levels.prototype = {
  	create: function(){
  		//añadimos el fondo. El escalado es manual.
  		var background = this.game.add.image(-30,0,"background");
  		background.scale.set(0.56);
  		//tween to alpha para oscurecer gradualmente el fondo;
		this.game.add.tween(background).to( { alpha: 0.55 }, 1000, Phaser.Easing.Linear.None, true);
		//Headline: Hiscores
		this.showTitle();
		//botones de niveles
		this.showLevels();
		this.createButtons();
	},

	showTitle: function () {
		var levelTitleText = this.game.add.text(this.game.world.centerX,this.game.world.centerY-220, 'HiScores' , { font: "bold 52px/50px Arial", fill: "#FFFFFF", align: "center" });
		levelTitleText.stroke = "#4adbff"; //#00ccff
		levelTitleText.strokeThickness = 14;
		levelTitleText.setShadow(4, 3, "#02b1dd", 2, true, true);
		levelTitleText.anchor.set(0.5);
	},

	showLevels: function () {

	},

	createButtons: function () {
		//botones del centro (home y gear)
		var homeButton = this.game.add.button(this.game.world.centerX*0.75,this.game.world.centerY*1.83,"home",this.gameTitle,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);
		var gearButton = this.game.add.button(this.game.world.centerX*1.25,this.game.world.centerY*1.83,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);
	},

	gameTitle: function(){
		this.game.state.start("GameTitle");
	},
	
	optionsGame: function(){
		this.game.state.start("GameOptions");
	}
	
};