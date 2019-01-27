const onPlanetClaimed = new Trigger();
const onPlanetSelectedGlobal = new Trigger();
const onUpdatePosition = new Trigger();
let song;
/** @type {MainPlayer} */
let mainPlayer;
/** @type {AI} */
let ai;
/**@type {Planet[]} */
let planets;

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
	planets = [...Array(10).keys()].map(i => new Planet(constrain(Math.random() * width, 30, width - 30), constrain(Math.random() * height, 30, height - 30), i));

	// Create player
	mainPlayer = new MainPlayer();
	ai = new AI();
	onPlanetClaimed.trigger(planets[0], mainPlayer.player);
	onPlanetClaimed.trigger(planets[1], ai.player);

	// Create satellites
	new Satellite(mainPlayer.player, planets[0]);
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
