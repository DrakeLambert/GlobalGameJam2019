class Shuttle {
	constructor(owner, destination, x, y) {
		this.owner = owner;
		this.destination = destination;
		this.x = x;
		this.y = y;
		this.maxVelocity = 3;
		this.velocity = 0;
		this.acceleration = 0.1;
	}
	updatePosition() {
		if (this.velocity < this.maxVelocity) {
			this.velocity += this.acceleration;
		}
		let slope = atan((this.destination.y - this.y) / (this.destination.x - this.x));
		let dX = cos(slope) * this.velocity;
		let dY = sin(slope) * this.velocity;
		if (this.x > this.destination.x) {
			dX *= -1;
			dY *= -1;
		}
		this.x += dX;
		this.y += dY;
	}
	draw() {
		push();
		fill(this.owner.color);
		stroke('black');
		strokeWeight(1);
		ellipse(this.x, this.y, 10, 10);
		pop();
	}
}
