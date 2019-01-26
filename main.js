const onPlanetClaimed = new Trigger();
const onPlanetSelectedGlobal = new Trigger();
const onUpdatePosition = new Trigger();
let song;

function preload() {
	soundFormats('wav');
	song = loadSound('media/GameJam.mp3');
}

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight);

	// Create background
	new Background();

	// Create planets
	let planets = [...Array(10).keys()].map(i => new Planet(constrain(Math.random() * width, 30, width - 30), constrain(Math.random() * height, 30, height - 30)));

	// Create player
	let mainPlayer = new Player('cornflowerblue');
	planets[0].shuttleCount = 5;
	onPlanetClaimed.trigger(planets[0], mainPlayer);

	// Create satellites
	new Satellite(mainPlayer, planets[0]);
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
}

function mousePressed() {
	if (!song.isPlaying()) {
		song.setVolume(0.0);
		song.play();
	}
	for (let i = 0.1; i < 0.7; i+=.1) {
		window.setTimeout(song.setVolume.bind(song), 500, i);
		console.log(sound.getVolume());
	}
}
