var preload = function(game){};

preload.prototype = {
	preload: function(){ 
		// show background image
		var background = this.game.add.image(-375,0,"background");
  		background.scale.setTo(0.56,0.56);

		// show loadingbar
        var loadingBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY*1.8,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        loadingBar.scale.setTo(2,2);
        this.load.setPreloadSprite(loadingBar);

		// load images
		this.game.load.image("bigstar","assets/bigstar.png");

		// load sprites
		this.game.load.spritesheet("settings","assets/settings.png",91,95);
		this.game.load.spritesheet("play","assets/play.png",91,95);
		this.game.load.spritesheet("replay","assets/replay.png",91,95);
		this.game.load.spritesheet("home","assets/home.png",91,95);

		// load audio
		this.game.load.audio("sound1",[ "assets/sounds_01.mp3", "assets/sounds_01.ogg" ]);
		this.game.load.audio("sound2",[ "assets/sounds_02.mp3", "assets/sounds_02.ogg" ]);
		this.game.load.audio("sound3",[ "assets/sounds_03.mp3", "assets/sounds_03.ogg" ]);
		this.game.load.audio("sound4",[ "assets/sounds_04.mp3", "assets/sounds_04.ogg" ]);
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
};