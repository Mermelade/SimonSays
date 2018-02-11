var gameOptions = function(game){};

gameOptions.prototype = {
  	create: function(game){
  		var background = this.game.add.image(-30,0,"background");
  		background.scale.setTo(0.56,0.56);
  		//tween to alpha para oscurecer gradualmente el fondo;
		this.game.add.tween(background).to( { alpha: 0.55 }, 1000, Phaser.Easing.Linear.None, true);

		var homeButton = this.game.add.button(this.game.world.centerX*0.75,this.game.world.centerY*1.83,"home",this.levels,this,1,0,2);
		homeButton.anchor.setTo(0.5,0.5);
		homeButton.scale.set(0.75);

		var gearButton = this.game.add.button(this.game.world.centerX*1.25,this.game.world.centerY*1.83,"settings",this.optionsGame,this,1,0,2);
		gearButton.anchor.setTo(0.5,0.5);
		gearButton.scale.set(0.75);

	},

	levels: function(){
		this.game.state.start("Levels");
	},

	optionsGame: function(){
		this.game.state.start("GameTitle");
	},

	render: function () {
	}
	
};

