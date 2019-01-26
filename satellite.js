class satellite {
	constructor(owner, planet) {
		this.owner = owner;
        this.planet = planet;
        this.speed = 0.5;
        this.angle = 0;
	}

	updatePosition() {
        this.angle += .01;
        if (this.angle >= 2*PI) this.angle = 0;
        this.x = cos(this.angle) * 30 + this.planet.x;
        this.y = sin(this.angle) * 30 + this.planet.y;
	}

	draw() {
		this.updatePosition();
		push();
		fill(this.owner.color);
		circle(this.x, this.y, 2);
		pop();
	}
}
