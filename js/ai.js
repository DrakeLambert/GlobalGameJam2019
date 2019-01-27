class AI {
	constructor() {
		this.player = new Player('salmon');
	}
}

class MainPlayer {
	constructor() {
		this.player = new Player('cornflowerblue');
		onPlanetSelectedGlobal.subscribe(this.player.selectPlanet.bind(this.player));
	}
}
