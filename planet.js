class Planet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.diameter = 30;
		this.shuttleCount = 0;
		this.owner = null;
		this.selected = false;
		this.spawner = setInterval(this.spawnShuttle.bind(this), 1000);
		this.deployer = setInterval(this.deployShuttle.bind(this), 500);
		this.targetPlanet = null;
		this.shuttles = [];

		drawT.subscribe(this.draw.bind(this));
		mouseClickedT.subscribe(this.mouseClicked.bind(this));
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
				this.shuttles.push(new Shuttle(this.owner, this.targetPlanet, this.x, this.y));
			}
		}
	}

	draw() {

		// box
		push();
		stroke('black');
		strokeWeight(2);
		if (this.owner) {
			fill(this.owner.fillColor());
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

		this.shuttles.forEach(m => {
			m.updatePosition();
			m.draw();
		});
	}

	mouseClicked() {
		if (this.containsPoint(mouseX, mouseY)) {
			this.selected = true;
		} else {
			this.selected = false;
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
}
