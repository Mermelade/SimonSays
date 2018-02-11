var score;
var topScore;
var simon = true;
var simonSequence = new Array();
var samSequence = new Array();
var i=0;
var j=0;
var scoreText;
var whiteTexture;
var fullTexture;
var redSprite;
var greenSprite;
var blueSprite;
var yellowSprite;
var redsound;
var greensound;
var bluesound;
var yellowsound;


var theSimonGame = function(game){};

theSimonGame.prototype = {
  	create: function(game){
  		
  		// create background
  		var bckgnd = this.game.stage;
  		bckgnd.backgroundColor = '#000000';

  		// score and topScore init
  		score = 0;
  		topScore = localStorage.getItem("topTablesScore")==null?0:localStorage.getItem("topTablesScore");
		i=0;

		// create rectangle graphic and texture white alpha 55%
		var whiteSquare = game.add.graphics(0, 0);
		whiteSquare.beginFill(0xFFFFFF, 0.50);
    	whiteSquare.drawRect(0, 0, game.world.centerX, game.world.centerY);
		whiteSquare.endFill();
		whiteSquare.visible=false;
		whiteTexture = whiteSquare.generateTexture();
		// create rectangle graphic and texture white alpha 85%
		var fullSquare = game.add.graphics(0, 0);
		fullSquare.beginFill(0xFFFFFF, 1);
    	fullSquare.drawRect(0, 0, game.world.centerX, game.world.centerY);
		fullSquare.endFill();
		fullSquare.visible=false;
		fullTexture = fullSquare.generateTexture();
		// create the buttons as sprites
		redSprite = game.add.sprite(-10, -10, whiteTexture);
		redSprite.tint = 0xFF0000;
		redSprite.valor = 1;
		redSprite.inputEnabled = true;
		redSprite.events.onInputDown.add(this.clicked, this);
		greenSprite = game.add.sprite(game.world.centerX-10, -10, whiteTexture);
		greenSprite.tint = 0x00FF00;
		greenSprite.valor = 2;
		greenSprite.inputEnabled = true;
		greenSprite.events.onInputDown.add(this.clicked, this);
		blueSprite = game.add.sprite(-10, game.world.centerY-10, whiteTexture);
		blueSprite.tint = 0x0000FF;
		blueSprite.valor = 3;
		blueSprite.inputEnabled = true;
		blueSprite.events.onInputDown.add(this.clicked, this);
		yellowSprite = game.add.sprite(game.world.centerX-10, game.world.centerY-10, whiteTexture);
		yellowSprite.tint = 0xFFFF00;
		yellowSprite.valor = 4;
		yellowSprite.inputEnabled = true;
		yellowSprite.events.onInputDown.add(this.clicked, this);

  		scoreText = game.add.text(game.world.centerX, game.world.centerY,score, { font: "bold 225px Arial", fill: "#C1C1C1", align: "center" });
  		scoreText.anchor.set(0.5);

		redsound = this.game.add.audio('sound1');
		redsound.addMarker('redsound0', 0.05, 0.10);
		greensound = this.game.add.audio('sound2');
		greensound.addMarker('greensound0', 0.05, 0.10);
		bluesound = this.game.add.audio('sound3');
		bluesound.addMarker('bluesound0', 0.05, 0.10);
		yellowsound = this.game.add.audio('sound4');
		yellowsound.addMarker('yellowsound0', 0.05, 0.10);

		// Setup
		simonSequence = [];
		samSequence = [];
		simon=true;
		
		// get and play it Simon
		this.getItSimon();

	},

	whosplaying: function(){
		if (simon) {
			score ++;
			scoreText.text = score;
			this.playItSimon();
		} else {
			this.playItSam();
		}
	},

	clicked: function(button){
		button.loadTexture(fullTexture);
		samSequence[i]=button.valor;

		if (simonSequence[i] == samSequence[i]) {
			if (button == redSprite) {
				this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.redSpriteUp, this);
				redsound.play('redsound0');
			} else if (button == greenSprite) {
				this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.greenSpriteUp, this);
				greensound.play('greensound0');
			} else if (button == blueSprite) {
				this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.blueSpriteUp, this);
				bluesound.play('bluesound0');
			} else if (button == yellowSprite) {
				this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.yellowSpriteUp, this);
				yellowsound.play('yellowsound0');
			}
			if (i < simonSequence.length-1) {
				i++;
			} else {
				this.game.time.events.add(Phaser.Timer.SECOND * 0.75, this.getItSimon, this);
			}
		} else {
			j=0;
			// con 15 elementos de longitud consigo repeticiones + cortas
			samSequence = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
			this.gameOver();
		}
	},
	
	played: function(button){
		button.loadTexture(fullTexture);
		if (button == redSprite) {
			redsound.play('redsound0');
			this.game.time.events.add(Phaser.Timer.SECOND * (1 - ((samSequence.length-1)/(samSequence.length+1))), this.redSpriteUp, this);
		} else if (button == greenSprite) {
			greensound.play('greensound0');
			this.game.time.events.add(Phaser.Timer.SECOND * (1 - ((samSequence.length-1)/(samSequence.length+1))), this.greenSpriteUp, this);
		} else if (button == blueSprite) {
			bluesound.play('bluesound0');
			this.game.time.events.add(Phaser.Timer.SECOND * (1 - ((samSequence.length-1)/(samSequence.length+1))), this.blueSpriteUp, this);
		} else if (button == yellowSprite) {
			yellowsound.play('yellowsound0');
			this.game.time.events.add(Phaser.Timer.SECOND * (1 - ((samSequence.length-1)/(samSequence.length+1))), this.yellowSpriteUp, this);
		}
	},
	
	clickedUp: function(button){
		button.loadTexture(whiteTexture);
	},

	redSpriteUp: function(){
		//redsound.stop();
		redSprite.loadTexture(whiteTexture);
	},
	
	greenSpriteUp: function(){
		//greensound.stop();
		greenSprite.loadTexture(whiteTexture);
	},
	
	blueSpriteUp: function(){
		//bluesound.stop();
		blueSprite.loadTexture(whiteTexture);
	},
		
	yellowSpriteUp: function(){
		//yellowsound.stop();
		yellowSprite.loadTexture(whiteTexture);
	},
	
	getItSimon: function () {
		redSprite.inputEnabled = false;
		greenSprite.inputEnabled = false;
		blueSprite.inputEnabled = false;
		yellowSprite.inputEnabled = false;

		simon = true;
		simonSequence[simonSequence.length] = (Math.floor(Math.random()*4)+1);
		this.whosplaying();
	},
	
	playItSimon: function () {
		i=0;
		this.showSimonSecuence();
	},

	showSimonSecuence: function () {
		if (simonSequence[i]==1) {
			this.played(redSprite);
		} else if (simonSequence[i]==2) {
			this.played(greenSprite);
		} else if (simonSequence[i]==3) {
			this.played(blueSprite);
		} else if (simonSequence[i]==4) {
			this.played(yellowSprite);
		}

		// si no he llegado al final aumento una posición y repito showSimonSecuence
		if (i < simonSequence.length) {
			i++;
			this.game.time.events.add(Phaser.Timer.SECOND * (1.05 - ((samSequence.length-1)/(samSequence.length+1))), this.showSimonSecuence, this);
		} else { // si he llegado al final cambio el turno
			simon = false;
			this.whosplaying();
		}
		
	},
	
	playItSam: function () {
		redSprite.inputEnabled = true;
		greenSprite.inputEnabled = true;
		blueSprite.inputEnabled = true;
		yellowSprite.inputEnabled = true;
		i=0;
	},
	
	gameOver: function () {
		if (j<5) {
			if (simonSequence[i]==1) {
				this.played(redSprite);
			} else if (simonSequence[i]==2) {
				this.played(greenSprite);
			} else if (simonSequence[i]==3) {
				this.played(blueSprite);
			} else if (simonSequence[i]==4) {
				this.played(yellowSprite);
			}
			j++;
			this.game.time.events.add(Phaser.Timer.SECOND * 0.25, this.gameOver, this);
		} else {
			localStorage.setItem("topTablesScore",Math.max(score,topScore));
			this.game.state.start("GameOver",true,false,score,topScore);
		}
	},

	update: function () {
		
	},
	
	render: function () {
    	//this.game.debug.text("Time remaining: " + this.game.time.events.duration.toFixed(0), 32, 32);
	}
};