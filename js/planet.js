class Planet {
	constructor(x, y, num) {
		this.x = x;
		this.y = y;
		this.diameter = 50;
		this.shuttleCount = Math.floor(randomGaussian(7, 2));
		this.satelliteCount = 0;
		this.satellites = [];
		this.maxSatellites = 7;
		/**@type {Player} */
		this.owner = null;
		this.selected = false;
		this.spawnRate = constrain(Math.floor(randomGaussian(3000, 1000)), 500, 4000);
		this.lastSpawn = Date.now();
		this.lastDeploy = Date.now();
		/**@type {Planet} */
		this.targetPlanet = null;

		this.offset = 5;
		this.stroke = 2;
		this.targetOffset = 5;
		this.targetStroke = 2;

		this.rotate = Math.random() * 2*PI;

		this.img = loadImage(`./media/planet-${num % 6 + 1}.png`);

		this.onSelected = new Trigger();

		onDraw.subscribe(this.draw.bind(this));
		onDraw.subscribe(this.spawnShuttle.bind(this));
		onDraw.subscribe(this.deployShuttle.bind(this));
		onMouseClicked.subscribe(this.mouseClicked.bind(this));
		onPlanetClaimed.subscribe(this.onPlanetClaimed.bind(this));
	}

	spawnShuttle() {
		let now = Date.now();
		if (now - this.lastSpawn > this.spawnRate) {
			this.shuttleCount += 1;
			this.checkSatellite();
			this.lastSpawn = now;
		}
	}

	deployShuttle() {
		let now = Date.now();
		if (now - this.lastDeploy > 400) {
			if (this.targetPlanet) {
				if (this.shuttleCount > 0) {
					this.shuttleCount -= 1;
					new Shuttle(this.owner, this.targetPlanet, this.x, this.y);
				}
			}
			this.lastDeploy = now;
		}
	}

	checkSatellite() {
		if (this.satelliteCount <= this.maxSatellites) {
			if (this.owner && Math.floor(this.shuttleCount / 15) >= this.satelliteCount + 1) {
				this.satellites.push(new Satellite(this.owner, this));
				this.satelliteCount++;
			}
		}
	}

	draw() {

		// planet
		push();
		imageMode(CENTER);
		translate(this.x,this.y);
		rotate(this.rotate);
		image(this.img, 0, 0, this.diameter, this.diameter);
		pop();

		// shuttle count
		push();
		noStroke();
		if (this.owner) {
			fill(this.owner.color);
		} else {
			fill('whitesmoke');
		}
		rect(this.x - 25, this.y + 36, 50, 24, 5);
		textSize(20);
		fill('black');
		textAlign(CENTER, CENTER);
		text(this.shuttleCount, this.x, this.y + 50);
		pop();

		// select circle
		push();
		if (this.selected) {
			noFill();
			stroke('green');
			strokeWeight(this.stroke);
			if (this.offset > 5) {
				this.offset -= .5;
				if (this.stroke <=2 ) {
					this.stroke += .4;
				}
			}
			circle(this.x, this.y, this.diameter / 2 + this.offset);
		}
		pop();

		// animate target selection
		push();
		if (this.targetPlanet !== null && this.owner !== ai.player) {
			noFill();
			stroke('yellow');
			strokeWeight(this.targetStroke);
			if (this.targetOffset < 9) {
				this.targetOffset+=.6;
				if (this.targetStroke > 0) {
					this.targetStroke-=.2;
				}
				circle(this.targetPlanet.x, this.targetPlanet.y, this.diameter / 2 + this.targetOffset);
			}
		}
		pop();
	}

	mouseClicked() {
		if (this.containsPoint(mouseX, mouseY)) {
			onPlanetSelectedGlobal.trigger(this);
			this.offset = 10;
			this.stroke = 0;
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
					this.targetOffset = 5;
					this.targetStroke = 2;
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
			new Explosion(shuttle, true);
			this.checkSatellite();
		} else if (this.owner) {
			this.shuttleCount -= 1;
			new Explosion(shuttle, false);
		} else {
			this.shuttleCount -= 2;
			new Explosion(shuttle, false);
		}
		if (this.shuttleCount <= 0) {
			onPlanetClaimed.trigger(this, shuttle.owner);
			this.satellites.forEach(s => s.changeOwner(shuttle.owner));
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
