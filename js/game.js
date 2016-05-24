/*
  Project 2: Knight Rider
  Author: Gage Myers
*/
var standing;
var walk;
var music;
var doors = 0;
var horse = new PIXI.Sprite(PIXI.Texture.fromImage("../assets/horse.png"));
var landscape = new PIXI.Sprite(PIXI.Texture.fromImage("../assets/Landscape.png"));
var gameport = document.getElementById('gameport');
var headline = new PIXI.Text('Knight Rider', {font: '24px Arial', fill: 0xffffff, align: 'center'});
var instructions = new PIXI.Text('Click anywhere to continue', {font: '16px Arial', fill: 0xffffff, align: 'center'});
var win = new PIXI.Text('You found your horse!', {font: '24px Arial', fill: 0x0, align: 'center'});
var renderer = PIXI.autoDetectRenderer(400,400, {backgroundColor: 0x0});
gameport.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var stage = new PIXI.Container();

PIXI.loader
	.add("../assets/assets.json")
    .add("../assets/soundtrack.wav")
	.load(ready);

function ready() {
    standing = new PIXI.Sprite(PIXI.Texture.fromFrame("knight1.png"));
	standing.scale.set(4,4);
	standing.position.set(60,100);
    headline.position.set(150,50);
    instructions.position.set(120,300);
	stage.addChild(standing);
    stage.addChild(headline);
    stage.addChild(instructions);
    music = PIXI.audioManager.getAudio("../assets/soundtrack.wav");
    win.position.y = 100;
}

function mouseHandler(e) {
    music.play();
    stage.removeChild(standing);
    stage.removeChild(headline);
    stage.removeChild(instructions);
    stage.addChild(landscape);

    var frames = [];
    for (var i = 2; i < 5; i++) {
        frames.push(PIXI.Texture.fromFrame('knight' + i + '.png'));
    }

    walk = new PIXI.extras.MovieClip(frames);
    walk.scale.set(2,2);
    walk.position.set(120,120);
    walk.animationSpeed = 0.1;
    walk.play();
    stage.addChild(walk);
}

function doorCheck() {
    return ((walk.position.x < 30 && walk.position.y > 100 && walk.position.y < 150) ||
    (walk.position.x > 310 && walk.position.y > 100 && walk.position.y < 150) ||
    (walk.position.y < 30 && walk.position.x > 100 && walk.position.x < 150) ||
    (walk.position.y > 290 && walk.position.x > 100 && walk.position.x < 150));
}

function keyDownEventHandler(e) {

    if (doors >= 2) {
        horse.scale.set(2,2);
        horse. position.set(200,120);
        stage.addChild(horse);
        stage.addChild(win);
    }

    if (doorCheck()) {
        walk.position.set(120,120);
        doors++;
    }

    // W: Move Up
    if (e.keyCode == 87) {
        createjs.Tween.get(walk.position).to({x: walk.position.x, y: walk.position.y - 30}, 1000);
    }
    // A: Move Left
    if (e.keyCode == 65) {
        createjs.Tween.get(walk.position).to({x: walk.position.x - 30, y: walk.position.y}, 1000);
    }
    // S: Move Down
    if (e.keyCode == 83) {
        createjs.Tween.get(walk.position).to({x: walk.position.x, y: walk.position.y + 30}, 1000);
    }
    // D: Move Right
    if (e.keyCode == 68) {
        createjs.Tween.get(walk.position).to({x: walk.position.x + 30, y: walk.position.y}, 1000);
    }
}


document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('mousedown', mouseHandler);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}

animate();