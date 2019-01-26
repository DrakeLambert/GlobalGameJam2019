class Satellite {
	constructor(owner, planet) {
		this.owner = owner;
		this.planet = planet;
		this.angle = Math.random() * 2 * PI;
		this.speed = Math.random() * .01;
		
		onDraw.subscribe(this.draw.bind(this));
	}

	updatePosition() {
		this.angle += .005 + this.speed;
		if (this.angle >= 2 * PI) this.angle = 0;
		this.x = cos(this.angle) * 30 + this.planet.x;
		this.y = sin(this.angle) * 30 + this.planet.y;
	}

	laser(pX,pY) {
		push();
		stroke(255,0,0,200);
		strokeWeight(15);
		line(this.x, this.y, mouseX, mouseY);
		stroke(255);
		strokeWeight(3);
		line(this.x, this.y, mouseX, mouseY);
		pop();
	}

	draw() {
		this.updatePosition();
		push();
		fill(this.owner.color);
		circle(this.x, this.y, 3);
		pop();
	}
}
