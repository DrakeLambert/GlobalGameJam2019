class player {
	constructor(color) {
		this.color = color;
		this.lastPlanetSelection = null;
	}

	fillColor() {
		return color(red(this.color), green(this.color), blue(this.color));
	}
}
