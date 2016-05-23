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
	
	var standing = new PIXI.Sprite(PIXI.Texture.fromFrame("Knight.png"));
	standing.scale.x = 4;
	standing.scale.y = 4;
	standing.position.set(50,200);
	stage.addChild(standing);

	var frames = [];
	for (var i = 1; i < 3; i++) {
		frames.push(PIXI.Texture.fromFrame('Walk' + i + '.png'));
	}

	walk = new PIXI.extras.MovieClip(frames);
	walk.scale.set(4,4);
	walk.position.set(200,200);
	walk.animationSpeed = 0.1;
	walk.play();
	stage.addChild(walk);
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}