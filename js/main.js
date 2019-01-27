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

function preload() {
	soundFormats('wav');
	song = loadSound('./media/GameJam.mp3');
}

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight);

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

	// Create player
	mainPlayer = new MainPlayer();
	onPlanetClaimed.trigger(planets[0], mainPlayer.player);
	mainPlayer.player.selectPlanet([planets[0]]);
	
	ai = new AI();
	planets[1].shuttleCount = planets[0].shuttleCount * 3;
	onPlanetClaimed.trigger(planets[1], ai.player);

	// Create satellites
	new Satellite(mainPlayer.player, planets[0]);

	// Create pause button
	// new Pause(40, 40);
}

const onDraw = new Trigger();
function draw() {
	onUpdatePosition.trigger();
	onDraw.trigger();
}
function touchStarted() {
	draw();
}

const onMouseClicked = new Trigger();
function mouseClicked() {
	onMouseClicked.trigger();
	if (!song.isPlaying() && song.isLoaded()) {
		song.setVolume(0.5);
		song.loop();
		song.play();
	}
}
