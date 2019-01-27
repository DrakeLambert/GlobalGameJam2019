class MainPlayer {
	constructor() {
		let shuttle = loadImage('./media/shuttle.png');
		this.player = new Player('cornflowerblue', shuttle);
		onPlanetSelectedGlobal.subscribe(this.player.selectPlanet.bind(this.player));
	}
}
