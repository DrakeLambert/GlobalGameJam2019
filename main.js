
let planets;
let mainPlayer;
let sat;

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight - 5);
	planets = [...Array(10).keys()].map(i => new planet(Math.random() * width, Math.random() * height));
	mainPlayer = new player('cornflowerblue');
	sat = new satellite(mainPlayer, planets[0]);
	planets[0].owner = mainPlayer;
}


function draw() {
	background('black');
	planets.forEach(h => h.draw());
	sat.draw();
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
