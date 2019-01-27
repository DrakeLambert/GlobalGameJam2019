class AI {
	constructor() {
		this.player = new Player('salmon');
		this.attackSpeed = 5000;
		window.setTimeout(this.attackLoop.bind(this), 2000);
	}

	attackLoop() {
		this.attackNearestPlanet();
		window.setTimeout(this.attackLoop.bind(this), this.attackSpeed);
	}

	attackNearestPlanet() {
		let pair = this.getNearestPlanets();

		if (pair) {
			this.player.planets.forEach(planet => {
				if (Math.random() > .5) {
					this.player.selectPlanet([planet]);
					this.player.selectPlanet([pair.opposingPlanet]);
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
