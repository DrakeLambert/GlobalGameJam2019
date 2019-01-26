let currentScene = [];

function setup() {
	document.body.style.margin = 0;
	createCanvas(windowWidth, windowHeight - 5);

	planets = [...Array(10).keys()].map(i => new Planet(Math.random() * width, Math.random() * height));
	planets.forEach(p => currentScene.push(p));
	currentScene.push(new PlanetManager(planets));

	mainPlayer = new Player('cornflowerblue');
	currentScene.push(mainPlayer);
	planets[0].owner = mainPlayer;

	sat = new Satellite(mainPlayer, planets[0]);
	currentScene.push(sat);
}


function draw() {
	background('black');
	currentScene.forEach(object => {
		if (typeof object.draw === 'function') {
			object.draw();
		}
	});
}

function mouseClicked() {
	currentScene.forEach(object => {
		if (typeof object.mouseClicked === 'function') {
			object.mouseClicked();
		}
	});
}

class PlanetManager {
	constructor(planets) {
		this.planets = planets;
	}

	mouseClicked() {
		let spaceClick = true;
		this.planets.forEach(planet => {
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
}
