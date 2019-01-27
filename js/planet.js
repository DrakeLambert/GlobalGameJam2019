class Planet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.diameter = 30;
		this.shuttleCount = Math.floor(randomGaussian(10, 2));
		/**@type {Player} */
		this.owner = null;
		this.selected = false;
		this.spawnRate = Math.floor(randomGaussian(3000, 1000));
		this.spawner = setInterval(this.spawnShuttle.bind(this), this.spawnRate);
		this.deployer = setInterval(this.deployShuttle.bind(this), 400);
		/**@type {Planet} */
		this.targetPlanet = null;

		this.onSelected = new Trigger();

		onDraw.subscribe(this.draw.bind(this));
		onMouseClicked.subscribe(this.mouseClicked.bind(this));
		onPlanetClaimed.subscribe(this.onPlanetClaimed.bind(this));
	}

	spawnShuttle() {
		this.shuttleCount += 1;
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
			stroke('green');
			strokeWeight(1);
			circle(this.x, this.y, this.diameter / 2 + 5);
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
		return dist(this.x, this.y, x, y) < this.diameter / 1.5;
	}
	/**
	 * @param {Shuttle} shuttle 
	 */
	receiveShuttle(shuttle) {
		if (this.owner === shuttle.owner) {
			this.shuttleCount += 1;
		} else if (this.owner) {
			this.shuttleCount -= 1;
		} else {
			this.shuttleCount -= 2;
		}
		if (this.shuttleCount <= 0) {
			onPlanetClaimed.trigger(this, shuttle.owner);
			this.shuttleCount = 0;
		}
	}

	onPlanetClaimed(args) {
		/** @type {Planet} */
		let planet = args[0];
		/** @type {Player} */
		let player = args[1];
		if (planet === this) {
			this.owner = player;
			this.targetPlanet = null;
		}
	}
}
