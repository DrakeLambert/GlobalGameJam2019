const onPlanetClaimed = new Trigger();
const onPlanetSelectedGlobal = new Trigger();

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight - 5);
	
	back = new Background()
	
	// Create planets
	let planets = [...Array(10).keys()].map(i => new Planet(Math.random() * width, Math.random() * height));
	
	// Create player
	let mainPlayer = new Player('cornflowerblue');
	onPlanetClaimed.trigger(planets[0], mainPlayer);
	
	// Create satellites
	new Satellite(mainPlayer, planets[0]);
}

const onDraw = new Trigger();
function draw() {
	onDraw.trigger();
}

const onMouseClicked = new Trigger();
function mouseClicked() {
	onMouseClicked.trigger();
}
