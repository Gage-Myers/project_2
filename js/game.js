/*
  Project 2: Knight Rider
  Author: Gage Myers
*/

var gameport = document.getElementById('gameport');

var renderer = PIXI.autoDetectRenderer(800,400, {backgroundColor: 0xFFFFFF});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var stage = new PIXI.Container();

PIXI.loader
	.add("../images/assets.json")
	.load(ready);

function ready() {
	
	var standing = new PIXI.Sprite(PIXI.Texture.fromFrame("knight1.png"));
	standing.scale.x = 2;
	standing.scale.y = 2;
	standing.position.set(50,200);
	stage.addChild(standing);

	var frames = [];
	for (var i = 2; i < 5; i++) {
		frames.push(PIXI.Texture.fromFrame('knight' + i + '.png'));
	}

	walk = new PIXI.extras.MovieClip(frames);
	walk.scale.set(2,2);
	walk.position.set(200,200);
	walk.animationSpeed = 0.1;
	stage.addChild(walk);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}

animate();