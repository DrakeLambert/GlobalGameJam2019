class AI {
	constructor() {
		let shuttle = loadImage('./media/shuttle-enemy1.png');
		this.player = new Player('salmon', shuttle);
		this.attackSpeed = 5000;
		this.attackProb = .8;
		this.conserveProb = .8;
		window.setTimeout(this.attackLoop.bind(this), 2000);
	}

	attackLoop() {
		this.attackNearestPlanet();
		this.conserveShuttles();
		window.setTimeout(this.attackLoop.bind(this), this.attackSpeed);
	}

	attackNearestPlanet() {
		let pair = this.getNearestPlanets();
		if (pair) {
			this.player.planets
				.filter(_ => Math.random() < this.attackProb)
				.forEach(planet => {
					this.player.selectPlanet([planet]);
					this.player.selectPlanet([pair.opposingPlanet]);
				});
		}
	}

	conserveShuttles() {
		if (this.player.planets.length > 2) {
			this.player.planets
				.filter(_ => Math.random() < this.conserveProb)
				.forEach(planet => {
					if (Math.random() > .5) {
						this.player.selectPlanet([planet]);
						this.player.selectPlanet([planet]);
					} else {
						var index = Math.floor(Math.random() * this.player.planets.length);
						this.player.selectPlanet([this.player.planets[index]])
						this.player.selectPlanet([planet]);
						this.player.selectPlanet([planet]);
					}
				});
		}
	}

	/**
	 * @returns {Pair}
	 */
	getNearestPlanets() {
		let minimumDistance = Number.POSITIVE_INFINITY;
		let closestPair = null;

		let otherPlanets = planets.filter(planet => !this.player.planets.includes(planet));
		this.player.planets.forEach(aiPlanet => {
			otherPlanets.forEach(otherPlanet => {
				let distance = dist(aiPlanet.x, aiPlanet.y, otherPlanet.x, otherPlanet.y);
				if (distance < minimumDistance) {
					minimumDistance = distance;
					closestPair = new Pair(aiPlanet, otherPlanet);
				}
			});
		});

		return closestPair;
	}

}

class Pair {
	constructor(teamPlanet, opposingPlanet) {
		this.teamPlanet = teamPlanet;
		this.opposingPlanet = opposingPlanet;
	}
}
