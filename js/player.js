class Player {
	constructor(color) {
		this.color = color;
		this.planets = [];
		/** @type {Planet} */
		this.lastSelectedPlanet = null;

		onPlanetClaimed.subscribe(this.claimPlanet.bind(this));
		onPlanetSelectedGlobal.subscribe(this.selectPlanet.bind(this));
	}

	claimPlanet(args) {
		/** @type {Planet} */
		let planet = args[0];
		/** @type {Player} */
		let player = args[1];
		if (player === this) {
			if (!this.planets.includes(planet)) {
				this.planets.push(planet);
			}
		}
	}

	selectPlanet(args) {
		/**@type {Planet} */
		let planet = args[0];

		if (this.lastSelectedPlanet) {
			if (this.lastSelectedPlanet === planet) {
				this.lastSelectedPlanet.targetPlanet = null;
			} else {
				this.lastSelectedPlanet.targetPlanet = planet;
			}
			this.lastSelectedPlanet.selected = false;
			this.lastSelectedPlanet = null;
		} else {
			if (planet.owner === this) {
				this.lastSelectedPlanet = planet;
				planet.selected = true;
			}
		}
	}

	ditchPlanet(planet) {
		let index = this.planets.indexOf(planet);
		if (index !== -1) {
			this.planets.splice(index, 1);
		}
	}
}
