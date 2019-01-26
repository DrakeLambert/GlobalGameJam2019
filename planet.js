class Planet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.diameter = 30;
		this.shuttleCount = Math.floor(randomGaussian(15, 5));
		/**@type {Player} */
		this.owner = null;
		this.selected = false;
		this.spawner = setInterval(this.spawnShuttle.bind(this), 4000);
		this.deployer = setInterval(this.deployShuttle.bind(this), 400);
		/**@type {Planet} */
		this.targetPlanet = null;

		this.onSelected = new Trigger();

		onDraw.subscribe(this.draw.bind(this));
		onMouseClicked.subscribe(this.mouseClicked.bind(this));

		onPlanetClaimed.subscribe(((args) => {
			let planet = args[0];
			let player = args[1];
			if (planet === this) {
				this.owner = player;
			}
		}).bind(this));
	}

	spawnShuttle() {
		if (this.owner) {
			this.shuttleCount += 1;
		}
	}

	deployShuttle() {
		if (this.targetPlanet) {
			if (this.shuttleCount > 0) {
				this.shuttleCount -= 1;
				new Shuttle(this.owner, this.targetPlanet, this.x, this.y);
			}
		}
	}

	draw() {

		// box
		push();
		stroke('black');
		strokeWeight(2);
		if (this.owner) {
			fill(this.owner.color);
		} else {
			fill('whitesmoke');
		}
		ellipse(this.x, this.y, this.diameter, this.diameter);
		pop();

		// shuttle count
		push();
		noStroke();
		fill('black');
		textAlign(CENTER, CENTER);
		text(this.shuttleCount, this.x, this.y);
		pop();

		// selected
		push();
		if (this.selected) {
			noFill();
			stroke('red');
			strokeWeight(2);
			rect(this.x - this.diameter / 2 + 2, this.y - this.diameter / 2 + 2, this.diameter - 4, this.diameter - 4);
		}
		pop();
	}

	mouseClicked() {
		if (this.containsPoint(mouseX, mouseY)) {
			onPlanetSelectedGlobal.trigger(this);
		}
	}

	onPlayerSelect(player, planet) {
		if (player.lastPlanetSelection) {
			if (player.lastPlanetSelection.owner === player) {
				if (!planet) {
					// Stop shuttles
					player.lastPlanetSelection.targetPlanet = null;
				} else if (player.lastPlanetSelection !== planet) {
					// Send shuttles
					player.lastPlanetSelection.targetPlanet = planet;
				}
			}
		}
		player.lastPlanetSelection = planet;
	}

	containsPoint(x, y) {
		return dist(this.x, this.y, x, y) < this.diameter / 2;
	}
	/**
	 * @param {Shuttle} shuttle 
	 */
	receiveShuttle(shuttle) {
		if (this.shuttleCount <= 0) {
			this.owner = shuttle.owner;
		}
		if (this.owner === shuttle.owner) {
			this.shuttleCount += 1;
		} else {
			this.shuttleCount -= 1;
		}
	}
}
