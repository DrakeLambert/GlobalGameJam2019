const planets = [];
const satellites = [];
const shuttles = [];
const players = [];

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight - 5);

	// Create planets
	[...Array(10).keys()].map(i => new Planet(Math.random() * width, Math.random() * height)).forEach(planet => planets.push(planet));

	// Create player
	mainPlayer = new Player('cornflowerblue');
	planets[0].owner = mainPlayer;
	players.push(mainPlayer);

	// Create satellites
	satellites.push(new Satellite(mainPlayer, planets[0]));
}

const drawT = new Trigger();
function draw() {
	background('black');
	drawT.trigger();
}

const mouseClickedT = new Trigger();
function mouseClicked() {
	mouseClickedT.trigger();
}
