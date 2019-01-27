class GameState {
	constructor() {
		this.isWon = false;
		this.isLost = false;
		onPlanetClaimed.subscribe(this.checkState.bind(this));
	}

	checkState() {
		if (ai.player.planets.length == 0) {
			this.isWon = true;
			this.stopGameMovement();
			onDraw.subscribe(this.draw.bind(this));
		}
		if (mainPlayer.player.planets.length == 0) {
			this.stopGameMovement();
			this.isLost = true;
			onDraw.subscribe(this.draw.bind(this));
		}
	}

	stopGameMovement() {
		onPlanetSelectedGlobal.unsubscribe(mainPlayer.onSelected);
		onDraw.unsubscribe(ai.attackLooper);
		planets.forEach(planet => {
			planet.targetPlanet = null;
			planet.selected = false;
		});
	}

	draw() {
		push();
		strokeWeight(3);
		fill(15,15,15);
		rect(width /2 - 150, height / 2 - 55, 300, 100, 20);

		textSize(50);
		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		if (this.isWon) {
			fill('forestgreen');
			text('You Won!', width / 2, height / 2);
		}
		if (this.isLost) {
			fill('salmon');
			text('You Lost', width / 2, height / 2);
		}
		pop();
	}
}
