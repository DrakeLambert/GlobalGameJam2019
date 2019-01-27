class AI {
	constructor() {
		this.player = new Player('salmon');
	}

	attackNearestPlanet() {

	}

	/**
	 * @returns {Planet}
	 */
	getNearestPlanets() {
		let minimumDistance = Number.POSITIVE_INFINITY;
		let closestPair = null;

		let otherPlanets = planets.filter(planet => !this.player.planets.includes(planet));
		this.player.planets.forEach(aiPlanet => {
			otherPlanets.forEach(otherPlanet => {
				let disance = dist(aiPlanet.x, aiPlanet.y, otherPlanet.x, otherPlanet.y);
				if (disance < minimumDistance) {
					minimumDistance = disance;
					closestPair = {}
				}
			});
		});
	}
}
