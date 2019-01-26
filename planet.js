class planet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 30;
		this.minionCount = 0;
		this.owner = null;
		this.selected = false;
		this.spawner = setInterval(this.spawnMinion.bind(this), 1000);
		this.deployer = setInterval(this.deployMinion.bind(this), 500);
		this.targetPlanet = null;
		this.minions = [];
	}

	spawnMinion() {
		if (this.owner) {
			this.minionCount += 1;
		}
	}

	deployMinion() {
		if (this.targetPlanet) {
			if (this.minionCount > 0) {
				this.minionCount -= 1;
				this.minions.push(new minion(this.owner, this.targetPlanet, this.x, this.y));
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
		ellipse(this.x, this.y, this.size, this.size);
		pop();

		// minion count
		push();
		noStroke();
		fill('black');
		textAlign(CENTER, CENTER);
		text(this.minionCount, this.x, this.y);
		pop();

		// selected
		push();
		if (this.selected) {
			noFill();
			stroke('red');
			strokeWeight(2);
			rect(this.x - this.size / 2 + 2, this.y - this.size / 2 + 2, this.size - 4, this.size - 4);
		}
		pop();

		this.minions.forEach(m => {
			m.updatePosition();
			m.draw();
		});
	}

	containsPoint(x, y) {
		return dist(this.x, this.y, x, y) < this.size / 2;
	}
}
