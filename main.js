function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight - 5);

	// Create planets
	let planets = [...Array(10).keys()].map(i => new Planet(Math.random() * width, Math.random() * height));

	// Create player
	mainPlayer = new Player('cornflowerblue');
	planets[0].owner = mainPlayer;

	// Create satellites
	new Satellite(mainPlayer, planets[0]);
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
