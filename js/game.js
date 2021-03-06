/*
  Project 2: Knight Rider
  Author: Gage Myers
*/

// Global variables
var standing;
var walk;
var music;
var winner;
var doors = 0;

// Loading Sprites and Text
var horse = new PIXI.Sprite(PIXI.Texture.fromImage("../assets/horse.png"));
var landscape = new PIXI.Sprite(PIXI.Texture.fromImage("../assets/Landscape.png"));
var gameport = document.getElementById('gameport');
var headline = new PIXI.Text('Knight Rider', {font: '24px Arial', fill: 0xffffff, align: 'center'});
var instructions = new PIXI.Text('Click anywhere to continue', {font: '16px Arial', fill: 0xffffff, align: 'center'});
var guide = new PIXI.Text('Search the Labyrinth for your lost horse', {font: '16px Arial', fill: 0xffffff, align: 'center'});
var win = new PIXI.Text('You found your horse!', {font: '24px Arial', fill: 0x0, align: 'center'});
var cont = new PIXI.Text('Exit Wherever you like', {font: '24px Arial', fill: 0x0, align: 'center'});
var renderer = PIXI.autoDetectRenderer(400,400, {backgroundColor: 0x0});
gameport.appendChild(renderer.view);

// Setting up end Text
var head = new PIXI.Text('You win', {font: '24px Arial', fill: 0xffffff, align: 'center'});
var credit = new PIXI.Text('All assets created by: Gage Myers', {font: '16px Arial', fill: 0xffffff, align: 'center'});
var winText = new PIXI.Text('You found your horse!', {font: '24px Arial', fill: 0xffffff, align: 'center'});
head.position.set(50,50);
credit.position.set(50,300);
winText.position.set(50,100);

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
    guide.position.set(80,300);
    instructions.position.set(120,350);
	stage.addChild(standing);
    stage.addChild(headline);
    stage.addChild(instructions);
    stage.addChild(guide);
    music = PIXI.audioManager.getAudio("../assets/soundtrack.wav");
    win.position.y = 100;
    cont.position.y = 300;
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

    if (doors == 10) {
        horse.scale.set(2,2);
        horse. position.set(200,120);
        stage.addChild(horse);
        stage.addChild(win);
        stage.addChild(cont);
    }

    if (doorCheck()) {
        walk.position.set(120,120);
        doors++;
    }

    // W: Move Up
    if (!winner && e.keyCode == 87) {
        createjs.Tween.get(walk.position).to({x: walk.position.x, y: walk.position.y - 30}, 1000);
    }
    // A: Move Left
    if (!winner && e.keyCode == 65) {
        createjs.Tween.get(walk.position).to({x: walk.position.x - 30, y: walk.position.y}, 1000);
    }
    // S: Move Down
    if (!winner && e.keyCode == 83) {
        createjs.Tween.get(walk.position).to({x: walk.position.x, y: walk.position.y + 30}, 1000);
    }
    // D: Move Right
    if (!winner && e.keyCode == 68) {
        createjs.Tween.get(walk.position).to({x: walk.position.x + 30, y: walk.position.y}, 1000);
    }

    // Go to end screen
    if (doors > 10) {
        stage = new PIXI.Container();
        stage.addChild(head);
        stage.addChild(credit);
        stage.addChild(winText);
        stage.addChild(standing);
    }
}


document.addEventListener('keydown', keyDownEventHandler);
document.addEventListener('mousedown', mouseHandler);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}

animate();