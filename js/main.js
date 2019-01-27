const onPlanetClaimed = new Trigger();
const onPlanetSelectedGlobal = new Trigger();
const onUpdatePosition = new Trigger();
/**@type {Planet[]} */
const planets = [];
let song;
/** @type {MainPlayer} */
let mainPlayer;
/** @type {AI} */
let ai;

let explosion;
let plus;
let satelliteIMG = [];

function preload() {
	soundFormats('wav');
	song = loadSound('./media/GameJam.mp3');
	explosion = loadImage('./media/explosion.png');
	plus = loadImage('./media/plus.png');
	satelliteIMG[0] = loadImage('./media/satellite-0.png');
	satelliteIMG[1] = loadImage('./media/satellite-1.png');
}

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight);

	//set framerate
	frameRate(30);

	// Create background
	new Background();

	// Create planets
	let planetCount = 20;
	for (let i = 0; i < planetCount; i++) {
		let newX;
		let newY;
		while (true) {
			newX = constrain(Math.random() * width, 40, width - 40);
			newY = constrain(Math.random() * height, 40, height - 70);

			let tooClose = false;
			for (let planet of planets) {
				tooClose = dist(newX, newY, planet.x, planet.y) < planet.diameter * 2;
				if (tooClose) {
					break;
				}
			}

			if (!tooClose) {
				break;
			}
		}
		planets.push(new Planet(newX, newY, i));
	}

	// Find farthest planets
	let maxDistance = 0;
	let planet1 = null;
	let planet2 = null;
	for (let i = 0; i < planets.length; i++) {
		for (let j = i + 1; j < planets.length; j++) {
			var distance = dist(planets[i].x, planets[i].y, planets[j].x, planets[j].y);
			if (distance > maxDistance) {
				maxDistance = distance;
				planet1 = planets[i];
				planet2 = planets[j];
			}
		}
	}

	// Create player
	mainPlayer = new MainPlayer();
	onPlanetClaimed.trigger(planet1, mainPlayer.player);
	mainPlayer.player.selectPlanet([planet1]);
	planet1.img = loadImage(`./media/planet-0.png`);

	ai = new AI();
	planet2.shuttleCount = planet2.shuttleCount * 3;
	onPlanetClaimed.trigger(planet2, ai.player);

	// Start game state
	new GameState();
}

const onDraw = new Trigger();
function draw() {
	onUpdatePosition.trigger();
	onDraw.trigger();
}

const onMouseClicked = new Trigger();
function mousePressed() {
	onMouseClicked.trigger();
	if (!song.isPlaying() && song.isLoaded()) {
		song.setVolume(0.5);
		song.loop();
		song.play();
	}
}
