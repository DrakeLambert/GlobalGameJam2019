
let planets;
let mainPlayer;
let sat;
let currentScene = [];

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight - 5);

	planets = [...Array(10).keys()].map(i => new planet(Math.random() * width, Math.random() * height));
	planets.forEach(p => currentScene.push(p));

	mainPlayer = new player('cornflowerblue');
	currentScene.push(mainPlayer);
	planets[0].owner = mainPlayer;

	sat = new satellite(mainPlayer, planets[0]);
	currentScene.push(sat);
}


function draw() {
	background('black');
	currentScene.forEach(object => {
		if (object.draw) {
			object.draw();
		}
	});
}

function mouseClicked() {
	let spaceClick = true;
	planets.forEach(planet => {
		planet.selected = false;
		if (planet.containsPoint(mouseX, mouseY)) {
			spaceClick = false;
			planet.selected = true;
			if (mainPlayer.lastPlanetSelection && mainPlayer.lastPlanetSelection !== planet && mainPlayer.lastPlanetSelection.owner === mainPlayer) {
				mainPlayer.lastPlanetSelection.targetPlanet = planet;
			}
			mainPlayer.lastPlanetSelection = planet;
		}
	});
	if (spaceClick) {
		if (mainPlayer.lastPlanetSelection) {
			mainPlayer.lastPlanetSelection.targetPlanet = null;
		}
		mainPlayer.lastPlanetSelection = null;
	}
}
